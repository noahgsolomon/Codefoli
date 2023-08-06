package com.codefolio.backend.deploy;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.codefolio.backend.user.*;
import com.codefolio.backend.user.faq.FAQResponseModel;
import com.codefolio.backend.user.pages.aboutpage.AboutResponseModel;
import com.codefolio.backend.user.pages.aboutpage.AboutService;
import com.codefolio.backend.user.pages.contactpage.ContactModel;
import com.codefolio.backend.user.pages.contactpage.ContactService;
import com.codefolio.backend.user.pages.homepage.HomeResponseModel;
import com.codefolio.backend.user.pages.homepage.HomeService;
import com.codefolio.backend.user.pages.projectspage.ProjectsPageResponseModel;
import com.codefolio.backend.user.pages.projectspage.ProjectsPageService;
import com.codefolio.backend.user.sections.PageType;
import com.codefolio.backend.user.sections.type.faq.FAQSectionResponseModel;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionResponseModel;
import com.codefolio.backend.user.sections.type.skill.SkillSectionResponseModel;
import com.codefolio.backend.user.sections.type.story.StorySectionResponseModel;
import com.codefolio.backend.user.sections.type.value.ValueSectionResponseModel;
import com.codefolio.backend.user.services.ServicesType;
import com.codefolio.backend.user.skills.SkillsType;
import com.codefolio.backend.user.uploadimage.S3Config;
import com.codefolio.backend.user.values.ValuesResponseModel;
import com.codefolio.backend.user.workhistory.WorkModel;
import com.codefolio.backend.util.PageSections;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;


import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class DeployService {

    private final UserService userService;
    private final HomeService homeService;
    private final AboutService aboutService;
    private final ContactService contactService;
    private final PageSections pageSections;
    private final ProjectsPageService projectsPageService;
    private final S3Config s3Config;
    private final UserRepository userRepository;
    public ResponseEntity<Response> deploy(Principal principal) {
        Users user = getAuthenticatedUser(principal);

        String userDirectoryPath = "/Users/noahs/Desktop/codefolio/Codefolio/deployments/user-" + user.getId();
        File userDirectory = new File(userDirectoryPath);
        if (!userDirectory.exists()) {
            boolean success = userDirectory.mkdirs();
            if (success) {
                System.out.println("Directory created at: " + userDirectory.getAbsolutePath());
            } else {
                System.out.println("Failed to create directory at: " + userDirectory.getAbsolutePath());
            }
        } else {
            System.out.println("Directory already exists at: " + userDirectory.getAbsolutePath());
        }

        System.out.println("Directory created at: " + userDirectoryPath);

        buildProject(userDirectoryPath, principal, user.getId().toString());

        File packageJson = new File(userDirectoryPath + "/package.json");
        if (packageJson.exists()) {
            try {
                String[] installCommand = {"npm", "install"};
                executeCommand(installCommand, userDirectoryPath);

                String[] buildCommand = {"npm", "run", "build"};
                executeCommand(buildCommand, userDirectoryPath);

            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("package.json not found in " + userDirectoryPath + ". Skipping npm commands.");
        }

        String bucketName = "user-" + user.getId() + "-website";

        AmazonS3 s3client = s3Config.s3client();

        if (!s3client.doesBucketExistV2(bucketName)) {
            s3client.createBucket(bucketName);
            System.out.println("Bucket created: " + bucketName);
        } else {
            ListObjectsV2Request listObjectsReq = new ListObjectsV2Request().withBucketName(bucketName);
            ListObjectsV2Result result;
            do {
                result = s3client.listObjectsV2(listObjectsReq);
                for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                    s3client.deleteObject(bucketName, objectSummary.getKey());
                    System.out.println("Deleted object: " + objectSummary.getKey());
                }
                listObjectsReq.setContinuationToken(result.getNextContinuationToken());
            } while (result.isTruncated());
            System.out.println("All objects in the bucket have been deleted.");
        }

        PublicAccessBlockConfiguration publicAccessBlockConfiguration = new PublicAccessBlockConfiguration()
                .withBlockPublicAcls(false)
                .withIgnorePublicAcls(false)
                .withBlockPublicPolicy(false)
                .withRestrictPublicBuckets(false);
        s3client.setPublicAccessBlock(new SetPublicAccessBlockRequest()
                .withBucketName(bucketName)
                .withPublicAccessBlockConfiguration(publicAccessBlockConfiguration));
        System.out.println("Block Public Access settings disabled for bucket: " + bucketName);

        BucketWebsiteConfiguration websiteConfig = new BucketWebsiteConfiguration("index.html");
        s3client.setBucketWebsiteConfiguration(bucketName, websiteConfig);
        System.out.println("Static website hosting enabled for bucket: " + bucketName);

        File distDirectory = new File(userDirectoryPath + "/dist");
        uploadDirectoryToS3(distDirectory, s3client, bucketName, "");

        String publicReadPolicy = "{\n" +
                "  \"Version\":\"2012-10-17\",\n" +
                "  \"Statement\":[{\n" +
                "    \"Sid\":\"PublicRead\",\n" +
                "    \"Effect\":\"Allow\",\n" +
                "    \"Principal\": \"*\",\n" +
                "    \"Action\":[\"s3:GetObject\"],\n" +
                "    \"Resource\":[\"arn:aws:s3:::" + bucketName + "/*\"]\n" +
                "  }]\n" +
                "}";

        System.out.println(publicReadPolicy);

        s3client.setBucketPolicy(bucketName, publicReadPolicy);

        boolean isDeleted = deleteDirectory(userDirectory);
        if (isDeleted) {
            System.out.println("Successfully deleted directory: " + userDirectoryPath);
        } else {
            System.out.println("Failed to delete directory: " + userDirectoryPath);
        }

        String region = "us-east-1";
        String bucketUrl = "http://" + bucketName + ".s3-website-" + region + ".amazonaws.com/";

        user.setWebsite(bucketUrl);
        userRepository.save(user);

        return ResponseEntity.ok().body(new Response(StatusType.OK, "Deployed successfully", bucketUrl));
    }

    private void executeCommand(String[] command, String directoryPath) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.directory(new File(directoryPath));
        Process process = processBuilder.start();

        Thread outThread = new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        Thread errThread = new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        outThread.start();
        errThread.start();

        outThread.join();
        errThread.join();

        process.waitFor();
    }

    public void uploadDirectoryToS3(File directory, AmazonS3 s3client, String bucketName, String parentKey) {
        for (File file : directory.listFiles()) {
            if (file.isDirectory()) {
                uploadDirectoryToS3(file, s3client, bucketName, parentKey + file.getName() + "/");
            } else {
                String keyName = parentKey + file.getName();
                s3client.putObject(new PutObjectRequest(bucketName, keyName, file));
                System.out.println("Uploaded file: " + file.getName() + " to bucket: " + bucketName);
            }
        }
    }

    public static boolean deleteDirectory(File dir) {
        if (dir.isDirectory()) {
            File[] children = dir.listFiles();
            if (children != null) {
                for (File child : children) {
                    boolean success = deleteDirectory(child);
                    if (!success) {
                        return false;
                    }
                }
            }
        }
        return dir.delete();
    }

    private void buildProject(String directoryPath, Principal principal, String id){
        writeViteConfigTsFile(directoryPath);
        writeTsConfigNodeJsonFile(directoryPath);
        writeTsConfigJsonFile(directoryPath);
        writeTailwindConfigJsFile(directoryPath);
        writePostCssConfigJsFile(directoryPath);
        writePackageJsonFile(directoryPath);
        writeIndexHtmlFile(directoryPath);
        writeEslintRCFile(directoryPath);
        writeSrc(directoryPath, principal, id);
    }

    private void writeViteConfigTsFile(String directoryPath) {
        String viteConfigTsContent = """
            import { defineConfig } from 'vite'
            import react from '@vitejs/plugin-react-swc'
            export default defineConfig({
              plugins: [react()],
            })""";

        File viteConfigTsFile = new File(directoryPath + "/vite.config.ts");
        try (FileWriter writer = new FileWriter(viteConfigTsFile)) {
            writer.write(viteConfigTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write vite.config.ts file: " + e.getMessage());
        }
    }

    private void writeTsConfigNodeJsonFile(String directoryPath) {
        String tsConfigNodeJsonContent = """
            {
              "compilerOptions": {
                "composite": true,
                "skipLibCheck": true,
                "module": "ESNext",
                "moduleResolution": "bundler",
                "allowSyntheticDefaultImports": true
              },
              "include": [
                "./vite.config.ts"
              ]
            }""";

        File tsConfigNodeJsonFile = new File(directoryPath + "/tsconfig.node.json");
        try (FileWriter writer = new FileWriter(tsConfigNodeJsonFile)) {
            writer.write(tsConfigNodeJsonContent);
        } catch (IOException e) {
            System.err.println("Failed to write tsconfig.node.json file: " + e.getMessage());
        }
    }

    private void writeTsConfigJsonFile(String directoryPath) {
        String tsConfigJsonContent = """
            {
              "compilerOptions": {
                "target": "ESNext",
                "lib": ["DOM", "DOM.Iterable", "ESNext"],
                "module": "ESNext",
                "skipLibCheck": true,
                "baseUrl": "src",
                "paths": {
                  "Components/*": ["common/Components/*"],
                  "api/*": ["util/api/*"],
                  "assets/*": ["assets/*"],
                  "Type/*": ["common/Type/*"]
                },

                "moduleResolution": "bundler",
                "allowImportingTsExtensions": true,
                "resolveJsonModule": true,
                "isolatedModules": true,
                "noEmit": true,
                "jsx": "react-jsx",

                "strict": true,
                "noUnusedLocals": true,
                "noUnusedParameters": true,
                "noFallthroughCasesInSwitch": true
              },
              "include": ["src"],
              "references": [{ "path": "./tsconfig.node.json"}]
            }""";

        File tsConfigJsonFile = new File(directoryPath + "/tsconfig.json");
        try (FileWriter writer = new FileWriter(tsConfigJsonFile)) {
            writer.write(tsConfigJsonContent);
        } catch (IOException e) {
            System.err.println("Failed to write tsconfig.json file: " + e.getMessage());
        }
    }

    private void writeTailwindConfigJsFile(String directoryPath) {
        String tailwindConfigJsContent = """
            import aspectRatio from "@tailwindcss/aspect-ratio";

            import forms from "@tailwindcss/forms";

            import typography from "@tailwindcss/typography";

            export default {
              content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
              theme: {
                extend: {
                  boxShadow: {
                    custom: '4px 4px #0b0b0b',
                    customHover: '7px 7px #0b0b0b',
                  },
                  fontFamily: {
                    custom: ['Onest-Regular', 'sans-serif'],
                  },
                  animation: {
                    'spin-slow': 'spin 2s linear infinite',
                    marquee: 'marquee 15s linear infinite',
                  },
                  keyframes: {
                    marquee: {
                      '0%': { transform: 'translateX(100%)' },
                      '100%': { transform: 'translateX(-100%)' },
                    }
                  },
                  backgroundImage: {
                    red: 'linear-gradient(rgba(0, 0, 0, 0) 6%, #ff4a60 6%)',
                    blue: 'linear-gradient(rgba(0, 0, 0, 0) 10%, #1c92ff 10%)'
                  }
                },
              },
              variants: {
                extend: {
                  animation: ['motion-safe'],
                },
              },
              plugins: [
                aspectRatio,
                forms,
                typography,
              ],
            };""";

        File tailwindConfigJsFile = new File(directoryPath + "/tailwind.config.js");
        try (FileWriter writer = new FileWriter(tailwindConfigJsFile)) {
            writer.write(tailwindConfigJsContent);
        } catch (IOException e) {
            System.err.println("Failed to write tailwind.config.js file: " + e.getMessage());
        }
    }

    private void writePostCssConfigJsFile(String directoryPath) {
        String postCssConfigJsContent = """
            export default {
              plugins: {
                tailwindcss: {},
                autoprefixer: {},
              },
            };""";

        File postCssConfigJsFile = new File(directoryPath + "/postcss.config.js");
        try (FileWriter writer = new FileWriter(postCssConfigJsFile)) {
            writer.write(postCssConfigJsContent);
        } catch (IOException e) {
            System.err.println("Failed to write postcss.config.js file: " + e.getMessage());
        }
    }

    private void writePackageJsonFile(String directoryPath) {
        String packageJsonContent = """
                {
                  "name": "deployment",
                  "private": true,
                  "version": "0.0.0",
                  "type": "module",
                  "scripts": {
                          "dev": "vite",
                          "build": "tsc && vite build",
                          "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
                          "preview": "vite preview",
                          "postinstall": "npm install -g serve"
                      },
                  "dependencies": {
                    "@tailwindcss/aspect-ratio": "^0.4.2",
                    "@tailwindcss/forms": "^0.5.3",
                    "@tailwindcss/line-clamp": "^0.4.4",
                    "@tailwindcss/typography": "^0.5.9",
                    "react": "^18.2.0",
                    "react-dom": "^18.2.0",
                    "react-icons": "^4.9.0",
                    "react-router-dom": "^6.12.0",
                    "react-scroll-trigger": "^0.6.14",
                    "react-spring": "^9.7.1",
                    "react-visibility-sensor": "^5.1.1"
                  },
                  "devDependencies": {
                    "@types/react": "^18.0.28",
                    "@types/react-dom": "^18.0.11",
                    "@typescript-eslint/eslint-plugin": "^5.57.1",
                    "@typescript-eslint/parser": "^5.57.1",
                    "@vitejs/plugin-react-swc": "^3.0.0",
                    "autoprefixer": "^10.4.14",
                    "eslint": "^8.43.0",
                    "eslint-plugin-react-hooks": "^4.6.0",
                    "eslint-plugin-react-refresh": "^0.3.4",
                    "postcss": "^8.4.24",
                    "prettier": "^2.8.8",
                    "prettier-plugin-tailwindcss": "^0.3.0",
                    "tailwindcss": "^3.3.2",
                    "typescript": "^5.0.2",
                    "vite": "^4.3.2"
                  }
                }""";

        File packageJsonFile = new File(directoryPath + "/package.json");
        try (FileWriter writer = new FileWriter(packageJsonFile)) {
            writer.write(packageJsonContent);
        } catch (IOException e) {
            System.err.println("Failed to write package.json file: " + e.getMessage());
        }
    }

    private void writeIndexHtmlFile(String directoryPath) {
        String indexHtmlContent = """
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Codefolio</title>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script type="module" src="./src/main.tsx"></script>
                  </body>
                </html>""";

        File indexHtmlFile = new File(directoryPath + "/index.html");
        try (FileWriter writer = new FileWriter(indexHtmlFile)) {
            writer.write(indexHtmlContent);
        } catch (IOException e) {
            System.err.println("Failed to write index.html file: " + e.getMessage());
        }
    }

    private void writeEslintRCFile(String directoryPath) {
        String eslintRCContent = """
            module.exports = {
              env: { browser: true, es2020: true },
              extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react-hooks/recommended',
              ],
              parser: '@typescript-eslint/parser',
              parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
              plugins: ['react-refresh'],
              rules: {
                'react-refresh/only-export-components': 'warn',
              },
            }""";

        File eslintRCFile = new File(directoryPath + "/.eslintrc.cjs");
        try (FileWriter writer = new FileWriter(eslintRCFile)) {
            writer.write(eslintRCContent);
        } catch (IOException e) {
            System.err.println("Failed to write .eslintrc.cjs file: " + e.getMessage());
        }
    }

    private void writeSrc(String directoryPath, Principal principal, String id) {
        String srcDirectoryPath = directoryPath + "/src";
        File srcDirectory = new File(srcDirectoryPath);
        if (!srcDirectory.exists()) {
            boolean success = srcDirectory.mkdirs();
            if (success) {
                System.out.println("Directory created at: " + srcDirectory.getAbsolutePath());
            } else {
                System.out.println("Failed to create directory at: " + srcDirectory.getAbsolutePath());
            }
        } else {
            System.out.println("Directory already exists at: " + srcDirectory.getAbsolutePath());
        }

        writeAssets(srcDirectoryPath, id);
        writeCommon(srcDirectoryPath);
        writePages(srcDirectoryPath);
        writeApp(srcDirectoryPath, principal);
        writeNotFound(srcDirectoryPath);
        writeMain(srcDirectoryPath);
    }

    private void writeAssets(String directoryPath, String id) {
        String assetsDirectoryPath = directoryPath + "/assets";
        File assetsDirectory = new File(assetsDirectoryPath);
        if (!assetsDirectory.exists()) {
            boolean success = assetsDirectory.mkdirs();
            if (success) {
                System.out.println("Directory created at: " + assetsDirectory.getAbsolutePath());
            } else {
                System.out.println("Failed to create directory at: " + assetsDirectory.getAbsolutePath());
            }
        } else {
            System.out.println("Directory already exists at: " + assetsDirectory.getAbsolutePath());
        }

        String fontsDirectoryPath = assetsDirectoryPath + "/fonts";
        File fontsDirectory = new File(fontsDirectoryPath);
        if (!fontsDirectory.exists()) {
            boolean success = fontsDirectory.mkdirs();
            if (success) {
                System.out.println("Directory created at: " + fontsDirectory.getAbsolutePath());
            } else {
                System.out.println("Failed to create directory at: " + fontsDirectory.getAbsolutePath());
            }
        } else {
            System.out.println("Directory already exists at: " + fontsDirectory.getAbsolutePath());
        }

        String[] fontFiles = {"Onest-Black.ttf", "Onest-Bold.ttf", "Onest-ExtraBold.ttf", "Onest-Regular.ttf"};
        for (String fontFile : fontFiles) {
            copyFontFile(fontsDirectoryPath, fontFile);
        }

        writeImages(assetsDirectoryPath, id);
    }

    private void copyFontFile(String directoryPath, String fileName) {
        File sourceFile = new File("/Users/noahs/Desktop/codefolio/Codefolio/backend/src/main/java/com/codefolio/backend/deploy/fonts/" + fileName);
        File destinationFile = new File(directoryPath + "/" + fileName);

        try (InputStream in = new FileInputStream(sourceFile);
             OutputStream out = new FileOutputStream(destinationFile)) {

            byte[] buffer = new byte[1024];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
            System.out.println("Copied file: " + fileName);
        } catch (IOException e) {
            System.err.println("Failed to copy file: " + fileName + ". " + e.getMessage());
        }
    }

    private void writeImages(String directoryPath, String userId) {
        String imagesDirectoryPath = directoryPath + "/images";
        String imageBucketName = "codefolioimagebucket";
        File imagesDirectory = new File(imagesDirectoryPath);
        if (!imagesDirectory.exists()) {
            boolean success = imagesDirectory.mkdirs();
            if (success) {
                System.out.println("Images directory created at: " + imagesDirectory.getAbsolutePath());
            } else {
                System.out.println("Failed to create images directory at: " + imagesDirectory.getAbsolutePath());
            }
        } else {
            System.out.println("Images directory already exists at: " + imagesDirectory.getAbsolutePath());
        }

        ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(imageBucketName).withPrefix(userId + "-");
        ListObjectsV2Result result;
        AmazonS3 s3client = s3Config.s3client();
        do {
            result = s3client.listObjectsV2(req);

            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                String key = objectSummary.getKey();
                System.out.println("Processing key: " + key);

                S3Object object = s3client.getObject(new GetObjectRequest(imageBucketName, key));
                InputStream objectData = object.getObjectContent();
                File targetFile = new File(imagesDirectoryPath + "/" + key + ".png");
                try {
                    try (OutputStream out = new FileOutputStream(targetFile)) {
                        byte[] buf = new byte[1024];
                        int len;
                        while ((len = objectData.read(buf)) > 0) {
                            out.write(buf, 0, len);
                        }
                    }
                    System.out.println("Downloaded " + key + " to " + targetFile.getAbsolutePath());
                } catch (IOException e) {
                    e.printStackTrace();
                    System.out.println("Failed to download " + key);
                }
            }
            req.setContinuationToken(result.getNextContinuationToken());
        } while (result.isTruncated());
    }


    private void writeCommon(String directoryPath) {
        String commonDirectoryPath = directoryPath + "/common";
        File commonDirectory = new File(commonDirectoryPath);
        if (!commonDirectory.exists()) {
            commonDirectory.mkdirs();
        }

        writeHeader(commonDirectoryPath);
        writeMarquee(commonDirectoryPath);
        writeSections(commonDirectoryPath);
        writeTypes(commonDirectoryPath);
        writeUtil(commonDirectoryPath);
    }

    private void writeHeader(String directoryPath) {
        String headerDirectoryPath = directoryPath + "/Header";
        File headerDirectory = new File(headerDirectoryPath);
        if (!headerDirectory.exists()) {
            headerDirectory.mkdirs();
        }

        String headerContent = """
            import { FC } from "react";
            import { Link } from "react-router-dom";

            const Header: FC = () => {
              return (
                <header
                  className={`relative z-40 mx-5 flex items-center justify-center py-5 font-bold transition-all ease-linear md:flex-row`}
                >
                  <div
                    className="mx-auto flex w-full flex-col items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3 shadow-custom transition-all md:flex-row"
                    style={{ maxWidth: "40rem" }}
                  >
                    <>
                      <div className="flex w-full flex-row items-center justify-center text-gray-800 md:flex-row md:text-base">
                        <div className="lg:mx-10">
                          <Link
                            to="/"
                            className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
                          >
                            Home
                          </Link>
                          <Link
                            to="/about"
                            className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
                          >
                            About
                          </Link>
                          <Link
                            to="/projects"
                            className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
                          >
                            Projects
                          </Link>
                        </div>
                        <Link
                          to="/contact"
                          className="flex w-14 items-center justify-center rounded-2xl border-2 border-black px-3 py-2 text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 md:my-0 md:ml-2"
                        >
                          <img
                            src="https://img.icons8.com/cotton/48/handshake--v2.png"
                            alt="email icon"
                          />
                        </Link>
                      </div>
                    </>
                  </div>
                </header>
              );
            };

            export default Header;""";

        File headerFile = new File(headerDirectoryPath + "/Header.tsx");
        try (FileWriter writer = new FileWriter(headerFile)) {
            writer.write(headerContent);
        } catch (IOException e) {
            System.err.println("Failed to write Header.tsx file: " + e.getMessage());
        }
    }

    private void writeMarquee(String directoryPath) {
        String marqueeDirectoryPath = directoryPath + "/Marquee";
        File marqueeDirectory = new File(marqueeDirectoryPath);
        if (!marqueeDirectory.exists()) {
            marqueeDirectory.mkdirs();
        }

        String marqueeContent = """
            import { FC } from "react";
            const Marquee: FC<{
              items: string[];
            }> = ({ items }) => {
              return (
                <div className="mt-32 overflow-x-hidden bg-black">
                  <div className="animate-marquee whitespace-nowrap py-8 ">
                    {items.map((item) => (
                      <span className="mx-4 text-2xl font-bold text-white" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            };

            export default Marquee;""";

        File marqueeFile = new File(marqueeDirectoryPath + "/Marquee.tsx");
        try (FileWriter writer = new FileWriter(marqueeFile)) {
            writer.write(marqueeContent);
        } catch (IOException e) {
            System.err.println("Failed to write Marquee.tsx file: " + e.getMessage());
        }
    }

    private void writeSections(String directoryPath) {
        String sectionsDirectoryPath = directoryPath + "/Sections";
        File sectionsDirectory = new File(sectionsDirectoryPath);
        if (!sectionsDirectory.exists()) {
            sectionsDirectory.mkdirs();
        }

        writeFAQ(sectionsDirectoryPath);
        writeResume(sectionsDirectoryPath);
        writeSkill(sectionsDirectoryPath);
        writeStory(sectionsDirectoryPath);
        writeValue(sectionsDirectoryPath);
        writeSectionsComponent(sectionsDirectoryPath);
    }

    private void writeFAQ(String directoryPath) {
        String faqDirectoryPath = directoryPath + "/FAQ";
        File faqDirectory = new File(faqDirectoryPath);
        if (!faqDirectory.exists()) {
            faqDirectory.mkdirs();
        }
        writeFAQFiles(faqDirectoryPath);
    }

    private void writeFAQFiles(String directoryPath) {
        String faqAccordionTsContent = """
                import { useState, useRef, FC } from "react";

                const FaqAccordion: FC<{
                  title: string;
                  content: string;
                }> = ({ title, content }) => {
                  const [isOpened, setOpened] = useState<boolean>(false);
                  const [height, setHeight] = useState<string>("0px");
                  const contentElement = useRef(null);

                  const HandleOpening = () => {
                    setOpened(!isOpened);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
                  };

                  return (
                    <div
                      onClick={HandleOpening}
                      className="relative mb-5 rounded-lg border-2 border-black transition ease-in hover:-translate-y-1 hover:shadow-customHover"
                    >
                      <div className={" flex cursor-pointer justify-between p-4"}>
                        <h4 className=" select-none p-1 font-semibold transition-all">
                          {title}
                        </h4>
                        {isOpened ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            stroke="black"
                            strokeWidth="2"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            stroke="black"
                            strokeWidth="2"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        )}
                      </div>
                      <div
                        ref={contentElement}
                        style={{ height: height }}
                        className=" overflow-hidden transition-all duration-200"
                      >
                        <p className=" p-4 transition-all hover:rounded-full ">{content}</p>
                      </div>
                    </div>
                  );
                };

                export default FaqAccordion;
                """;

        String faqSectionTsContent = """
                import { FC } from "react";
                import { FAQType } from "../../types/Section.tsx";
                import FaqAccordion from "./FaqAccordion.tsx";

                const FAQSection: FC<{
                  details: FAQType;
                }> = ({ details }) => {
                  return (
                    <div className="relative mb-20 mt-20">
                      <section className="px-5">
                        <div className="header mx-auto mb-5 max-w-[647px]">
                          <h2 className=" text-center text-2xl font-bold transition-all md:text-5xl">
                            {details.headerOne}
                          </h2>
                          <p className=" text-center transition-all">
                            {details.descriptionOne}
                          </p>
                        </div>
                        <div className=" mx-auto max-w-[800px]">
                          {details.faq.map((faq, index) => (
                            <FaqAccordion
                              key={index}
                              title={faq.question}
                              content={faq.answer}
                            />
                          ))}
                        </div>
                      </section>
                    </div>
                  );
                };

                export default FAQSection;
                """;

        File faqAccordionTsFile = new File(directoryPath + "/FaqAccordion.tsx");
        File faqSectionTsFile = new File(directoryPath + "/FaqSection.tsx");
        try (FileWriter writer = new FileWriter(faqAccordionTsFile)) {
            writer.write(faqAccordionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write FaqAccordion.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(faqSectionTsFile)) {
            writer.write(faqSectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write FaqSection.tsx file: " + e.getMessage());
        }
    }

    private void writeResume(String directoryPath) {
        String resumeDirectoryPath = directoryPath + "/Resume";
        File resumeDirectory = new File(resumeDirectoryPath);
        if (!resumeDirectory.exists()) {
            resumeDirectory.mkdirs();
        }
        writeResumeFiles(resumeDirectoryPath);

    }

    private void writeResumeFiles(String resumeDirectoryPath){
        String resumeSectionTsContent = """
            import { FC } from "react";
            import { ResumeType } from "../../types/Section.tsx";
            import { UserData } from "../../types/UserData.tsx";
            import JobCard from "./JobCard.tsx";

            const ResumeSection: FC<{
              details: ResumeType;
              userData: UserData;
            }> = ({ details, userData }) => {
              return (
                <section className="relative mb-20 mt-20">
                  <div className="container mx-auto max-w-screen-lg px-5">
                    <h2 className="mb-8 text-center text-3xl font-bold transition-all">
                      {details.headerOne}
                    </h2>
                    <div>
                      {userData.work
                        .sort((a, b) => a.orderId - b.orderId)
                        .map((job, index) => (
                          <JobCard
                            key={job.id}
                            image={job.image}
                            companyTitle={job.company}
                            role={job.position}
                            description={job.description}
                            startDate={job.startDate}
                            endDate={job.endDate}
                            active={index === 0}
                          />
                        ))}
                    </div>
                  </div>
                </section>
              );
            };

            export default ResumeSection;
            """;

        File resumeSectionTsFile = new File(resumeDirectoryPath + "/ResumeSection.tsx");
        try (FileWriter writer = new FileWriter(resumeSectionTsFile)) {
            writer.write(resumeSectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ResumeSection.tsx file: " + e.getMessage());
        }

        String jobCardTsContent = """
                import {FC, useEffect, useState} from "react";
                const JobCard: FC<{
                  companyTitle: string;
                  role: string;
                  description: string;
                  startDate: string;
                  endDate: string;
                  active?: boolean;
                  image: string;
                }> = ({
                  companyTitle,
                  role,
                  description,
                  startDate,
                  endDate,
                  active,
                  image,
                }) => {
                                
                  const [jobImage, setJobImage] = useState<string>("");
                    useEffect(() => {
                        import(`../../../assets/images/${image}.png`)
                            .then((module) => {
                                setJobImage(module.default);
                            }).catch(error => {
                                console.error("Failed to load job image:", error);
                            });
                    }, [image]);
                                
                  return (
                    <div
                      className={`relative transition-all hover:-translate-y-0.5 ${
                        active
                          ? "card mb-8 rounded-lg border-2 border-black shadow-custom"
                          : "card mb-8 rounded-lg border-2 border-black"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h2 className="px-5 pt-5 text-3xl font-bold transition-all">
                            {companyTitle}
                          </h2>
                          <div className=" p-5">
                            <h2 className="font-bold transition-all">{role}</h2>
                            <p className="transition-all">{description}</p>
                          </div>
                        </div>
                        <div
                          className={
                            "relative mr-5 mt-5 h-[100px] w-[100px] rounded-full border-2 border-black"
                          }
                        >
                          <img
                            className={"h-full w-full rounded-full object-cover"}
                            src={jobImage || "https://picsum.photos/100/100"}
                            alt={"job photo"}
                          />
                        </div>
                      </div>
                                
                      <div
                        className={`flew-row flex ${
                          active
                            ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 p-5 font-bold"
                            : "duration rounded-b-lg border-t-2 border-black p-5 font-bold"
                        }`}
                      >
                        <p className={"transition-all"}>{startDate}</p>
                        &nbsp;-&nbsp;
                        <p className={"transition-all"}>{endDate}</p>
                      </div>
                    </div>
                  );
                };
                                
                export default JobCard;""";

        File jobCardTsFile = new File(resumeDirectoryPath + "/JobCard.tsx");
        try (FileWriter writer = new FileWriter(jobCardTsFile)) {
            writer.write(jobCardTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write JobCard.tsx file: " + e.getMessage());
        }
    }

    private void writeSkill(String directoryPath) {
        String skillDirectoryPath = directoryPath + "/Skill";
        File skillDirectory = new File(skillDirectoryPath);
        if (!skillDirectory.exists()) {
            skillDirectory.mkdirs();
        }
        writeSkillFiles(skillDirectoryPath);
    }

    private void writeSkillFiles(String skillDirectoryPath) {
        String serviceCardTsContent = """
            import { FC, useState } from "react";

            const ServiceCard: FC<{
              imageUrl: string;
              title: string;
              description: string;
            }> = ({ imageUrl, title, description }) => {
              const [hovered, setHovered] = useState(false);
              return (
                <div
                  className="card group relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {imageUrl && (
                    <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
                      <img
                        className={`inline-block h-full w-full transform object-contain transition-all ease-in-out ${
                          hovered ? "scale-105" : ""
                        }`}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="content rounded-2xl bg-white p-5">
                    <h2 className="title text-2xl font-bold">{title}</h2>
                    <p className="description text-base">{description}</p>
                  </div>
                  <div className="flex-grow rounded-2xl bg-white"></div>
                </div>
              );
            };

            export default ServiceCard;
            """;

        File serviceCardTsFile = new File(skillDirectoryPath + "/ServiceCard.tsx");
        try (FileWriter writer = new FileWriter(serviceCardTsFile)) {
            writer.write(serviceCardTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ServiceCard.tsx file: " + e.getMessage());
        }

        String skillSectionTsContent = """
            import { FC } from "react";
            import { UserData } from "../../types/UserData.tsx";
            import { SkillType } from "../../types/Section.tsx";
            import { ServiceData } from "../../types/Services.tsx";
            import ServiceCard from "./ServiceCard.tsx";
            import { Link } from "react-router-dom";
            import { COLORS } from "../../util/COLORS.ts";
            const SkillSection: FC<{
              userData: UserData;
              details: SkillType;
            }> = ({ userData, details }) => {
              return (
                <div className="relative mb-20 mt-20">
                  <h2 className="mb-10 text-center text-2xl font-bold leading-relaxed transition-all">
                    {details.headerOne}
                  </h2>
                  <div className="mx-10 grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:mx-80">
                    <div className="card relative mb-5 flex max-w-[400px] flex-col rounded-2xl border-2 border-black bg-white shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover">
                      <div
                        style={{ marginBottom: (12 - userData.skills.length) * 25 + "px" }}
                        className={`min-h-64 mt-5 flex flex-wrap gap-2 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2`}
                      >
                        {userData?.skills.map((skill, index) => {
                          return (
                            <span
                              key={index}
                              className={`inline-flex items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[index]} py-2 text-sm`}
                            >
                              {skill.replaceAll("_", " ")}
                            </span>
                          );
                        })}
                      </div>
                      <div className="content flex-grow rounded-b-2xl bg-blue p-5">
                        <h2 className="text-2xl font-bold text-white">{"</>"} Languages</h2>
                      </div>
                    </div>
                    <>
                      {userData.services.map((service, index) => {
                        return (
                          <ServiceCard
                            key={index}
                            imageUrl={ServiceData[service].image}
                            title={service.replaceAll("_", " ")}
                            description={ServiceData[service]?.description}
                          />
                        );
                      })}
                    </>
                    <div className="card mb-5 flex max-w-[400px] flex-col rounded-2xl bg-yellow-400 shadow-customHover transition-all">
                      <img
                        className="mx-auto mt-20 w-32"
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633759c572fde20672b6748b_get-in-touch-image-paperfolio-webflow-template.svg"
                        alt="email"
                      />
                      <Link
                        to={`/contact`}
                        className="mx-5 mb-5 mt-20 rounded-xl bg-black py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
                      >
                        Get in touch
                      </Link>
                    </div>
                  </div>
                </div>
              );
            };
            export default SkillSection;
            """;

        File skillSectionTsFile = new File(skillDirectoryPath + "/SkillSection.tsx");
        try (FileWriter writer = new FileWriter(skillSectionTsFile)) {
            writer.write(skillSectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write SkillSection.tsx file: " + e.getMessage());
        }
    }


    private void writeStory(String directoryPath) {
        String storyDirectoryPath = directoryPath + "/Story";
        File storyDirectory = new File(storyDirectoryPath);
        if (!storyDirectory.exists()) {
            storyDirectory.mkdirs();
        }
        writeStoryFiles(storyDirectoryPath);
    }

    private void writeStoryFiles(String storyDirectoryPath) {
        String storySectionTsContent = """
                import {FC, useEffect, useState} from "react";
                import { StoryType } from "../../types/Section.tsx";
                                
                const StorySection: FC<{
                  details: StoryType;
                }> = ({ details }) => {
                                
                  const [imageOne, setImageOne] = useState(null);
                  useEffect(() => {
                    import(`../../../assets/images/${details.imageOne}.png`).
                        then(module => {
                            setImageOne(module.default);
                            }).catch(error => {
                                console.error("Failed to load imageOne image:", error);
                            })
                  }, [details.imageOne]);
                                
                  return (
                    <section className=" relative mb-20 mt-20 bg-black transition-all">
                      <div className=" mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
                        <div>
                          <h2 className="mb-8 text-4xl font-bold text-white transition-all md:text-5xl md:leading-tight">
                            {details.headerOne}
                          </h2>
                          <p className=" text-lg font-semibold text-white transition-all">
                            {details.descriptionOne}
                          </p>
                          <div className="my-5">
                            <div className=" flex items-start justify-between gap-4">
                              <div className="mt-1 h-4 w-4 rounded border-2 bg-indigo-600"></div>
                              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                                {details.bulletOne}
                              </p>
                            </div>
                            <div className=" flex items-start justify-between gap-4">
                              <div className="mt-1 h-4 w-4 rounded border-2 bg-sky-600"></div>
                              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                                {details.bulletTwo}
                              </p>
                            </div>
                            <div className=" flex items-start justify-between gap-4">
                              <div className="mt-1 h-4 w-4 rounded border-2 bg-yellow-500"></div>
                              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                                {details.bulletThree}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className={` relative mb-5 h-[400px] w-[400px] transition-all`}>
                            <div className="h-full w-full overflow-hidden rounded-3xl">
                              <img
                                src={imageOne || 'https://picsum.photos/400/400'}
                                alt=""
                                className="h-full w-full rounded-3xl object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                };
                                
                export default StorySection;
                """;

        File storySectionTsFile = new File(storyDirectoryPath + "/StorySection.tsx");
        try (FileWriter writer = new FileWriter(storySectionTsFile)) {
            writer.write(storySectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write StorySection.tsx file: " + e.getMessage());
        }
    }


    private void writeValue(String directoryPath) {
        String valueDirectoryPath = directoryPath + "/Value";
        File valueDirectory = new File(valueDirectoryPath);
        if (!valueDirectory.exists()) {
            valueDirectory.mkdirs();
        }
        writeValueFiles(valueDirectoryPath);
    }

    private void writeValueFiles(String valueDirectoryPath) {
        String valueCardTsContent = """
            import { FC, useState } from "react";

            const ValueCard: FC<{
              imageUrl: string;
              title: string;
              description: string;
            }> = ({ imageUrl, title, description }) => {
              const [hovered, setHovered] = useState(false);

              return (
                <div
                  className="card group relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {imageUrl && (
                    <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
                      <img
                        className={`inline-block h-full w-full transform object-contain transition-all ease-in-out ${
                          hovered ? "scale-105" : ""
                        }`}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="content rounded-2xl bg-white p-5">
                    <h2 className="title text-2xl font-bold">{title}</h2>
                    <p className="description text-base">{description}</p>
                  </div>
                  <div className="flex-grow rounded-2xl bg-white"></div>
                </div>
              );
            };

            export default ValueCard;
            """;

        String valueSectionTsContent = """
            import { FC } from "react";
            import { ValueType } from "../../types/Section.tsx";
            import ValueCard from "./ValueCard.tsx";
            import { ValuesData } from "../../types/Values.tsx";

            const ValueSection: FC<{
              details: ValueType;
            }> = ({ details }) => {
              return (
                <section className="relative mb-20 mt-20">
                  <div className="container mx-auto max-w-screen-lg px-5">
                    <h2 className="mb-8 text-center text-3xl font-bold transition-all">
                      {details.headerOne}
                    </h2>
                    <p className="mb-8 text-center text-lg font-semibold transition-all">
                      {details.descriptionOne}
                    </p>
                    <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
                      {details.values.map((value, index) => (
                        <ValueCard
                          key={index}
                          title={value.value.replaceAll("_", " ")}
                          description={ValuesData[value.value].description}
                          imageUrl={ValuesData[value.value].image}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            };

            export default ValueSection;
            """;

        File valueCardTsFile = new File(valueDirectoryPath + "/ValueCard.tsx");
        File valueSectionTsFile = new File(valueDirectoryPath + "/ValueSection.tsx");
        try (FileWriter writer = new FileWriter(valueCardTsFile)) {
            writer.write(valueCardTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ValueCard.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(valueSectionTsFile)) {
            writer.write(valueSectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ValueSection.tsx file: " + e.getMessage());
        }
    }


    private void writeSectionsComponent(String directoryPath) {
        String sectionsTsContent = """
        import { FC } from "react";
        import { UserData } from "../types/UserData.tsx";
        import SkillSection from "./Skill/SkillSection.tsx";
        import {
          FAQType,
          ResumeType,
          SkillType,
          StoryType,
          ValueType,
        } from "../types/Section.tsx";
        import StorySection from "./Story/StorySection.tsx";
        import ResumeSection from "./Resume/ResumeSection.tsx";
        import FAQSection from "./FAQ/FaqSection.tsx";
        import ValueSection from "./Value/ValueSection.tsx";
        import { HomeData } from "../types/HomeData.tsx";
        import { AboutData } from "../types/AboutData.tsx";
        import ContactData from "../types/ContactData.tsx";

        const Sections: FC<{
          userData: UserData;
          pageData: HomeData | AboutData | ContactData;
        }> = ({ userData, pageData }) => {
          return (
            <>
              {pageData.sections
                .sort((a, b) => a.details.order - b.details.order)
                .map((section, index) => {
                  const { type, details } = section;
                  let sectionComponent;
                  switch (type) {
                    case "SKILL":
                      if ("headerOne" in details) {
                        sectionComponent = (
                          <SkillSection
                            key={index}
                            userData={userData}
                            details={details as SkillType}
                          />
                        );
                      }
                      break;
                    case "STORY":
                      if (
                        "descriptionOne" in details &&
                        "bulletOne" in details &&
                        "bulletTwo" in details &&
                        "bulletThree" in details &&
                        "imageOne" in details
                      ) {
                        sectionComponent = (
                          <StorySection key={index} details={details as StoryType} />
                        );
                      }
                      break;
                    case "RESUME":
                      if ("headerOne" in details) {
                        sectionComponent = (
                          <ResumeSection
                            key={index}
                            details={details as ResumeType}
                            userData={userData}
                          />
                        );
                      }
                      break;
                    case "FAQ":
                      if (
                        "descriptionOne" in details &&
                        "headerOne" in details &&
                        "faq" in details
                      ) {
                        sectionComponent = (
                          <FAQSection key={index} details={details as FAQType} />
                        );
                      }
                      break;
                    case "VALUE":
                      if (
                        "descriptionOne" in details &&
                        "headerOne" in details &&
                        "values" in details
                      ) {
                        sectionComponent = (
                          <ValueSection key={index} details={details as ValueType} />
                        );
                      }
                      break;
                    default:
                      sectionComponent = null;
                  }
                  return sectionComponent;
                })}
            </>
          );
        };

        export default Sections;
        """;

        File sectionsTsFile = new File(directoryPath + "/Sections.tsx");
        try (FileWriter writer = new FileWriter(sectionsTsFile)) {
            writer.write(sectionsTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Sections.tsx file: " + e.getMessage());
        }
    }

    private void writeTypes(String directoryPath) {
        String typesDirectoryPath = directoryPath + "/types";
        File typesDirectory = new File(typesDirectoryPath);
        if (!typesDirectory.exists()) {
            typesDirectory.mkdirs();
        }
        writeTypesFiles(typesDirectoryPath);
    }

    private void writeTypesFiles(String typesDirectoryPath) {
        String aboutDataTsContent = """
            import { Section } from "./Section.tsx";

            interface AboutData {
              headerOne: string;
              iconOne: string;
              iconTwo: string;
              headerTwo: string;
              iconThree: string;
              descriptionOne: string;
              descriptionTwo: string;
              sections: Section[];
            }

            export type { AboutData };
            """;

        String contactDataTsContent = """
            import { Section } from "./Section.tsx";

            type ContactData = {
              headerOne: string;
              descriptionOne: string;
              sections: Section[];
            };

            export default ContactData;
            """;

        String homeDataTsContent = """
            import { Section } from "./Section.tsx";

            interface HomeData {
              headerOne: string;
              descriptionOne: string;
              headerTwo: string;
              profileImage: string;
              sections: Section[];
            }

            export type { HomeData };
            """;

        String sectionTsContent = """
            type StoryType = {
              headerOne: string;
              descriptionOne: string;
              bulletOne: string;
              bulletTwo: string;
              bulletThree: string;
              imageOne: string;
              order: number;
            };

            type ValueType = {
              headerOne: string;
              descriptionOne: string;
              values: {
                value: string;
              }[];
              order: number;
            };

            type ResumeType = {
              headerOne: string;
              order: number;
            };

            type SkillType = {
              headerOne: string;
              order: number;
            };

            type FAQType = {
              headerOne: string;
              descriptionOne: string;
              faq: [
                {
                  question: string;
                  answer: string;
                  id: string;
                }
              ];
              order: number;
            };

            type SectionDetails = StoryType | ResumeType | SkillType | FAQType | ValueType;
            type SectionType = "STORY" | "RESUME" | "SKILL" | "FAQ" | "VALUE";

            type Section = {
              type: SectionType;
              details: SectionDetails;
            };

            export type {
              Section,
              StoryType,
              ResumeType,
              SkillType,
              FAQType,
              ValueType,
              SectionType,
            };
            """;

        String userDataTsContent = """
            interface Project {
              name: string;
              description: string;
              languages: string[];
              updatedAt: string;
              image: string;
              id: string;
              slug: string;
            }

            interface Work {
              id: number;
              company: string;
              position: string;
              startDate: string;
              endDate: string;
              description: string;
              orderId: number;
              image: string;
            }

            interface Slug {
              slug: string;
              header: string;
              description: string;
              about: string;
              image: string;
              overview: string;
              platforms: string;
              link: string;
            }

            interface UserData {
              name: string;
              email: string;
              phone: string;
              company: string;
              location: string;
              about: string;
              skills: string[];
              projects: Project[];
              work: Work[];
              role: string;
              profession: string;
              services: string[];
              slugs: Slug[];
            }

            export type { UserData };
            """;

        String servicesTsContent = """
                export const Services = [
                  "Web Development",
                  "Mobile Development",
                  "Desktop Development",
                  "Game Development",
                  "Machine Learning",
                  "Data Science",
                  "Artificial Intelligence",
                  "Cloud Computing",
                  "Cyber Security",
                  "DevOps",
                  "Quality Assurance",
                  "Project Management",
                  "Business Analysis",
                  "UI/UX Design",
                  "Product Management",
                  "Technical Support",
                  "Technical Writing",
                  "SEO Optimization",
                  "E-commerce Development",
                  "Content Management",
                  "Database Administration",
                  "Digital Marketing",
                  "Graphic Design",
                  "AR/VR Development",
                  "Network Administration",
                  "IT Consultation",
                  "Systems Integration",
                  "IT Strategy",
                  "Hardware Development",
                  "Software Training",
                  "Blockchain Development",
                ];
                type ServiceDataType = {
                  [key: string]: {
                    description: string;
                    image: string;
                  };
                };
                export const ServiceData: ServiceDataType = {
                  WEB_DEVELOPMENT: {
                    description:
                      "I offer web development services to create interactive and dynamic websites.",
                    image: "https://img.icons8.com/cotton/800/code.png",
                  },
                  MOBILE_DEVELOPMENT: {
                    description:
                      "My mobile development services ensure intuitive and feature-rich mobile applications for iOS and Android platforms.",
                    image: "https://img.icons8.com/cotton/800/uber-mobile-app.png",
                  },
                  DESKTOP_DEVELOPMENT: {
                    description:
                      "I specialize in desktop development to build powerful and efficient software applications for various operating systems.",
                    image: "https://img.icons8.com/cotton/700/monitor--v1.png",
                  },
                  GAME_DEVELOPMENT: {
                    description:
                      "Get captivating and immersive gaming experiences with my game development services.",
                    image: "https://img.icons8.com/cotton/800/visual-game-boy--v1.png",
                  },
                  E_COMMERCE_DEVELOPMENT: {
                    description:
                      "I provide e-commerce development solutions to establish and optimize your online store.",
                    image: "https://img.icons8.com/cotton/800/card-security.png",
                  },
                  AR_VR_DEVELOPMENT: {
                    description:
                      "Experience virtual reality (VR) and augmented reality (AR) at its best with my AR/VR development expertise.",
                    image: "https://img.icons8.com/cotton/800/augmented-reality-1-1.png",
                  },
                  BLOCKCHAIN_DEVELOPMENT: {
                    description:
                      "Unlock the potential of blockchain technology with my blockchain development services for secure and decentralized applications.",
                    image: "https://img.icons8.com/cotton/800/nft-collection.png",
                  },
                  MACHINE_LEARNING: {
                    description:
                      "Harness the power of machine learning to extract insights and patterns from your data.",
                    image: "https://img.icons8.com/cotton/800/brain-3.png",
                  },
                  DATA_SCIENCE: {
                    description:
                      "My data science services leverage advanced analytics techniques to unlock the value hidden in your data.",
                    image: "https://img.icons8.com/cotton/800/filter--v2.png",
                  },
                  ARTIFICIAL_INTELLIGENCE: {
                    description:
                      "I offer artificial intelligence solutions to create intelligent systems and automate processes.",
                    image: "https://img.icons8.com/cotton/800/artificial-intelligence.png",
                  },
                  CLOUD_COMPUTING: {
                    description:
                      "I provide cloud computing services to host and manage your applications and data in the cloud.",
                    image: "https://img.icons8.com/cotton/800/cloud-computing.png",
                  },
                  DEVOPS: {
                    description:
                      "Streamline your software development and deployment with my DevOps practices and tools.",
                    image: "https://img.icons8.com/cotton/800/developer.png",
                  },
                  SYSTEMS_INTEGRATION: {
                    description:
                      "Integrate multiple systems and applications seamlessly to ensure smooth data flow and interoperability.",
                    image: "https://img.icons8.com/cotton/800/virtual-machine2.png",
                  },
                  CYBER_SECURITY: {
                    description:
                      "Protect your digital assets and data from cyber threats with my comprehensive cybersecurity services.",
                    image: "https://img.icons8.com/cotton/800/hacking.png",
                  },
                  NETWORK_ADMINISTRATION: {
                    description:
                      "Ensure smooth and secure network operations with my network administration services.",
                    image: "https://img.icons8.com/cotton/800/wifi--v3.png",
                  },
                  PROJECT_MANAGEMENT: {
                    description:
                      "Efficiently plan, execute, and manage your projects with my project management expertise.",
                    image: "https://img.icons8.com/cotton/800/task-planning.png",
                  },
                  BUSINESS_ANALYSIS: {
                    description:
                      "Gain valuable insights into your business processes and optimize them with my business analysis services.",
                    image:
                      "https://img.icons8.com/cotton/800/financial-growth-analysis--v1.png",
                  },
                  PRODUCT_MANAGEMENT: {
                    description:
                      "Optimize your product development lifecycle and strategy with my product management services.",
                    image: "https://img.icons8.com/cotton/800/packing.png",
                  },
                  IT_STRATEGY: {
                    description:
                      "Align your IT initiatives with your business goals and drive innovation with my IT strategy services.",
                    image: "https://img.icons8.com/cotton/800/settings--v1.png",
                  },
                  UI_UX_DESIGN: {
                    description:
                      "I create intuitive and visually appealing user interfaces (UI) and user experiences (UX) to enhance user engagement.",
                    image: "https://img.icons8.com/cotton/800/browser-themes.png",
                  },
                  GRAPHIC_DESIGN: {
                    description:
                      "My graphic design services provide visually striking and professional designs for various purposes.",
                    image: "https://img.icons8.com/cotton/800/paint-palette--v1.png",
                  },
                  TECHNICAL_WRITING: {
                    description:
                      "Communicate complex technical concepts effectively with my technical writing services.",
                    image: "https://img.icons8.com/cotton/800/memo--v1.png",
                  },
                  SEO_OPTIMIZATION: {
                    description:
                      "Improve your website's visibility and rankings on search engines with my SEO optimization services.",
                    image: "https://img.icons8.com/cotton/800/laptop-search.png",
                  },
                  CONTENT_MANAGEMENT: {
                    description:
                      "Efficiently organize, manage, and publish your content with my content management services.",
                    image: "https://img.icons8.com/cotton/800/camcorder-pro.png",
                  },
                  DIGITAL_MARKETING: {
                    description:
                      "Boost your online presence and reach your target audience through my comprehensive digital marketing strategies.",
                    image: "https://img.icons8.com/cotton/800/rebalance-portfolio.png",
                  },
                  TECHNICAL_SUPPORT: {
                    description:
                      "I provide technical support services to assist you with any IT-related issues and ensure smooth operations.",
                    image: "https://img.icons8.com/cotton/800/robot-2.png",
                  },
                  DATABASE_ADMINISTRATION: {
                    description:
                      "Ensure the optimal performance and security of your databases with my database administration services.",
                    image: "https://img.icons8.com/cotton/800/database-error.png",
                  },
                  IT_CONSULTATION: {
                    description:
                      "Get expert IT consultation and guidance to align your technology strategy with your business objectives.",
                    image: "https://img.icons8.com/cotton/800/survey.png",
                  },
                  HARDWARE_DEVELOPMENT: {
                    description:
                      "I specialize in hardware development to design and build custom hardware solutions tailored to your needs.",
                    image: "https://img.icons8.com/cotton/800/computer.png",
                  },
                  SOFTWARE_TRAINING: {
                    description:
                      "Enhance your team's skills and knowledge with my comprehensive software training programs.",
                    image: "https://img.icons8.com/cotton/800/outline.png",
                  },
                  QUALITY_ASSURANCE: {
                    description:
                      "Ensure the quality and reliability of your software products through my rigorous quality assurance processes.",
                    image: "https://img.icons8.com/cotton/800/000000/apple--v1.png",
                  },
                };
                                
                export type Services = (typeof Services)[number];            \s
                """;

        String valuesTsContent = """
                export const Values = [
                  "Integrity",
                  "Quality",
                  "Growth",
                  "Innovation",
                  "Hard Work",
                  "Transparency",
                  "Teamwork",
                  "Respect",
                  "Trust",
                  "Accountability",
                  "Passion",
                  "Fun",
                  "Customer Satisfaction",
                  "Social Responsibility",
                  "Diversity",
                  "Empowerment",
                  "Excellence",
                  "Creativity",
                  "Efficiency",
                  "Flexibility",
                  "Honesty",
                  "Loyalty",
                  "Openness",
                  "Reliability",
                  "Responsiveness",
                  "Sustainability",
                  "Trustworthiness",
                ];
                                
                export type ValuesFormatted =
                  | "INTEGRITY"
                  | "QUALITY"
                  | "GROWTH"
                  | "INNOVATION"
                  | "HARD_WORK"
                  | "TRANSPARENCY"
                  | "TEAMWORK"
                  | "RESPECT"
                  | "TRUST"
                  | "ACCOUNTABILITY"
                  | "PASSION"
                  | "FUN"
                  | "CUSTOMER_SATISFACTION"
                  | "SOCIAL_RESPONSIBILITY"
                  | "DIVERSITY"
                  | "EMPOWERMENT"
                  | "EXCELLENCE"
                  | "CREATIVITY"
                  | "EFFICIENCY"
                  | "FLEXIBILITY"
                  | "HONESTY"
                  | "LOYALTY"
                  | "OPENNESS"
                  | "RELIABILITY"
                  | "RESPONSIVENESS"
                  | "SUSTAINABILITY"
                  | "TRUSTWORTHINESS";
                                
                export const ValuesData: {
                  [key: string]: { description: string; image: string };
                } = {
                  INTEGRITY: {
                    description:
                      "I believe in honesty and integrity in all my actions. I keep my promises and take responsibility for my actions.",
                    image: "https://img.icons8.com/cotton/400/field--v1.png",
                  },
                  QUALITY: {
                    description:
                      "I strive for excellence in everything I do. I am committed to delivering high-quality services to my clients.",
                    image: "https://img.icons8.com/cotton/400/birthday-cake.png",
                  },
                  GROWTH: {
                    description:
                      "I believe in continuous learning and growth. I am always looking for ways to improve my skills and knowledge.",
                    image: "https://img.icons8.com/cotton/400/hand-planting--v1.png",
                  },
                  INNOVATION: {
                    description:
                      "I believe in innovation and creativity. I am always looking for new and better ways to solve problems.",
                    image: "https://img.icons8.com/cotton/400/gas-industry.png",
                  },
                  HARD_WORK: {
                    description:
                      "I believe in hard work and dedication. I am committed to achieving my goals and delivering results.",
                    image: "https://img.icons8.com/cotton/400/fast-delivery--v1.png",
                  },
                  TRANSPARENCY: {
                    description:
                      "I believe in transparency and openness. I am always honest and upfront with my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/search-property.png",
                  },
                  TEAMWORK: {
                    description:
                      "I believe in teamwork and collaboration. I work well with others and value the contributions of my team members.",
                    image: "https://img.icons8.com/cotton/400/leader-1.png",
                  },
                  RESPECT: {
                    description:
                      "I believe in respect for others. I treat everyone with dignity and respect, regardless of their position or background.",
                    image: "https://img.icons8.com/cotton/400/trust--v1.png",
                  },
                  TRUST: {
                    description:
                      "I believe in trust and loyalty. I am trustworthy and loyal to my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/trust--v1.png",
                  },
                  ACCOUNTABILITY: {
                    description:
                      "I believe in accountability and responsibility. I take ownership of my actions and accept responsibility for my mistakes.",
                    image: "https://img.icons8.com/cotton/400/graph--v1.png",
                  },
                  PASSION: {
                    description:
                      "I believe in passion and enthusiasm. I am passionate about my work and enthusiastic about my clients’ success.",
                    image: "https://img.icons8.com/cotton/400/fruit-ice-cream-cone.png",
                  },
                  FUN: {
                    description:
                      "I believe in having fun at work. I enjoy what I do and have fun doing it.",
                    image: "https://img.icons8.com/cotton/400/slightly-smiling-face-icon.png",
                  },
                  CUSTOMER_SATISFACTION: {
                    description:
                      "I believe in customer satisfaction. I am committed to providing excellent service to my clients.",
                    image: "https://img.icons8.com/cotton/400/completed-task--v2.png",
                  },
                  SOCIAL_RESPONSIBILITY: {
                    description:
                      "I believe in social responsibility. I am committed to making a positive impact on society and the environment.",
                    image: "https://img.icons8.com/cotton/400/school-backpack--v1.png",
                  },
                  DIVERSITY: {
                    description:
                      "I believe in diversity and inclusion. I value the contributions of people from different backgrounds and cultures.",
                    image: "https://img.icons8.com/cotton/400/holy-bible.png",
                  },
                  EMPOWERMENT: {
                    description:
                      "I believe in empowerment and autonomy. I trust my team members to make decisions and take action without my approval.",
                    image: "https://img.icons8.com/cotton/400/flex-biceps.png",
                  },
                  EXCELLENCE: {
                    description:
                      "I believe in excellence and quality. I strive for excellence in everything I do.",
                    image: "https://img.icons8.com/cotton/400/apple--v1.png",
                  },
                  CREATIVITY: {
                    description:
                      "I believe in creativity and innovation. I am always looking for new and better ways to solve problems.",
                    image: "https://img.icons8.com/cotton/400/paint-brush.png",
                  },
                  EFFICIENCY: {
                    description:
                      "I believe in efficiency and effectiveness. I am always looking for ways to improve my productivity and efficiency.",
                    image: "https://img.icons8.com/cotton/400/stopwatch.png",
                  },
                  FLEXIBILITY: {
                    description:
                      "I believe in flexibility and adaptability. I am willing to change my plans when necessary.",
                    image: "https://img.icons8.com/cotton/400/tape-measure.png",
                  },
                  HONESTY: {
                    description:
                      "I believe in honesty and integrity. I am always honest and upfront with my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/speaker.png",
                  },
                  LOYALTY: {
                    description:
                      "I believe in loyalty and commitment. I am loyal to my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/dog--v3.png",
                  },
                  OPENNESS: {
                    description:
                      "I believe in openness and transparency. I am always honest and upfront with my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/open-box--v1.png",
                  },
                  RELIABILITY: {
                    description:
                      "I believe in reliability and dependability. I am always on time and do what I say I will do.",
                    image: "https://img.icons8.com/cotton/400/certificate--v1.png",
                  },
                  RESPONSIVENESS: {
                    description:
                      "I believe in responsiveness and availability. I am always available to my clients and colleagues.",
                    image: "https://img.icons8.com/cotton/400/conflict--v1.png",
                  },
                  SUSTAINABILITY: {
                    description:
                      "I believe in sustainability and environmental responsibility. I am committed to reducing my environmental impact.",
                    image: "https://img.icons8.com/cotton/400/tree.png",
                  },
                  TRUSTWORTHINESS: {
                    description:
                      "I believe in trustworthiness and reliability. I am always on time and do what I say I will do.",
                    image: "https://img.icons8.com/cotton/400/handshake--v2.png",
                  },
                };
                                
                export type Values = (typeof Values)[number];                      \s
                """;

        File aboutDataTsFile = new File(typesDirectoryPath + "/AboutData.tsx");
        File contactDataTsFile = new File(typesDirectoryPath + "/ContactData.tsx");
        File homeDataTsFile = new File(typesDirectoryPath + "/HomeData.tsx");
        File sectionTsFile = new File(typesDirectoryPath + "/Section.tsx");
        File userDataTsFile = new File(typesDirectoryPath + "/UserData.tsx");
        File servicesTsFile = new File(typesDirectoryPath + "/Services.tsx");
        File valuesTsFile = new File(typesDirectoryPath + "/Values.tsx");
        try (FileWriter writer = new FileWriter(aboutDataTsFile)) {
            writer.write(aboutDataTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write AboutData.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(contactDataTsFile)) {
            writer.write(contactDataTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ContactData.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(homeDataTsFile)) {
            writer.write(homeDataTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write HomeData.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(sectionTsFile)) {
            writer.write(sectionTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Section.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(userDataTsFile)) {
            writer.write(userDataTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write UserData.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(servicesTsFile)) {
            writer.write(servicesTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Services.tsx file: " + e.getMessage());
        }
        try{
            FileWriter writer = new FileWriter(valuesTsFile);
            writer.write(valuesTsContent);
            writer.close();
        } catch (IOException e) {
            System.err.println("Failed to write Values.tsx file: " + e.getMessage());
        }
    }

    private void writeUtil(String directoryPath){
        String utilDirectoryPath = directoryPath + "/util";
        File utilDirectory = new File(utilDirectoryPath);
        if (!utilDirectory.exists()) {
            utilDirectory.mkdirs();
        }
        writeUtilFiles(utilDirectoryPath);
    }

    private void writeUtilFiles(String utilDirectoryPath) {
        String colorsTsContent = """
        export const COLORS = [
          "bg-blue-300",
          "bg-red-300",
          "bg-yellow-300",
          "bg-green-300",
          "bg-indigo-300",
          "bg-purple-300",
          "bg-pink-300",
          "bg-teal-300",
          "bg-amber-300",
          "bg-lime-300",
          "bg-emerald-300",
          "bg-cyan-300",
          "bg-sky-300",
          "bg-rose-300",
          "bg-fuchsia-300",
          "bg-violet-300",
          "bg-gray-300",
          "bg-[#FFA07A]",
          "bg-[#98FB98]",
          "bg-[#ADD8E6]",
          "bg-[#FFB6C1]",
          "bg-[#FFA07A]",
          "bg-[#20B2AA]",
          "bg-[#9370DB]",
          "bg-[#87CEFA]",
          "bg-[#FF69B4]",
          "bg-[#BA55D3]",
          "bg-[#40E0D0]",
          "bg-[#FFD700]",
          "bg-[#1E90FF]",
          "bg-[#FF6347]",
          "bg-[#7CFC00]",
          "bg-[#4169E1]",
          "bg-[#FF4500]",
          "bg-[#3CB371]",
          "bg-[#800080]",
        ];
        """;

        File colorsTsFile = new File(utilDirectoryPath + "/COLORS.ts");

        try (FileWriter writer = new FileWriter(colorsTsFile)) {
            writer.write(colorsTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write COLORS.ts file: " + e.getMessage());
        }
    }

    private void writePages(String directoryPath){
        String pagesDirectoryPath = directoryPath + "/pages";
        File pagesDirectory = new File(pagesDirectoryPath);
        if (!pagesDirectory.exists()) {
            pagesDirectory.mkdirs();
        }
        writePagesFiles(pagesDirectoryPath);
    }

    private void writePagesFiles(String pagesDirectoryPath){
        writeAbout(pagesDirectoryPath);
        writeContact(pagesDirectoryPath);
        writeHome(pagesDirectoryPath);
        writeProject(pagesDirectoryPath);
        writeProjects(pagesDirectoryPath);
    }

    private void writeAbout(String directoryPath){
        String aboutDirectoryPath = directoryPath + "/About";
        File aboutDirectory = new File(aboutDirectoryPath);
        if (!aboutDirectory.exists()) {
            aboutDirectory.mkdirs();
        }
        writeAboutFiles(aboutDirectoryPath);
    }

    private void writeAboutFiles(String aboutDirectoryPath){
        String aboutTsContent = """
                import {FC, useEffect, useState} from "react";
                import { UserData } from "../../common/types/UserData.tsx";
                import { AboutData } from "../../common/types/AboutData.tsx";
                import { useSpring, animated } from "react-spring";
                import { Link } from "react-router-dom";
                import Marquee from "../../common/Marquee/Marquee.tsx";
                import Sections from "../../common/Sections/Sections.tsx";
                                
                const About: FC<{
                  userData: UserData;
                  pageData: AboutData;
                }> = ({ userData, pageData }) => {
                  const headerAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  const imageAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 300,
                  });
                                
                  const descriptionAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  const [iconOneImage, setIconOneImage] = useState(null);
                  const [iconTwoImage, setIconTwoImage] = useState(null);
                  const [iconThreeImage, setIconThreeImage] = useState(null);
                                
                  useEffect(() => {
                    import(`../../assets/images/${pageData.iconOne}.png`)
                        .then(module => {
                          setIconOneImage(module.default);
                        })
                        .catch(error => {
                          console.error("Failed to load iconOne image:", error);
                        });
                                
                    import(`../../assets/images/${pageData.iconTwo}.png`)
                        .then(module => {
                          setIconTwoImage(module.default);
                        })
                        .catch(error => {
                          console.error("Failed to load iconTwo image:", error);
                        });
                                
                    import(`../../assets/images/${pageData.iconThree}.png`)
                        .then(module => {
                          setIconThreeImage(module.default);
                        })
                        .catch(error => {
                          console.error("Failed to load iconThree image:", error);
                        });
                  }, [pageData.iconOne, pageData.iconTwo, pageData.iconThree]);
                                
                                
                  return (
                    <>
                      <main>
                        <>
                          <div className="container mx-auto my-20 max-w-screen-lg px-5">
                            <section className="about mb-20 grid grid-cols-2 justify-center gap-10 md:h-[400px] md:grid-cols-5">
                              <animated.div
                                style={headerAnimation}
                                className="col-span-2 flex flex-col justify-center md:order-2 md:col-span-3"
                              >
                                <div>
                                  <h2 className="mb-5 text-center text-5xl font-bold transition-all  md:text-7xl">
                                    {pageData.headerOne}
                                  </h2>
                                </div>
                                <div className="ml-5">
                                  <p className="mb-5 text-center text-2xl font-semibold transition-all ">
                                    {pageData.descriptionOne}
                                  </p>
                                </div>
                                <div className="flex justify-center text-center">
                                  <Link
                                    to="/contact"
                                    className="mb-4 inline-block rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500"
                                  >
                                    Get in touch
                                  </Link>
                                </div>
                              </animated.div>
                              <animated.div
                                style={imageAnimation}
                                className="image-wrapper relative order-2 h-[150px] w-[150px] text-center md:order-1 md:self-end"
                              >
                                <div className="h-full w-full overflow-hidden rounded-full">
                                  <img
                                    className="h-full w-full object-cover"
                                    src={iconOneImage || 'https://picsum.photos/400/400'}
                                    alt="portfolio"
                                  />
                                </div>
                              </animated.div>
                                
                              <animated.div
                                style={imageAnimation}
                                className="image-wrapper relative order-last h-[150px] w-[150px] text-center md:self-start"
                              >
                                <div className="h-full w-full overflow-hidden rounded-full">
                                  <img
                                    className="h-full w-full object-cover"
                                    src={iconTwoImage || 'https://picsum.photos/400/400'}
                                    alt="portfolio"
                                  />
                                </div>
                              </animated.div>
                            </section>
                          </div>
                          <animated.section
                            style={descriptionAnimation}
                            className="story mb-20"
                          >
                            <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 md:grid md:grid-cols-2 md:items-start md:justify-between">
                              <div className="content-left">
                                <div className="flex justify-center md:justify-between">
                                  <h2 className="mb-8 text-center text-4xl font-bold transition-all  lg:text-left lg:text-6xl lg:leading-tight">
                                    {pageData.headerTwo}
                                  </h2>
                                </div>
                                <div className="image-wrapper relative mb-5 h-60 w-full sm:mx-auto sm:h-[200px] sm:w-[300px] md:mx-0 md:h-[200px] md:w-[400px] lg:h-72 lg:w-[500px]">
                                  <div className="h-full w-full overflow-hidden rounded-3xl border-2 border-black">
                                    <img
                                      className="h-full w-full object-cover"
                                      src={iconThreeImage || 'https://picsum.photos/400/400'}
                                      alt="portfolio"
                                    />
                                  </div>
                                </div>
                                <p className="mb-5 text-2xl font-semibold transition-all">
                                  {pageData.descriptionTwo}
                                </p>
                              </div>
                            </div>
                          </animated.section>
                          <Marquee
                            items={userData.services.map((service) => {
                              return service
                                .split("_")
                                .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                                .join(" ");
                            })}
                          />
                        </>
                        <Sections pageData={pageData} userData={userData} />
                      </main>
                    </>
                  );
                };
                                
                export default About;
                """;

        File aboutTsFile = new File(aboutDirectoryPath + "/About.tsx");
        try (FileWriter writer = new FileWriter(aboutTsFile)) {
            writer.write(aboutTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write About.tsx file: " + e.getMessage());
        }
    }

    private void writeContact(String directoryPath){
        String contactDirectoryPath = directoryPath + "/Contact";
        File contactDirectory = new File(contactDirectoryPath);
        if (!contactDirectory.exists()) {
            contactDirectory.mkdirs();
        }
        writeContactFiles(contactDirectoryPath);
    }

    private void writeContactFiles(String contactDirectoryPath){
        String contactTsContent = """
                import { FC, useEffect } from "react";
                import ContactData from "../../common/types/ContactData.tsx";
                import { UserData } from "../../common/types/UserData.tsx";
                import Sections from "../../common/Sections/Sections.tsx";
                import { useSpring, animated } from "react-spring";
                import Form from "./Form.tsx";
                                
                const ContactP: FC<{
                  pageData: ContactData;
                  userData: UserData;
                }> = ({ pageData, userData }) => {
                  useEffect(() => {
                    window.scrollTo(0, 0);
                  }, []);
                                
                  const animationProps = useSpring({
                    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  return (
                    <>
                      <main>
                        <div className="container mx-auto my-20 max-w-screen-lg px-5">
                          <div className="wrapper items-center gap-10 md:flex">
                            <animated.div
                              style={animationProps}
                              className="content mx-auto max-w-lg md:mx-0"
                            >
                              <h2 className="  text-center text-5xl font-bold transition-all md:text-left md:text-6xl">
                                {pageData.headerOne}
                              </h2>
                              <p className=" transition-all md:text-left">
                                {pageData.descriptionOne}
                              </p>
                              <div className="mb-5">
                                <div className="card contact-card rounded-lg border-2 border-black p-5">
                                  <div className="mb-8 inline-block w-full">
                                    <div className="flex items-center justify-center gap-4">
                                      <img
                                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                                        loading="eager"
                                        alt="envelope icon"
                                      />
                                      <a
                                        href={`mailto:${userData.email}`}
                                        className="w-full transition-all"
                                      >
                                        <p
                                          className={
                                            "transition-all hover:text-blue-500 hover:opacity-80"
                                          }
                                        >
                                          {userData.email}
                                        </p>
                                      </a>
                                    </div>
                                  </div>
                                
                                  <div className="flex items-center gap-4">
                                    <img
                                      src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                                      loading="eager"
                                      alt="phone icon"
                                    />
                                    <a
                                      href={`tel:${userData.phone}`}
                                      className="w-full transition-all"
                                    >
                                      <p
                                        className={
                                          "transition-all hover:text-blue-500 hover:opacity-80"
                                        }
                                      >
                                        {userData.phone}
                                      </p>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </animated.div>
                            <Form userData={userData} />
                          </div>
                        </div>
                      </main>
                      <Sections userData={userData} pageData={pageData} />
                    </>
                  );
                };
                                
                export default ContactP;
                                
                """;

        String formTsContent = """
                import { FC, FormEvent, useState } from "react";
                import { UserData } from "../../common/types/UserData.tsx";
                import { useSpring, animated } from "react-spring";
                                
                type formData = {
                  message: string;
                  subject: string;
                };
                                
                const FormP: FC<{
                  userData: UserData;
                }> = ({ userData }) => {
                  const [formData, setFormData] = useState<formData>({
                    subject: "",
                    message: "",
                  });
                                
                  const animationProps = useSpring({
                    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                  });
                                
                  const handleChange = (event: FormEvent<EventTarget>) => {
                    const { name, value } = event.target as HTMLInputElement;
                    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                  };
                                
                  return (
                    <animated.form
                      noValidate={true}
                      style={animationProps}
                      className="contact-form rounded-lg border-2 border-black p-5 shadow-custom"
                    >
                      <div className="mb-5 justify-between gap-5 md:flex">
                        <div className="form-control relative w-full">
                          <label htmlFor="subject" className="mb-4 block font-bold">
                            Subject
                          </label>
                          <input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            className="w-full rounded-lg border-2 border-black px-5  py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                                
                      <div className="mb-5 justify-between md:flex">
                        <div className="form-control relative">
                          <label htmlFor="message" className="mb-4 block font-bold">
                            Message
                          </label>
                          <textarea
                            name="message"
                            placeholder="Your Message"
                            className="w-full rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
                            rows={4}
                            cols={100}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <a
                        href={`mailto:${userData.email}?subject=${encodeURIComponent(
                          formData.subject
                        )}&body=${encodeURIComponent(formData.message)}`}
                        className="w-full rounded-lg bg-black px-5 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 focus:border-current focus:ring-0 md:w-auto"
                      >
                        Send Message
                      </a>
                    </animated.form>
                  );
                };
                                
                export default FormP;
                """;

        File contactTsFile = new File(contactDirectoryPath + "/Contact.tsx");
        File formTsFile = new File(contactDirectoryPath + "/Form.tsx");
        try (FileWriter writer = new FileWriter(contactTsFile)) {
            writer.write(contactTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Contact.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(formTsFile)) {
            writer.write(formTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Form.tsx file: " + e.getMessage());
        }
    }

    private void writeHome(String directoryPath){
        String homeDirectoryPath = directoryPath + "/Home";
        File homeDirectory = new File(homeDirectoryPath);
        if (!homeDirectory.exists()) {
            homeDirectory.mkdirs();
        }
        writeHomeFiles(homeDirectoryPath);
    }

    private void writeHomeFiles(String homeDirectoryPath){
        String homeTsContent = """
                import {FC, useEffect, useState} from "react";
                import { animated, useSpring } from "react-spring";
                import { Link } from "react-router-dom";
                import { HomeData } from "../../common/types/HomeData.tsx";
                import { UserData } from "../../common/types/UserData.tsx";
                import Sections from "../../common/Sections/Sections.tsx";
                                
                const Home: FC<{
                  pageData: HomeData;
                  userData: UserData;
                }> = ({ pageData, userData }) => {
                  const headerAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  const imageAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 200,
                  });
                                
                  const [profileImage, setProfileImage] = useState(null);
                  useEffect(() => {
                    import(`../../assets/images/${pageData.profileImage}.png`)
                        .then(module => {
                          setProfileImage(module.default);
                        })
                        .catch(error => {
                          console.error("Failed to load profile image:", error);
                        });
                                
                  }, [pageData.profileImage]);
                                
                                
                  return (
                    <>
                      <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row xl:mx-auto xl:justify-center">
                          <animated.div style={headerAnimation}>
                            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center font-bold xl:mt-32">
                              <h1 className="font-extra-bold max-w-[15ch] text-center text-4xl leading-snug transition-all md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal">
                                {pageData.headerOne}
                              </h1>
                              <p className="max-w-[35ch] text-center text-base opacity-60 transition-all xl:max-w-[50ch] xl:text-left">
                                {pageData.descriptionOne}
                              </p>
                            </div>
                            <div className="mx-auto mt-5 flex justify-center xl:justify-start">
                              <Link
                                to="/contact"
                                className="mr-4 rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500"
                              >
                                Get in touch
                              </Link>
                              <Link
                                to="/projects"
                                className="rounded-xl border-2 border-black px-6 py-4 font-bold transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
                              >
                                View Projects
                              </Link>
                            </div>
                          </animated.div>
                          <animated.div style={imageAnimation}>
                            <div
                              className={`relative mx-auto mt-10 h-[300px] w-[300px] transition-all md:h-[500px] md:w-[500px] lg:mx-0 xl:ml-20 xl:mt-32`}
                            >
                              <div className="h-full w-full overflow-hidden rounded-3xl shadow-customHover">
                                <img
                                  className="h-full w-full object-cover"
                                  src={profileImage || 'https://picsum.photos/500/500'}
                                  alt="pfp"
                                ></img>
                              </div>
                            </div>
                          </animated.div>
                        </div>
                      </div>
                      <Sections pageData={pageData} userData={userData} />
                    </>
                  );
                };
                                
                export default Home;
                """;

        File homeTsFile = new File(homeDirectoryPath + "/Home.tsx");
        try (FileWriter writer = new FileWriter(homeTsFile)) {
            writer.write(homeTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Home.tsx file: " + e.getMessage());
        }
    }

    private void writeProject(String directoryPath){
        String projectDirectoryPath = directoryPath + "/Project";
        File projectDirectory = new File(projectDirectoryPath);
        if (!projectDirectory.exists()) {
            projectDirectory.mkdirs();
        }
        writeProjectFiles(projectDirectoryPath);
    }

    private void writeProjectFiles(String projectDirectoryPath){
        String projectTsContent = """
                import {FC, useEffect, useState} from "react";
                import { useNavigate, useParams } from "react-router-dom";
                import { UserData } from "../../common/types/UserData.tsx";
                import { useSpring, animated } from "react-spring";
                import { COLORS } from "../../common/util/COLORS.ts";
                                
                const Project: FC<{
                  userData: UserData;
                }> = ({ userData }) => {
                  const { slug } = useParams<{ slug: string }>();
                                
                  const navigate = useNavigate();
                                
                  const projectDetails = userData.slugs.find((s) => s.slug === slug);
                  const projectData = userData.projects.find((p) => p.slug === slug);
                                
                  useEffect(() => {
                    window.scrollTo(0, 0);
                  }, []);
                  const headerAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  const imageAnimation = useSpring({
                    from: { transform: "translate3d(-20px, 0, 0)", opacity: 0 },
                    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
                    delay: 300,
                  });
                                
                  const bottomProjectAnimation = useSpring({
                    from: { transform: "translate3d(0, 0, 0)", opacity: 0 },
                    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
                    delay: 400,
                  });
                                
                  const [imageSrc, setImageSrc] = useState(null);
                                
                  useEffect(() => {
                    import(`../../assets/images/${projectDetails?.image}.png`)
                        .then((module) => {
                          setImageSrc(module.default);
                        })
                        .catch((error) => {
                          console.error("Failed to load image", error);
                        });
                  }, [projectDetails?.image]);
                                
                  if (!slug || !projectDetails || !projectData) {
                    navigate("/404");
                    return null;
                  }
                                
                  return (
                    <>
                      <main>
                        <div className="container mx-auto my-20 max-w-screen-lg px-5">
                          <section className="hero mb-8">
                            <animated.div style={headerAnimation}>
                              <h1 className="mb-5   text-center text-4xl font-bold leading-snug transition-all ">
                                {projectDetails.header}
                              </h1>
                              <p className="mb-5 text-center font-semibold transition-all ">
                                {projectDetails.about}
                              </p>
                            </animated.div>
                            <animated.div style={imageAnimation}>
                              <div
                                className={`relative overflow-hidden rounded-lg border-2 border-black bg-white p-2 shadow-custom transition-all lg:h-[600px]`}
                              >
                                <img
                                  src={imageSrc || 'https://picsum.photos/400/400'}
                                  alt=""
                                  className={`block h-full w-full rounded-lg object-cover transition-all`}
                                />
                              </div>
                            </animated.div>
                          </section>
                          <animated.section
                            style={bottomProjectAnimation}
                            className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-6"
                          >
                            <div className="content-wrapper lg:col-span-4">
                              <h2 className="  text-3xl font-bold transition-all ">
                                {projectDetails.overview}
                              </h2>
                              <p className="mb-2 font-semibold transition-all ">
                                {projectDetails.description}
                              </p>
                            </div>
                            <div className="card grid gap-2 rounded-lg border-2 border-black bg-white p-2 shadow-custom lg:col-span-2">
                              <h2 className="text-2xl font-bold">Information</h2>
                              <ul className="list-disc pl-5">
                                <div className="li-wrapper">
                                  <li className="font-bold">Platform</li>
                                  <p className="font-normal transition-all">
                                    {projectDetails.platforms}
                                  </p>
                                </div>
                                <div className="li-wrapper">
                                  <li className="font-bold">Tech Stack</li>
                                  {projectData &&
                                    projectData.languages.map((language, index) => (
                                      <span
                                        className={`mb-2 mr-2 inline-block  rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[index]} py-2 text-sm`}
                                        key={index}
                                      >
                                        {language}
                                      </span>
                                    ))}
                                </div>
                              </ul>
                              <a
                                href={projectDetails.link}
                                target="_blank"
                                className="inline-block w-full self-end justify-self-end rounded-lg bg-black px-5 py-2 text-center text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500"
                              >
                                View Online ↗
                              </a>
                            </div>
                          </animated.section>
                        </div>
                      </main>
                    </>
                  );
                };
                                
                export default Project;
                """;

        File projectTsFile = new File(projectDirectoryPath + "/Project.tsx");
        try (FileWriter writer = new FileWriter(projectTsFile)) {
            writer.write(projectTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Project.tsx file: " + e.getMessage());
        }
    }

    private void writeProjects(String directoryPath){
        String projectsDirectoryPath = directoryPath + "/Projects";
        File projectsDirectory = new File(projectsDirectoryPath);
        if (!projectsDirectory.exists()) {
            projectsDirectory.mkdirs();
        }
        writeProjectsFiles(projectsDirectoryPath);
    }

    private void writeProjectsFiles(String projectsDirectoryPath){
        String projectCardTsContent = """
                import {FC, useEffect, useState} from "react";
                import { Link } from "react-router-dom";
                import { COLORS } from "../../common/util/COLORS.ts";
                                       
                                
                const ProjectCard: FC<{
                  title: string;
                  description: string;
                  image: string;
                  languages: string[];
                  slug: string;
                }> = ({ title, description, image, languages, slug }) => {
                  const [hovered, setHovered] = useState(false);
                  const [imageSrc, setImageSrc] = useState(null);
                                  
                  useEffect(() => {
                      import(`../../assets/images/${image}.png`)
                        .then((module) => {
                          setImageSrc(module.default);
                        })
                        .catch((error) => {
                          console.error("Failed to load image", error);
                        });
                    }, [image]);                
                                   
                  return (
                    <Link
                      to={`/${slug}`}
                      className="relative mb-5 flex max-w-[400px]  flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div
                        className={`image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all`}
                      >
                        <img
                          src={imageSrc || 'https://picsum.photos/400/400'}
                          alt=""
                          className={`inline-block h-full w-full transform object-cover transition-all ease-in-out ${
                            hovered ? "scale-105" : ""
                          }`}
                        />
                      </div>
                      <div className="content rounded-2xl bg-white p-5">
                        <h2 className="mb-5  text-2xl font-bold leading-snug transition-all">
                          {title}
                        </h2>
                        <p className="text-base transition-all">{description}</p>
                      </div>
                      <div className="inline-block bg-white px-5 py-2 text-sm font-bold">
                        Learn more{" "}
                        <div
                          className={`${
                            hovered ? "translate-x-1" : ""
                          } inline-block transition-all`}
                        >
                          →
                        </div>
                      </div>
                      <div className={`rounded-b-lg bg-white px-5 py-2`}>
                        {languages.map((language, index) => (
                          <span
                            className={`mb-2 mr-2 inline-block  rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[index]} py-2 text-sm`}
                            key={index}
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                      <div className=" flex-grow rounded-2xl bg-white"></div>
                    </Link>
                  );
                };
                                
                export default ProjectCard;
                """;

        String projectsTsContent = """
                import { FC } from "react";
                import { UserData } from "../../common/types/UserData.tsx";
                import { useSpring, animated } from "react-spring";
                import ProjectCard from "./ProjectCard.tsx";
                                
                const Projects: FC<{
                  pageData: {
                    headerOne: string;
                    descriptionOne: string;
                  };
                  userData: UserData;
                }> = ({ userData, pageData }) => {
                  const headerAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 200,
                  });
                                
                  const projectCardsAnimation = useSpring({
                    from: { transform: "translate3d(0, 20px, 0)", opacity: 0 },
                    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
                    delay: 500,
                  });
                                
                  return (
                    <>
                      <main>
                        <div className="container mx-auto my-20 max-w-screen-lg px-5">
                          <section>
                            <animated.div style={headerAnimation}>
                              <h1 className="mb-5 text-center text-3xl font-bold leading-snug transition-all md:text-5xl lg:text-6xl">
                                {pageData.headerOne}
                              </h1>
                              <p className=" text-center font-semibold transition-all">
                                {pageData.descriptionOne}
                              </p>
                            </animated.div>
                          </section>
                        </div>
                      </main>
                      <section>
                        <animated.div
                          style={projectCardsAnimation}
                          className="container mx-auto mb-5 px-5"
                        >
                          <div className="projects grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {userData.projects.map(
                              ({ name, description, id, languages, image, slug }) => {
                                return (
                                  <ProjectCard
                                    title={name}
                                    description={description}
                                    image={image}
                                    key={id}
                                    languages={languages}
                                    slug={slug}
                                  />
                                );
                              }
                            )}
                          </div>
                        </animated.div>
                      </section>
                    </>
                  );
                };
                                
                export default Projects;
                """;

        File projectCardTsFile = new File(projectsDirectoryPath + "/ProjectCard.tsx");
        File projectsTsFile = new File(projectsDirectoryPath + "/Projects.tsx");
        try (FileWriter writer = new FileWriter(projectCardTsFile)) {
            writer.write(projectCardTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write ProjectCard.tsx file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(projectsTsFile)) {
            writer.write(projectsTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write Projects.tsx file: " + e.getMessage());
        }
    }

    private void writeNotFound(String directoryPath){
        String notFoundTsContent = """
                import { FC } from "react";
                import { Link } from "react-router-dom";
                import { useSpring, animated } from "react-spring";
                                
                const NotFound: FC = () => {
                  const warningAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 100,
                  });
                                
                  const textAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 200,
                  });
                                
                  const errorCodeAnimation = useSpring({
                    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
                    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
                    delay: 300,
                  });
                                
                  return (
                    <div className="mt-20 flex flex-col items-center justify-center md:mt-40 lg:flex-row">
                      <animated.div
                        style={warningAnimation}
                        className="z-10 text-center md:mr-24"
                      >
                        <img
                          className={"w-64 md:w-80"}
                          src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633dea45e1cbb3429b10d94d_page-not-found-icon-paperfolio-webflow-template.svg"
                          alt="Warning"
                        />
                      </animated.div>
                      <animated.div
                        style={textAnimation}
                        className="z-10 flex flex-col items-center justify-center text-center"
                      >
                        <h1 className="mt-10 text-2xl font-bold md:text-4xl">Oops!</h1>
                        <h1 className="mt-5 text-2xl font-bold md:text-4xl">Page Not Found</h1>
                        <Link
                          to={"/"}
                          className="mt-10 rounded-xl bg-black px-8 py-2 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
                        >
                          Go to homepage
                        </Link>
                      </animated.div>
                      <animated.div
                        style={errorCodeAnimation}
                        className="absolute text-[12rem] font-bold text-gray-300 opacity-80 md:left-10 md:top-6 md:text-[18rem]"
                      >
                        404
                      </animated.div>
                    </div>
                  );
                };
                                
                export default NotFound;
                """;

        File notFoundTsFile = new File(directoryPath + "/NotFound.tsx");
        try (FileWriter writer = new FileWriter(notFoundTsFile)) {
            writer.write(notFoundTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write NotFound.tsx file: " + e.getMessage());
        }
    }

    private void writeApp(String directoryPath, Principal principal) {
        String appCssContent = """
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
                                
                @font-face {
                  font-family: "Onest-Regular";
                  src: url("./assets/fonts/Onest-Regular.ttf") format("truetype");
                }
                                
                @font-face {
                  font-family: "Onest-Bold";
                  src: url("./assets/fonts/Onest-Bold.ttf") format("truetype");
                }
                                
                @font-face {
                  font-family: "Onest-Black";
                  src: url("./assets/fonts/Onest-Black.ttf") format("truetype");
                }
                                
                * {
                  @apply text-gray-800;
                }
                                
                body {
                  @apply bg-gray-50
                    font-sans
                    text-lg
                    font-medium
                    leading-loose
                    text-gray-800;
                  font-family: "Onest-Regular", sans-serif;
                }
                                
                .font-bold {
                  font-family: "Onest-Bold", sans-serif;
                }
                                
                .font-extra-bold {
                  font-family: "Onest-Black", sans-serif;
                }
                """;

        ResponseEntity<Response> responseEntity = userService.userDetails(principal);


        Response response = responseEntity.getBody();
        assert response != null;
        assert response.status().equals(StatusType.OK);
        Object data = response.data();
        UserHomeResponseModel userHomeResponseModel = (UserHomeResponseModel) data;

        StringBuilder skills = new StringBuilder();
        SkillsType[] skillsArray = userHomeResponseModel.skills();

        for (int i = 0; i < skillsArray.length; i++) {
            skills.append("\"").append(skillsArray[i]).append("\"");
            if (i < skillsArray.length - 1) {
                skills.append(", ");
            }
        }

        StringBuilder projects = new StringBuilder();
        ProjectsResponseModel[] projectsArray = userHomeResponseModel.projects();

        for (int i = 0; i < projectsArray.length; i++) {
            projects.append("{\n")
                    .append("name: \"").append(projectsArray[i].name()).append("\",\n")
                    .append("description: \"").append(projectsArray[i].description()).append("\",\n")
                    .append("languages: [");

            String[] languages = projectsArray[i].languages().toArray(new String[0]);
            for (int j = 0; j < languages.length; j++) {
                projects.append("\"").append(languages[j]).append("\"");
                if (j < languages.length - 1) {
                    projects.append(", ");
                }
            }
            projects.append("],\n")
                    .append("updatedAt: \"").append(projectsArray[i].updatedAt()).append("\",\n")
                    .append("image: \"").append(projectsArray[i].image().replace("https://codefolioimagebucket.s3.amazonaws.com/", "")).append("\",\n")
                    .append("id: \"").append(projectsArray[i].id()).append("\",\n")
                    .append("slug: \"").append(projectsArray[i].slug()).append("\"\n")
                    .append("}");
            if (i < projectsArray.length - 1) {
                projects.append(",\n");
            }
        }

        StringBuilder work = new StringBuilder();
        WorkModel[] workArray = userHomeResponseModel.work();

        for (int i = 0; i < workArray.length; i++) {
            work.append("{\n")
                    .append("id: ").append(workArray[i].getId()).append(",\n")
                    .append("company: \"").append(workArray[i].getCompany()).append("\",\n")
                    .append("position: \"").append(workArray[i].getPosition()).append("\",\n")
                    .append("startDate: \"").append(workArray[i].getStartDate()).append("\",\n")
                    .append("endDate: \"").append(workArray[i].getEndDate()).append("\",\n")
                    .append("description: \"").append(workArray[i].getDescription()).append("\",\n")
                    .append("orderId: ").append(workArray[i].getOrderId()).append(",\n")
                    .append("image: \"").append(workArray[i].getImage().replace("https://codefolioimagebucket.s3.amazonaws.com/", "")).append("\",\n")
                    .append("}");
            if (i < workArray.length - 1) {
                work.append(",\n");
            }
        }

        StringBuilder services = new StringBuilder();
        ServicesType[] servicesArray = userHomeResponseModel.services();

        for (int i = 0; i < servicesArray.length; i++) {
            services.append("\"").append(servicesArray[i]).append("\"");
            if (i < servicesArray.length - 1) {
                services.append(",\n");
            }
        }

        StringBuilder slugs = new StringBuilder();
        SlugUserDetailsResponseModel[] slugsArray = userHomeResponseModel.slugs();

        for (int i = 0; i < slugsArray.length; i++) {
            slugs.append("{\n")
                    .append("slug: \"").append(slugsArray[i].slug()).append("\",\n")
                    .append("header: \"").append(slugsArray[i].header()).append("\",\n")
                    .append("description: \"").append(slugsArray[i].description().replace("\n", " ").replace("\"", "\\\"")).append("\",\n")
                    .append("about: \"").append(slugsArray[i].about().replace("\n", " ").replace("\"", "\\\"")).append("\",\n")
                    .append("image: \"").append(slugsArray[i].image().replace("https://codefolioimagebucket.s3.amazonaws.com/", "")).append("\",\n")
                    .append("overview: \"").append(slugsArray[i].overview().replace("\n", " ").replace("\"", "\\\"")).append("\",\n")
                    .append("platforms: \"").append(slugsArray[i].platforms().replace("\n", " ").replace("\"", "\\\"")).append("\",\n")
                    .append("link: \"").append(slugsArray[i].link().replace("\n", " ").replace("\"", "\\\"")).append("\"\n")
                    .append("}");
            if (i < slugsArray.length - 1) {
                slugs.append(",\n");
            }
        }

        ResponseEntity<Response> homeResponseModel = homeService.getHome(principal);
        Response homeResponse = homeResponseModel.getBody();
        assert homeResponse != null;
        assert homeResponse.status().equals(StatusType.OK);
        HomeResponseModel homeData =  (HomeResponseModel) homeResponse.data();
        Users user = getAuthenticatedUser(principal);
        List<Object> homeSections = pageSections.getSections(user, PageType.HOME);

        String homeString = "const homeData = useMemo(\n" +
                "                    () => ({\n" +
                "                      headerOne: \"" + homeData.headerOne() + "\",\n" +
                "                      descriptionOne: \"" + homeData.descriptionOne() + "\",\n" +
                "                      headerTwo: \"" + homeData.headerTwo() + "\",\n" +
                "                      profileImage: \"" + homeData.profileImage().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                "                      sections: [\n";

        for (int i = 0; i < homeSections.size(); i++) {
            Map<String, Object> section = (Map<String, Object>) homeSections.get(i);
            homeString += "                        {\n" +
                    "                          type: \"" + section.get("type") + "\",\n" +
                    "                          details: {\n";

            switch ((String) section.get("type")) {
                case "VALUE" -> {
                    ValueSectionResponseModel valueDetails = (ValueSectionResponseModel) section.get("details");
                    homeString += "                            headerOne: \"" + valueDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + valueDetails.descriptionOne() + "\",\n" +
                            "                            valuesList: " + formatValuesList(valueDetails.values()) + ",\n" +
                            "                            order: " + valueDetails.order() + "\n";
                }
                case "STORY" -> {
                    StorySectionResponseModel storyDetails = (StorySectionResponseModel) section.get("details");
                    homeString += "                            headerOne: \"" + storyDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + storyDetails.descriptionOne() + "\",\n" +
                            "                            bulletOne: \"" + storyDetails.bulletOne() + "\",\n" +
                            "                            bulletTwo: \"" + storyDetails.bulletTwo() + "\",\n" +
                            "                            bulletThree: \"" + storyDetails.bulletThree() + "\",\n" +
                            "                            imageOne: \"" + storyDetails.imageOne().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                            "                            order: " + storyDetails.order() + "\n";
                }
                case "SKILL" -> {
                    SkillSectionResponseModel skillDetails = (SkillSectionResponseModel) section.get("details");
                    homeString += "                            headerOne: \"" + skillDetails.headerOne() + "\",\n" +
                            "                            order: " + skillDetails.order() + "\n";
                }
                case "RESUME" -> {
                    ResumeSectionResponseModel resumeDetails = (ResumeSectionResponseModel) section.get("details");
                    homeString += "                            headerOne: \"" + resumeDetails.headerOne() + "\",\n" +
                            "                            order: " + resumeDetails.order() + "\n";
                }
                case "FAQ" -> {
                    FAQSectionResponseModel faqDetails = (FAQSectionResponseModel) section.get("details");
                    homeString += "                            headerOne: \"" + faqDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + faqDetails.descriptionOne() + "\",\n" +
                            "                            faq: " + formatFaqList(faqDetails.faq()) + ",\n" +
                            "                            order: " + faqDetails.order() + "\n";
                }
            }

            homeString += "                          }\n" +
                    "                        },\n";
        }

        homeString += "                      ],\n" +
                "                    }),\n" +
                "                    []\n" +
                "                  );";

        ResponseEntity<Response> projectsPageResponseModel = projectsPageService.getProjectsPage(principal);
        Response projectsPageResponse = projectsPageResponseModel.getBody();
        assert projectsPageResponse != null;
        assert projectsPageResponse.status().equals(StatusType.OK);
        ProjectsPageResponseModel projectsPageData =  (ProjectsPageResponseModel) projectsPageResponse.data();

        String projectsPageString = "const projectsPageData = useMemo(\n" +
                "                    () => ({\n" +
                "                      headerOne: \"" + projectsPageData.headerOne() + "\",\n" +
                "                      descriptionOne: \"" + projectsPageData.descriptionOne() + "\"\n" +
                "                    }),\n" +
                "                    []\n" +
                "                  );";



        ResponseEntity<Response> aboutResponseModel = aboutService.getAbout(principal);
        Response aboutResponse = aboutResponseModel.getBody();
        assert aboutResponse != null;
        assert aboutResponse.status().equals(StatusType.OK);
        AboutResponseModel aboutData =  (AboutResponseModel) aboutResponse.data();
        List<Object> aboutSections = pageSections.getSections(user, PageType.ABOUT);

        String aboutString = "const aboutData = useMemo(\n" +
                "                    () => ({\n" +
                "                      headerOne: \"" + aboutData.headerOne() + "\",\n" +
                "                      iconOne: \"" + aboutData.iconOne().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                "                      iconTwo: \"" + aboutData.iconTwo().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                "                      iconThree: \"" + aboutData.iconThree().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                "                      headerTwo: \"" + aboutData.headerTwo() + "\",\n" +
                "                      descriptionOne: \"" + aboutData.descriptionOne() + "\",\n" +
                "                      descriptionTwo: \"" + aboutData.descriptionTwo() + "\",\n" +
                "                      sections: [\n";

        for (int i = 0; i < aboutSections.size(); i++) {
            Map<String, Object> section = (Map<String, Object>) aboutSections.get(i);
            aboutString += "                        {\n" +
                    "                          type: \"" + section.get("type") + "\",\n" +
                    "                          details: {\n";

            switch ((String) section.get("type")) {
                case "VALUE" -> {
                    ValueSectionResponseModel valueDetails = (ValueSectionResponseModel) section.get("details");
                    aboutString += "                            headerOne: \"" + valueDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + valueDetails.descriptionOne() + "\",\n" +
                            "                            valuesList: " + formatValuesList(valueDetails.values()) + ",\n" +
                            "                            order: " + valueDetails.order() + "\n";
                }
                case "STORY" -> {
                    StorySectionResponseModel storyDetails = (StorySectionResponseModel) section.get("details");
                    aboutString += "                            headerOne: \"" + storyDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + storyDetails.descriptionOne() + "\",\n" +
                            "                            bulletOne: \"" + storyDetails.bulletOne() + "\",\n" +
                            "                            bulletTwo: \"" + storyDetails.bulletTwo() + "\",\n" +
                            "                            bulletThree: \"" + storyDetails.bulletThree() + "\",\n" +
                            "                            imageOne: \"" + storyDetails.imageOne().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                            "                            order: " + storyDetails.order() + "\n";
                }
                case "SKILL" -> {
                    SkillSectionResponseModel skillDetails = (SkillSectionResponseModel) section.get("details");
                    aboutString += "                            headerOne: \"" + skillDetails.headerOne() + "\",\n" +
                            "                            order: " + skillDetails.order() + "\n";
                }
                case "RESUME" -> {
                    ResumeSectionResponseModel resumeDetails = (ResumeSectionResponseModel) section.get("details");
                    aboutString += "                            headerOne: \"" + resumeDetails.headerOne() + "\",\n" +
                            "                            order: " + resumeDetails.order() + "\n";
                }
                case "FAQ" -> {
                    FAQSectionResponseModel faqDetails = (FAQSectionResponseModel) section.get("details");
                    aboutString += "                            headerOne: \"" + faqDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + faqDetails.descriptionOne() + "\",\n" +
                            "                            faq: " + formatFaqList(faqDetails.faq()) + ",\n" +
                            "                            order: " + faqDetails.order() + "\n";
                }
            }

            aboutString += "                          }\n" +
                    "                        }";

            if (i < aboutSections.size() - 1) {
                aboutString += ",";
            }

            aboutString += "\n";
        }

        aboutString += "                      ],\n" +
                "                    }),\n" +
                "                    []\n" +
                "                  );";

        ResponseEntity<Response> contactResponseModel = contactService.getContact(principal);
        Response contactResponse = contactResponseModel.getBody();
        assert contactResponse != null;
        assert contactResponse.status().equals(StatusType.OK);
        ContactModel contactData =  (ContactModel) contactResponse.data();
        List<Object> contactSections = pageSections.getSections(user, PageType.CONTACT);

        String contactString = "const contactData = useMemo(\n" +
                "                    () => ({\n" +
                "                      headerOne: \"" + contactData.headerOne() + "\",\n" +
                "                      descriptionOne: \"" + contactData.descriptionOne() + "\",\n" +
                "                      sections: [\n";

        for (int i = 0; i < contactSections.size(); i++) {
            Map<String, Object> section = (Map<String, Object>) contactSections.get(i);
            contactString += "                        {\n" +
                    "                          type: \"" + section.get("type") + "\",\n" +
                    "                          details: {\n";

            switch ((String) section.get("type")) {
                case "VALUE" -> {
                    ValueSectionResponseModel valueDetails = (ValueSectionResponseModel) section.get("details");
                    contactString += "                            headerOne: \"" + valueDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + valueDetails.descriptionOne() + "\",\n" +
                            "                            valuesList: " + formatValuesList(valueDetails.values()) + ",\n" +
                            "                            order: " + valueDetails.order() + "\n";
                }
                case "STORY" -> {
                    StorySectionResponseModel storyDetails = (StorySectionResponseModel) section.get("details");
                    contactString += "                            headerOne: \"" + storyDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + storyDetails.descriptionOne() + "\",\n" +
                            "                            bulletOne: \"" + storyDetails.bulletOne() + "\",\n" +
                            "                            bulletTwo: \"" + storyDetails.bulletTwo() + "\",\n" +
                            "                            bulletThree: \"" + storyDetails.bulletThree() + "\",\n" +
                            "                            imageOne: \"" + storyDetails.imageOne().replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                            "                            order: " + storyDetails.order() + "\n";
                }
                case "SKILL" -> {
                    SkillSectionResponseModel skillDetails = (SkillSectionResponseModel) section.get("details");
                    contactString += "                            headerOne: \"" + skillDetails.headerOne() + "\",\n" +
                            "                            order: " + skillDetails.order() + "\n";
                }
                case "RESUME" -> {
                    ResumeSectionResponseModel resumeDetails = (ResumeSectionResponseModel) section.get("details");
                    contactString += "                            headerOne: \"" + resumeDetails.headerOne() + "\",\n" +
                            "                            order: " + resumeDetails.order() + "\n";
                }
                case "FAQ" -> {
                    FAQSectionResponseModel faqDetails = (FAQSectionResponseModel) section.get("details");
                    contactString += "                            headerOne: \"" + faqDetails.headerOne() + "\",\n" +
                            "                            descriptionOne: \"" + faqDetails.descriptionOne() + "\",\n" +
                            "                            faq: " + formatFaqList(faqDetails.faq()) + ",\n" +
                            "                            order: " + faqDetails.order() + "\n";
                }
            }

            contactString += "                          }\n" +
                    "                        }";

            if (i < contactSections.size() - 1) {
                contactString += ",";
            }

            contactString += "\n";
        }

        contactString += "                      ],\n" +
                "                    }),\n" +
                "                    []\n" +
                "                  );";




        String appTsContent = """
                import { FC, useMemo } from "react";
                import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
                import Header from "./common/Header/Header.tsx";
                import Home from "./pages/Home/Home.tsx";
                import "./App.css";
                import About from "./pages/About/About.tsx";
                import { HomeData } from "./common/types/HomeData.tsx";
                import { AboutData } from "./common/types/AboutData.tsx";
                import Contact from "./pages/Contact/Contact.tsx";
                import ContactData from "./common/types/ContactData.tsx";
                import Projects from "./pages/Projects/Projects.tsx";
                import NotFound from "./NotFound.tsx";
                import Project from "./pages/Project/Project.tsx";
                                
                const App: FC = () => {
                  const ProjectOr404 = () => {
                    const { slug } = useParams();
                    if (slug && userData.slugs.some((s) => s.slug === slug)) {
                      return <Project userData={userData} />;
                    } else {
                      return <NotFound />;
                    }
                  };
                                
                   const userData = useMemo(
                     () => ({
                        name: '""" + userHomeResponseModel.name() + """
',\s
                        email: '""" + userHomeResponseModel.email() + """
',\s
                        phone: '""" + userHomeResponseModel.phone() + """
',\s
                        company: '""" + userHomeResponseModel.company() + """
',\s
                        location: '""" + userHomeResponseModel.location() + """
',\s
                        about: '""" + userHomeResponseModel.about() + """
',\s
                       skills: [
                         """ + skills + """
],\s
                       projects: [
                         """ + projects + """
],\s
                       work: [
                         """ + work + """
],\s
                       role: '""" + userHomeResponseModel.role() + """
',\s
                       profession: '""" + userHomeResponseModel.profession() + """
',\s
                       services: [
                         """ + services + """
],\s
                       slugs: [
                         """ + slugs + """
],\s
                     }),
                     []
                   );
                             
                  """ + homeString + """
                                
                  """ + aboutString +"""
                                
                  """ + projectsPageString + """
                                
                  """ + contactString + """
                                
                  return (
                    <BrowserRouter>
                      <Header />
                      <Routes>
                        <Route
                          path="/"
                          element={<Home userData={userData} pageData={homeData as HomeData} />}
                        />
                        <Route
                          path="/contact"
                          element={
                            <Contact
                              pageData={contactData as ContactData}
                              userData={userData}
                            />
                          }
                        />
                        <Route
                          path="/projects"
                          element={<Projects pageData={projectsPageData} userData={userData} />}
                        />
                        <Route
                          path="/about"
                          element={
                            <About pageData={aboutData as AboutData} userData={userData} />
                          }
                        />
                        <Route path="/:slug" element={<ProjectOr404 />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  );
                };
                                
                export default App;""";

        File appCssFile = new File(directoryPath + "/App.css");
        File appTsFile = new File(directoryPath + "/App.tsx");
        try (FileWriter writer = new FileWriter(appCssFile)) {
            writer.write(appCssContent);
        } catch (IOException e) {
            System.err.println("Failed to write App.css file: " + e.getMessage());
        }
        try (FileWriter writer = new FileWriter(appTsFile)) {
            writer.write(appTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write App.tsx file: " + e.getMessage());
        }
    }

    private String formatValuesList(List<ValuesResponseModel > values) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < values.size(); i++) {
            sb.append("{ value: \"").append(values.get(i).value()).append("\" }");
            if (i < values.size() - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    private String formatFaqList(List<FAQResponseModel> faqs) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < faqs.size(); i++) {
            sb.append("{ question: \"").append(faqs.get(i).question())
                    .append("\", answer: \"").append(faqs.get(i).answer())
                    .append("\", id: ").append(faqs.get(i).id()).append(" }");
            if (i < faqs.size() - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }


    private void writeMain(String pathDirectory) {
        String mainTsContent = """
                import React from "react";
                import ReactDOM from "react-dom/client";
                import App from "./App.tsx";
                                
                ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                );
                """;

        File mainTsFile = new File(pathDirectory + "/main.tsx");
        try (FileWriter writer = new FileWriter(mainTsFile)) {
            writer.write(mainTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write main.tsx file: " + e.getMessage());
        }
    }


}
