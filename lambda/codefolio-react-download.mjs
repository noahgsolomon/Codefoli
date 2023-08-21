import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import Knex from 'knex';
import jwt from 'jsonwebtoken';
import { user, password, host, database } from '/opt/db.mjs';
import archiver from 'archiver';

const s3 = new S3Client({ region: "us-east-1" });

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    user,
    password,
    database
};

const knex = Knex({
    client: 'postgres',
    connection
});

const headers = {
    "Access-Control-Allow-Origin": "https://codefoli.com",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Content-Type": "application/json"
};


const handler = async (event) => {

    console.log("Received event:", JSON.stringify(event));

    const idToken = event.headers.Authorization.replace('Bearer ', '');
    const decodedToken = jwt.decode(idToken);
    const cognitoUserId = decodedToken['sub'];

    const existingUser = await knex('users')
        .where('cognito_user_id', cognitoUserId)
        .first();

    if (existingUser === undefined) {
        console.error("User does not exist");
        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ status: "ERROR", message: "User does not exist", data: null }),
        };
    }

    console.log('existing user:', JSON.stringify(existingUser));

    await deploy(existingUser.id);

    const userDirectoryPath = `/tmp/user-${existingUser.id}`;
    const zipFilePath = '/tmp/user-files.zip';

    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level.
        });

        archive.pipe(output);
        archive.directory(userDirectoryPath, false);
        archive.finalize();

        output.on('close', async () => {
            try {
                console.log('Reading zip file content.');
                const fileContent = fs.readFileSync(zipFilePath);
                const base64FileContent = fileContent.toString('base64');
                console.log('Zip file content read successfully.');

                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "https://codefoli.com",
                        "Access-Control-Allow-Headers": "Content-Type,Authorization",
                        'Content-Type': 'application/zip',
                        'Content-Disposition': `attachment; filename=${path.basename(zipFilePath)}`
                    },
                    body: base64FileContent,
                    isBase64Encoded: true,
                });
            } catch (error) {
                console.error(`Error reading zip file: ${error}`);
                reject({
                    statusCode: 500,
                    headers: headers,
                    body: JSON.stringify({ status: "ERROR", message: "Failed to read zip file", data: null }),
                });
            }
        });

        archive.on('error', (err) => {
            reject({
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({ status: "ERROR", message: `Failed to create zip file: ${err}`, data: null }),
            });
        });
    });
};


const deploy = async (userId) => {
    const userDirectoryPath = `/tmp/user-${userId}`;
    const userDirectory = fs.mkdirSync(userDirectoryPath, { recursive: true });
    console.log(`Directory created at: ${userDirectoryPath}`);

    await buildProject(userDirectoryPath, userId);
    console.log(`finished building files in /tmp/user-${userId}`)

};

const buildProject = async (directoryPath, id) => {
    console.log('user id at buildProject: ' + id);
    await writeViteConfigTsFile(directoryPath);
    await writeInstructionsTxtFile(directoryPath);
    await writeTsConfigNodeJsonFile(directoryPath);
    await writeTsConfigJsonFile(directoryPath);
    await writeTailwindConfigJsFile(directoryPath);
    await writePostCssConfigJsFile(directoryPath);
    await writePackageJsonFile(directoryPath);
    await writeIndexHtmlFile(directoryPath);
    await writeEslintRCFile(directoryPath);
    await writeSrc(directoryPath, id);
};

const writeInstructionsTxtFile = async (directoryPath) => {
    const writeTxtContent =

        `
  We're so glad you chose Codefoli for your website needs!
  
  Below are the instructions
  
  1. Run in the terminal in this directory, 'npm install'. 
  Be patient as this will take some time.
  
  2. Once you have done this, you can now run 'npm run dev' to see your app in a local environment, 
  or, run npm run build to compile into HTML, CSS and JS.
  
  3. If you have opted into running 'npm run build', you will see a new directory called 'dist'.
  Inside it will be an index.html, a css and js file. You can now deploy these files in whatever
  web hoster you prefer, and voila! Your brand new website!
  
  we would greatly appreciate a star on our repository at 
  https://github.com/noahgsolomon/Codefolio️
  `;

    try {
        await fs.promises.writeFile(`${directoryPath}/instructions.txt`, writeTxtContent);
    } catch (e) {
        console.error(`Failed to write instructions.txt file: ${e.message}`);
    }
};

const writeViteConfigTsFile = async (directoryPath) => {
    const viteConfigTsContent = `
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react-swc'
    export default defineConfig({
      plugins: [react()],
    })`;

    try {
        await fs.promises.writeFile(`${directoryPath}/vite.config.ts`, viteConfigTsContent);
    } catch (e) {
        console.error(`Failed to write vite.config.ts file: ${e.message}`);
    }
};

const writeTsConfigNodeJsonFile = async (directoryPath) => {
    const tsConfigNodeJsonContent = `
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
    }`;

    try {
        await fs.promises.writeFile(`${directoryPath}/tsconfig.node.json`, tsConfigNodeJsonContent);
    } catch (e) {
        console.error(`Failed to write tsconfig.node.json file: ${e.message}`);
    }
};

const writeTsConfigJsonFile = async (directoryPath) => {
    const tsConfigJsonContent = `
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
    }`;

    try {
        await fs.promises.writeFile(`${directoryPath}/tsconfig.json`, tsConfigJsonContent);
    } catch (e) {
        console.error(`Failed to write tsconfig.json file: ${e.message}`);
    }
};

const writeTailwindConfigJsFile = async (directoryPath) => {
    const tailwindConfigJsContent = `
    import aspectRatio from "@tailwindcss/aspect-ratio";
    import forms from "@tailwindcss/forms";
    import typography from "@tailwindcss/typography";
    /** @type {import('tailwindcss').Config} */
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
    };`;

    try {
        await fs.promises.writeFile(`${directoryPath}/tailwind.config.js`, tailwindConfigJsContent);
    } catch (e) {
        console.error(`Failed to write tailwind.config.js file: ${e.message}`);
    }
};

const writePostCssConfigJsFile = async (directoryPath) => {
    const postCssConfigJsContent = `
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };`;

    try {
        await fs.promises.writeFile(`${directoryPath}/postcss.config.js`, postCssConfigJsContent);
    } catch (e) {
        console.error(`Failed to write postcss.config.js file: ${e.message}`);
    }
};

const writePackageJsonFile = async (directoryPath) => {
    const packageJsonContent = `
    {
      "name": "deployment",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
         "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
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
        "tailwindcss": "^3.3.2",
        "typescript": "^5.0.2",
        "vite": "^4.3.2"
      }
    }`;

    try {
        await fs.promises.writeFile(`${directoryPath}/package.json`, packageJsonContent);
    } catch (e) {
        console.error(`Failed to write package.json file: ${e.message}`);
    }
};

const writeIndexHtmlFile = async (directoryPath) => {
    const indexHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Codefoli</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="./src/main.tsx"></script>
      </body>
    </html>`;

    try {
        await fs.promises.writeFile(`${directoryPath}/index.html`, indexHtmlContent);
    } catch (e) {
        console.error(`Failed to write index.html file: ${e.message}`);
    }
};

const writeEslintRCFile = async (directoryPath) => {
    const eslintRCContent = `
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
    }`;

    try {
        await fs.promises.writeFile(`${directoryPath}/.eslintrc.cjs`, eslintRCContent);
    } catch (e) {
        console.error(`Failed to write .eslintrc.cjs file: ${e.message}`);
    }
};


const writeSrc = async (directoryPath, id) => {
    console.log('user id at src: ' + id);
    const srcDirectoryPath = path.join(directoryPath, 'src');
    createDirectory(srcDirectoryPath);
    await writeAssets(srcDirectoryPath, id);
    await writeCommon(srcDirectoryPath);
    await writePages(srcDirectoryPath);
    await writeApp(srcDirectoryPath, id);
    await writeNotFound(srcDirectoryPath);
    await writeMain(srcDirectoryPath);
};

const writeAssets = async (directoryPath, id) => {
    console.log('user id at assets: ' + id);
    const assetsDirectoryPath = path.join(directoryPath, 'assets');
    createDirectory(assetsDirectoryPath);

    const fontsDirectoryPath = path.join(assetsDirectoryPath, 'fonts');
    createDirectory(fontsDirectoryPath);

    const fontFiles = ['Onest-Black.ttf', 'Onest-Bold.ttf', 'Onest-ExtraBold.ttf', 'Onest-Regular.ttf'];
    fontFiles.forEach((fontFile) => {
        copyFontFile(fontsDirectoryPath, fontFile);
    });

    await writeImages(assetsDirectoryPath, id);
};

const copyFontFile = (directoryPath, fileName) => {
    const sourceFile = path.join('fonts', fileName);
    const destinationFile = path.join(directoryPath, fileName);

    fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) {
            console.error(`Failed to copy file: ${fileName}. ${err.message}`);
        } else {
            console.log(`Copied file: ${fileName}`);
        }
    });
};

const createDirectory = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory created at: ${directoryPath}`);
    } else {
        console.log(`Directory already exists at: ${directoryPath}`);
    }
};

const writeImages = async (directoryPath, userId) => {
    console.log('user id at writeImages: ' + userId);
    const imagesDirectoryPath = path.join(directoryPath, 'images');
    createDirectory(imagesDirectoryPath);

    const imageBucketName = 'codefolioimagebucket';
    const params = {
        Bucket: imageBucketName,
        Prefix: `${userId}-`,
    };
    let result;
    do {
        const command = new ListObjectsV2Command(params);
        result = await s3.send(command);

        console.log('result: ' +JSON.stringify(result, null, 2));

        if (result.Contents && result.Contents.length > 0) {
            for (const objectSummary of result.Contents) {
                const key = objectSummary.Key;
                console.log(`Processing key: ${key}`);

                const getObjectCommand = new GetObjectCommand({ Bucket: imageBucketName, Key: key });
                const object = await s3.send(getObjectCommand);
                const targetFile = path.join(imagesDirectoryPath, `${key}.png`);

                const data = await streamToBuffer(object.Body);

                try {
                    fs.writeFileSync(targetFile, data);
                    console.log(`Downloaded ${key} to ${targetFile}`);
                } catch (e) {
                    console.error(`Failed to download ${key}`, e);
                }
            }
        } else {
            console.log('No images found for the specified prefix. Continuing deployment without images.');
        }


        params.ContinuationToken = result.NextContinuationToken;
    } while (result.IsTruncated);
};

function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

const writeCommon = async (directoryPath) => {
    const commonDirectoryPath = path.join(directoryPath, 'common');
    createDirectory(commonDirectoryPath);

    await writeHeader(commonDirectoryPath);
    await writeMarquee(commonDirectoryPath);
    await writeSections(commonDirectoryPath);
    await writeTypes(commonDirectoryPath);
    await writeUtil(commonDirectoryPath);
};


const writeHeader = (directoryPath) => {
    const headerDirectoryPath = path.join(directoryPath, 'Header');
    if (!fs.existsSync(headerDirectoryPath)) {
        fs.mkdirSync(headerDirectoryPath, { recursive: true });
    }

    const headerContent = `
    import { FC } from "react";
    import { Link } from "react-router-dom";

    const Header: FC = () => {
      return (
        <header
          className="relative z-40 mx-5 flex items-center justify-center py-5 font-bold transition-all ease-linear md:flex-row"
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

    export default Header;`;

    fs.writeFileSync(path.join(headerDirectoryPath, 'Header.tsx'), headerContent);
};

const writeMarquee = (directoryPath) => {
    const marqueeDirectoryPath = path.join(directoryPath, 'Marquee');
    if (!fs.existsSync(marqueeDirectoryPath)) {
        fs.mkdirSync(marqueeDirectoryPath, { recursive: true });
    }

    const marqueeContent = `
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

    export default Marquee;`;

    fs.writeFileSync(path.join(marqueeDirectoryPath, 'Marquee.tsx'), marqueeContent);
};

const writeSections = async (directoryPath) => {
    const sectionsDirectoryPath = path.join(directoryPath, 'Sections');
    if (!fs.existsSync(sectionsDirectoryPath)) {
        fs.mkdirSync(sectionsDirectoryPath, { recursive: true });
    }

    await writeFAQ(sectionsDirectoryPath);
    await writeResume(sectionsDirectoryPath);
    await writeSkill(sectionsDirectoryPath);
    await writeStory(sectionsDirectoryPath);
    await writeValue(sectionsDirectoryPath);
    await writeSectionsComponent(sectionsDirectoryPath);
};

const writeFAQ = async (directoryPath) => {
    const faqDirectoryPath = path.join(directoryPath, 'FAQ');
    if (!fs.existsSync(faqDirectoryPath)) {
        fs.mkdirSync(faqDirectoryPath, { recursive: true });
    }
    await writeFAQFiles(faqDirectoryPath);
};

const writeFAQFiles = async (directoryPath) => {
    const faqAccordionTsContent = `
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
        setHeight(!isOpened ? \`\${contentElement.current.scrollHeight}px\` : "0px");
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
  `;

    const faqSectionTsContent = `
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
  `;

    fs.writeFileSync(path.join(directoryPath, 'FaqAccordion.tsx'), faqAccordionTsContent);
    fs.writeFileSync(path.join(directoryPath, 'FaqSection.tsx'), faqSectionTsContent);
};

const writeResume = (directoryPath) => {
    const resumeDirectoryPath = path.join(directoryPath, 'Resume');
    if (!fs.existsSync(resumeDirectoryPath)) {
        fs.mkdirSync(resumeDirectoryPath, { recursive: true });
    }
    writeResumeFiles(resumeDirectoryPath);
};

const writeResumeFiles = (resumeDirectoryPath) => {
    const resumeSectionTsContent = `
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
  `;

    const jobCardTsContent = `
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
            if (!image.startsWith('http')) {
                import(\`../../../assets/images/\${image}.png\`)
                    .then((module) => {
                        setJobImage(module.default);
                    }).catch();
            }
        }, [image]);
                    
      return (
        <div
          className={\`relative transition-all hover:-translate-y-0.5 \${active
            ? "card mb-8 rounded-lg border-2 border-black shadow-custom"
            : "card mb-8 rounded-lg border-2 border-black"
          }\`}
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
            className={\`flew-row flex \${active
              ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 p-5 font-bold"
              : "duration rounded-b-lg border-t-2 border-black p-5 font-bold"
            }\`}
          >
            <p className={"transition-all"}>{startDate}</p>
            &nbsp;-&nbsp;
            <p className={"transition-all"}>{endDate}</p>
          </div>
        </div>
      );
    };
                    
    export default JobCard;
  `;

    fs.writeFileSync(path.join(resumeDirectoryPath, 'ResumeSection.tsx'), resumeSectionTsContent);
    fs.writeFileSync(path.join(resumeDirectoryPath, 'JobCard.tsx'), jobCardTsContent);
};

const writeSkill = (directoryPath) => {
    const skillDirectoryPath = path.join(directoryPath, 'Skill');
    if (!fs.existsSync(skillDirectoryPath)) {
        fs.mkdirSync(skillDirectoryPath, { recursive: true });
    }
    writeSkillFiles(skillDirectoryPath);
};

const writeSkillFiles = (skillDirectoryPath) => {
    const serviceCardTsContent = `
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
                        className={\`inline-block h-full w-full transform object-contain transition-all ease-in-out \${
                          hovered ? "scale-105" : ""
                        }\`}
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
  `;

    const serviceCardTsFile = path.join(skillDirectoryPath, 'ServiceCard.tsx');
    fs.writeFileSync(serviceCardTsFile, serviceCardTsContent, (err) => {
        if (err) {
            console.error('Failed to write ServiceCard.tsx file:', err.message);
        }
    });

    const skillSectionTsContent = `
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
                        className={\`min-h-64 mt-5 flex flex-wrap gap-2 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2\`}
                      >
                        {userData?.skills.map((skill, index) => {
                          return (
                            <span
                              key={index}
                              className={\`inline-flex items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 \${COLORS[index]} py-2 text-sm\`}
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
                        to={\`/contact\`}
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
  `;

    const skillSectionTsFile = path.join(skillDirectoryPath, 'SkillSection.tsx');
    fs.writeFileSync(skillSectionTsFile, skillSectionTsContent, (err) => {
        if (err) {
            console.error('Failed to write SkillSection.tsx file:', err.message);
        }
    });
};


const writeStory = (directoryPath) => {
    const storyDirectoryPath = path.join(directoryPath, 'Story');
    if (!fs.existsSync(storyDirectoryPath)) {
        fs.mkdirSync(storyDirectoryPath, { recursive: true });
    }
    writeStoryFiles(storyDirectoryPath);
};

const writeStoryFiles = (storyDirectoryPath) => {
    const storySectionTsContent = `
    import {FC, useEffect, useState} from "react";
    import { StoryType } from "../../types/Section.tsx";

    const StorySection: FC<{
      details: StoryType;
    }> = ({ details }) => {

      const [imageOne, setImageOne] = useState(null);
      useEffect(() => {
          if (!details.imageOne.startsWith('http')) {
              import(\`../../../assets/images/\${details.imageOne}.png\`).then(module => {
                  setImageOne(module.default);
              }).catch();
          }
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
              <div className={\` relative mb-5 h-[400px] w-[400px] transition-all\`}>
                <div className="h-full w-full overflow-hidden rounded-3xl">
                  <img
                    src={imageOne || 'https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png'}
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
  `;

    const storySectionTsFile = path.join(storyDirectoryPath, 'StorySection.tsx');
    fs.writeFileSync(storySectionTsFile, storySectionTsContent, (err) => {
        if (err) {
            console.error('Failed to write StorySection.tsx file:', err.message);
        }
    });
};

const writeValue = (directoryPath) => {
    const valueDirectoryPath = path.join(directoryPath, 'Value');
    if (!fs.existsSync(valueDirectoryPath)) {
        fs.mkdirSync(valueDirectoryPath, { recursive: true });
    }
    writeValueFiles(valueDirectoryPath);
};

const writeValueFiles = (valueDirectoryPath) => {
    const valueCardTsContent = `
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
                className={\`inline-block h-full w-full transform object-contain transition-all ease-in-out \${hovered ? "scale-105" : ""}\`}
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
  `;

    const valueSectionTsContent = `
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
  `;

    const valueCardTsFile = path.join(valueDirectoryPath, 'ValueCard.tsx');
    fs.writeFileSync(valueCardTsFile, valueCardTsContent);

    const valueSectionTsFile = path.join(valueDirectoryPath, 'ValueSection.tsx');
    fs.writeFileSync(valueSectionTsFile, valueSectionTsContent);
};

const writeSectionsComponent = async (directoryPath) => {
    const sectionsTsContent = `
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
  `;

    const sectionsTsFile = path.join(directoryPath, 'Sections.tsx');
    fs.writeFileSync(sectionsTsFile, sectionsTsContent);
};

const writeTypes = async (directoryPath) => {
    const typesDirectoryPath = path.join(directoryPath, 'types');
    if (!fs.existsSync(typesDirectoryPath)) {
        fs.mkdirSync(typesDirectoryPath, { recursive: true });
    }
    await writeTypesFiles(typesDirectoryPath);
}

function writeTypesFiles(typesDirectoryPath) {
    const aboutDataTsContent =
        `import { Section } from "./Section.tsx";

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

  export type { AboutData };`;

    const contactDataTsContent =
        `import { Section } from "./Section.tsx";

    type ContactData = {
       headerOne: string;
      descriptionOne: string;
      sections: Section[];
     };

    export default ContactData;`;

    const homeDataTsContent =
        `import { Section } from "./Section.tsx";

   interface HomeData {
      headerOne: string;
      descriptionOne: string;
      profileImage: string;
      sections: Section[];
    }

    export type { HomeData };`;

    const sectionTsContent =
        `type StoryType = {
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
            };`;
    const userDataTsContent =
        `interface Project {
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

            export type { UserData };`;

    const servicesTsContent =
        `export const Services = [
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
                                
                export type Services = (typeof Services)[number];`;

    const valuesTsContent =
        `export const Values = [
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
                                
                export type Values = (typeof Values)[number];`;

    const aboutDataTsFile = path.join(typesDirectoryPath, 'AboutData.tsx');
    const contactDataTsFile = path.join(typesDirectoryPath, 'ContactData.tsx');
    const homeDataTsFile = path.join(typesDirectoryPath, 'HomeData.tsx');
    const sectionTsFile = path.join(typesDirectoryPath, 'Section.tsx');
    const userDataTsFile = path.join(typesDirectoryPath, 'UserData.tsx');
    const servicesTsFile = path.join(typesDirectoryPath, 'Services.tsx');
    const valuesTsFile = path.join(typesDirectoryPath, 'Values.tsx');

    fs.writeFileSync(aboutDataTsFile, aboutDataTsContent);
    fs.writeFileSync(contactDataTsFile, contactDataTsContent);
    fs.writeFileSync(homeDataTsFile, homeDataTsContent);
    fs.writeFileSync(sectionTsFile, sectionTsContent);
    fs.writeFileSync(userDataTsFile, userDataTsContent);
    fs.writeFileSync(servicesTsFile, servicesTsContent);
    fs.writeFileSync(valuesTsFile, valuesTsContent);
}

const writeUtil = async (directoryPath) => {
    const utilDirectoryPath = path.join(directoryPath, 'util');
    if (!fs.existsSync(utilDirectoryPath)) {
        fs.mkdirSync(utilDirectoryPath, { recursive: true });
    }
    await writeUtilFiles(utilDirectoryPath);
};

const writeUtilFiles = async (utilDirectoryPath) => {
    const colorsTsContent =
        `export const COLORS = [
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
    ];`;

    const colorsTsFile = path.join(utilDirectoryPath, 'COLORS.ts');

    fs.writeFileSync(colorsTsFile, colorsTsContent);
};

const writePages = async (directoryPath) => {
    const pagesDirectoryPath = path.join(directoryPath, 'pages');
    if (!fs.existsSync(pagesDirectoryPath)) {
        fs.mkdirSync(pagesDirectoryPath, { recursive: true });
    }
    await writePagesFiles(pagesDirectoryPath);
};

const writePagesFiles = async (pagesDirectoryPath) => {
    await writeAbout(pagesDirectoryPath);
    await writeContact(pagesDirectoryPath);
    await writeHome(pagesDirectoryPath);
    await writeProject(pagesDirectoryPath);
    await writeProjects(pagesDirectoryPath);
};

const writeAbout = async (directoryPath) => {
    const aboutDirectoryPath = path.join(directoryPath, 'About');
    if (!fs.existsSync(aboutDirectoryPath)) {
        fs.mkdirSync(aboutDirectoryPath, { recursive: true });
    }
    await writeAboutFiles(aboutDirectoryPath);
};

const writeAboutFiles = async (aboutDirectoryPath) => {
    const aboutTsContent =
        `import {FC, useEffect, useState} from "react";
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
                    if (!pageData.iconOne.startsWith('http')) {
                      import(\`../../assets/images/\${pageData.iconOne}.png\`)
                          .then(module => {
                            setIconOneImage(module.default);
                          })
                          .catch();
                    }

                    if (!pageData.iconTwo.startsWith('http')) {
                      import(\`../../assets/images/\${pageData.iconTwo}.png\`)
                          .then(module => {
                            setIconTwoImage(module.default);
                          })
                          .catch();
                    }

                    if (!pageData.iconThree.startsWith('http')) {
                      import(\`../../assets/images/\${pageData.iconThree}.png\`)
                          .then(module => {
                            setIconThreeImage(module.default);
                          })
                          .catch();
                    }
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
                                    src={iconOneImage || 'https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b443e2bb8e12b5faf51a7_about-hero-rigth-image-paperfolio-webflow-template.png'}
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
                                    src={iconTwoImage || 'https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b440128f648585c383865_about-hero-left-image-paperfolio-webflow-template.png'}
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
                                      src={iconThreeImage || 'https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b52d3639fb5250039e574_my-story-image-paperfolio-webflow-template.png'}
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
                                
                export default About;`;

    const aboutTsFile = path.join(aboutDirectoryPath, 'About.tsx');
    fs.writeFileSync(aboutTsFile, aboutTsContent);
};

const writeContact = async (directoryPath) => {
    const contactDirectoryPath = path.join(directoryPath, 'Contact');
    if (!fs.existsSync(contactDirectoryPath)) {
        fs.mkdirSync(contactDirectoryPath, { recursive: true });
    }
    await writeContactFiles(contactDirectoryPath);
};

const writeContactFiles = async (contactDirectoryPath) => {
    const contactTsContent =
        `import { FC, useEffect } from "react";
                import ContactData from "../../common/types/ContactData.tsx";
                import { UserData } from "../../common/types/UserData.tsx";
                import Sections from "../../common/Sections/Sections.tsx";
                import { useSpring, animated } from "react-spring";
                import Form from "./Form.tsx";
                                
                const Contact: FC<{
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
                                        href={\`mailto:\${userData.email}\`}
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
                                      href={\`tel:\${userData.phone}\`}
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
                                
                export default Contact;`;

    const formTsContent =
        `import { FC, FormEvent, useState } from "react";
                import { UserData } from "../../common/types/UserData.tsx";
                import { useSpring, animated } from "react-spring";
                                
                type formData = {
                  message: string;
                  subject: string;
                };
                                
                const Form: FC<{
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
                        href={\`mailto:\${userData.email}?subject=\${encodeURIComponent(
                          formData.subject
                        )}&body=\${encodeURIComponent(formData.message)}\`}
                        className="w-full rounded-lg bg-black px-5 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 focus:border-current focus:ring-0 md:w-auto"
                      >
                        Send Message
                      </a>
                    </animated.form>
                  );
                };
                                
                export default Form;`;

    const contactTsFile = path.join(contactDirectoryPath, 'Contact.tsx');
    fs.writeFileSync(contactTsFile, contactTsContent);

    const formTsFile = path.join(contactDirectoryPath, 'Form.tsx');
    fs.writeFileSync(formTsFile, formTsContent);
};

const writeHome = async (directoryPath) => {
    const homeDirectoryPath = path.join(directoryPath, 'Home');
    if (!fs.existsSync(homeDirectoryPath)) {
        fs.mkdirSync(homeDirectoryPath, { recursive: true });
    }
    await writeHomeFiles(homeDirectoryPath);
};

const writeHomeFiles = async (homeDirectoryPath) => {
    const homeTsContent =
        `import {FC, useEffect, useState} from "react";
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
                      if (!pageData.profileImage.startsWith('http')) {
                          import(\`../../assets/images/\${pageData.profileImage}.png\`)
                              .then(module => {
                                  setProfileImage(module.default);
                              })
                              .catch();
                      }
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
                              className={\`relative mx-auto mt-10 h-[300px] w-[300px] transition-all md:h-[500px] md:w-[500px] lg:mx-0 xl:ml-20 xl:mt-32\`}
                            >
                              <div className="h-full w-full overflow-hidden rounded-3xl shadow-customHover">
                                <img
                                  className="h-full w-full object-cover"
                                  src={profileImage || 'https://assets.website-files.com/63360c0c2b86f80ba8b5421a/63407fbdc2d4ac5270385fd4_home-hero-image-paperfolio-webflow-template.svg'}
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
                                
                export default Home;`;

    const homeTsFile = path.join(homeDirectoryPath, 'Home.tsx');
    fs.writeFileSync(homeTsFile, homeTsContent);
};

const writeProject = async (directoryPath) => {
    const projectDirectoryPath = path.join(directoryPath, 'Project');
    if (!fs.existsSync(projectDirectoryPath)) {
        fs.mkdirSync(projectDirectoryPath, { recursive: true });
    }
    await writeProjectFiles(projectDirectoryPath);
};

const writeProjectFiles = async (projectDirectoryPath) => {
    const projectTsContent =
        `import {FC, useEffect, useState} from "react";
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
                    if (!projectDetails?.image.startsWith('http')) {
                      import(\`../../assets/images/\${projectDetails?.image}.png\`)
                          .then((module) => {
                            setImageSrc(module.default);
                          })
                          .catch();
                    }
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
                                className={\`relative overflow-hidden rounded-lg border-2 border-black bg-white p-2 shadow-custom transition-all lg:h-[600px]\`}
                              >
                                <img
                                  src={imageSrc || 'https://picsum.photos/400/400'}
                                  alt=""
                                  className={\`block h-full w-full rounded-lg object-cover transition-all\`}
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
                                        className={\`mb-2 mr-2 inline-block  rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 \${COLORS[index]} py-2 text-sm\`}
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
                                
                export default Project;`;

    const projectTsFile = path.join(projectDirectoryPath, 'Project.tsx');
    fs.writeFileSync(projectTsFile, projectTsContent);
};

const writeProjects = async (directoryPath) => {
    const projectsDirectoryPath = path.join(directoryPath, 'Projects');
    if (!fs.existsSync(projectsDirectoryPath)) {
        fs.mkdirSync(projectsDirectoryPath, { recursive: true });
    }
    await writeProjectsFiles(projectsDirectoryPath);
};

const writeProjectsFiles = async (projectsDirectoryPath) => {
    const projectCardTsContent =
        `import {FC, useEffect, useState} from "react";
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
                    if (!image.startsWith('http')) {
                      import(\`../../assets/images/\${image}.png\`)
                          .then((module) => {
                            setImageSrc(module.default);
                          })
                          .catch();
                    }
                  }, [image]);              
                                   
                  return (
                    <Link
                      to={\`/\${slug}\`}
                      className="relative mb-5 flex max-w-[400px]  flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div
                        className={\`image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all\`}
                      >
                        <img
                          src={imageSrc || 'https://picsum.photos/400/400'}
                          alt=""
                          className={\`inline-block h-full w-full transform object-cover transition-all ease-in-out \${
                            hovered ? "scale-105" : ""
                          }\`}
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
                          className={\`\${
                            hovered ? "translate-x-1" : ""
                          } inline-block transition-all\`}
                        >
                          →
                        </div>
                      </div>
                      <div className={\`rounded-b-lg bg-white px-5 py-2\`}>
                        {languages.map((language, index) => (
                          <span
                            className={\`mb-2 mr-2 inline-block  rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 \${COLORS[index]} py-2 text-sm\`}
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
                                
                export default ProjectCard;`;

    const projectsTsContent =
        `import { FC } from "react";
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
                                
                export default Projects;`;

    const projectCardTsFile = path.join(projectsDirectoryPath, 'ProjectCard.tsx');
    const projectsTsFile = path.join(projectsDirectoryPath, 'Projects.tsx');

    fs.writeFileSync(projectCardTsFile, projectCardTsContent);
    fs.writeFileSync(projectsTsFile, projectsTsContent);
};

const writeNotFound = async (directoryPath) => {
    const notFoundTsContent =
        `import { FC } from "react";
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
                                
                export default NotFound;`;

    const notFoundTsFile = path.join(directoryPath, 'NotFound.tsx');

    fs.writeFileSync(notFoundTsFile, notFoundTsContent);
};

const writeApp = async (directoryPath, id) => {
    let appCssContent =
        `@tailwind base;
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
                }`;


    const work = await knex('work').where({
        user_id: id
    });

    let work_formatted = [];
    for (const job of work) {
        work_formatted.push({
            id: job.id,
            company: job.company,
            position: job.position,
            startDate: job.start_date,
            endDate: job.end_date,
            description: job.description,
            orderId: job.order_id,
            image: job.image.replace("https://codefolioimagebucket.s3.amazonaws.com/", "")
        });
    }

    const projects = await knex('projects').where({
        user_id: id
    });
    let project_formatted = [];
    let slug_list = [];
    for (const project of projects){
        const languages = await knex('languages').where({
            project_id: project.id,
            user_id: id
        });
        const languages_formatted = languages.map((language) => language.language);
        const project_content = await knex('project_content').where({
            project_id: project.id,
            user_id: id
        });

        project_formatted.push({
            name: project.name,
            description: project.description,
            languages: languages_formatted,
            updatedAt: project.updated_at,
            image: project.image.replace("https://codefolioimagebucket.s3.amazonaws.com/", ""),
            id: project.id.toString(),
            slug: project.slug
        });

        slug_list.push({
            slug: project.slug,
            header: project_content[0].header,
            description: project_content[0].description,
            about: project_content[0].about,
            image: project_content[0].image.replace("https://codefolioimagebucket.s3.amazonaws.com/", ""),
            overview: project_content[0].overview,
            platforms: project_content[0].platforms,
            link: project_content[0].link
        });
    }

    const skills = await knex('skills').where({
        user_id: id
    });

    const services = await knex('services').where({
        user_id: id
    });

    const services_formatted = services.map((service) => service.service);

    const skills_formatted = skills.map((skill) => skill.skill);

    const [existingUser] = await knex('users').where({id: id}).returning('*')

    // Constructing skills, projects, work, services, slugs, etc.

    const projects_page = await knex('projects_page').where({
        user_id: existingUser.id
    }).first();

    const about = await knex('about').where({
        user_id: existingUser.id
    }).first();

    const about_sections = await knex('section')
        .where({
            user_id: existingUser.id,
            page: 'ABOUT'
        });

    const aboutSectionDetails = [];

    const aboutHandlers = {
        VALUE: async (section) => {
            const valueSection = await knex('value_section').where('user_id', existingUser.id).first();
            if (valueSection) {
                const values = await knex('values').where('user_id', existingUser.id);
                const valuesList = values.map(value => ({ value: value.value }));
                return {
                    type: "VALUE",
                    details: {
                        header_one: valueSection.header_one,
                        description_one: valueSection.description_one,
                        values: valuesList,
                        page_order: section.page_order
                    }
                };
            }
        },
        STORY: async (section) => {
            const storySection = await knex('story_section').where('user_id', existingUser.id).first();
            if (storySection) {
                return {
                    type: "STORY",
                    details: {
                        header_one: storySection.header_one,
                        description_one: storySection.description_one,
                        bullet_one: storySection.bullet_one,
                        bullet_two: storySection.bullet_two,
                        bullet_three: storySection.bullet_three,
                        image_one: storySection.image_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        SKILL: async (section) => {
            const skillSection = await knex('skill_section').where('user_id', existingUser.id).first();
            if (skillSection) {
                return {
                    type: "SKILL",
                    details: {
                        header_one: skillSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        RESUME: async (section) => {
            const resumeSection = await knex('resume_section').where('user_id', existingUser.id).first();
            if (resumeSection) {
                return {
                    type: "RESUME",
                    details: {
                        header_one: resumeSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        FAQ: async (section) => {
            const faqSection = await knex('faq_section').where('user_id', existingUser.id).first();
            if (faqSection) {
                const faqs = await knex('faq').where('user_id', existingUser.id);
                const faqList = faqs.map(faq => ({ question: faq.question, answer: faq.answer, id: faq.id }));
                return {
                    type: "FAQ",
                    details: {
                        header_one: faqSection.header_one,
                        description_one: faqSection.description_one,
                        faq: faqList,
                        page_order: section.page_order
                    }
                };
            }
        }
    };
    for (const section of about_sections) {
        const handler = aboutHandlers[section.type];
        if (handler) {
            const detail = await handler(section);
            if (detail) {
                aboutSectionDetails.push(detail);
            }
        }
    }

    const about_data = {
        header_one: about.header_one,
        header_two: about.header_two,
        icon_one: about.icon_one,
        icon_two: about.icon_two,
        icon_three: about.icon_three,
        description_one: about.description_one,
        description_two: about.description_two,
        sections: aboutSectionDetails
    };

    const home = await knex('home').where({
        user_id: existingUser.id
    }).first();

    const home_sections = await knex('section')
        .where({
            user_id: existingUser.id,
            page: 'HOME'
        });

    const homeSectionDetails = [];

    const homeHandlers = {
        VALUE: async (section) => {
            const valueSection = await knex('value_section').where('user_id', existingUser.id).first();
            if (valueSection) {
                const values = await knex('values').where('user_id', existingUser.id);
                const valuesList = values.map(value => ({ value: value.value }));
                return {
                    type: "VALUE",
                    details: {
                        header_one: valueSection.header_one,
                        description_one: valueSection.description_one,
                        values: valuesList,
                        page_order: section.page_order
                    }
                };
            }
        },
        STORY: async (section) => {
            const storySection = await knex('story_section').where('user_id', existingUser.id).first();
            if (storySection) {
                return {
                    type: "STORY",
                    details: {
                        header_one: storySection.header_one,
                        description_one: storySection.description_one,
                        bullet_one: storySection.bullet_one,
                        bullet_two: storySection.bullet_two,
                        bullet_three: storySection.bullet_three,
                        image_one: storySection.image_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        SKILL: async (section) => {
            const skillSection = await knex('skill_section').where('user_id', existingUser.id).first();
            if (skillSection) {
                return {
                    type: "SKILL",
                    details: {
                        header_one: skillSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        RESUME: async (section) => {
            const resumeSection = await knex('resume_section').where('user_id', existingUser.id).first();
            if (resumeSection) {
                return {
                    type: "RESUME",
                    details: {
                        header_one: resumeSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        FAQ: async (section) => {
            const faqSection = await knex('faq_section').where('user_id', existingUser.id).first();
            if (faqSection) {
                const faqs = await knex('faq').where('user_id', existingUser.id);
                const faqList = faqs.map(faq => ({ question: faq.question, answer: faq.answer, id: faq.id }));
                return {
                    type: "FAQ",
                    details: {
                        header_one: faqSection.header_one,
                        description_one: faqSection.description_one,
                        faq: faqList,
                        page_order: section.page_order
                    }
                };
            }
        }
    };
    for (const section of home_sections) {
        const handler = homeHandlers[section.type];
        if (handler) {
            const detail = await handler(section);
            if (detail) {
                homeSectionDetails.push(detail);
            }
        }
    }

    const contact = await knex('contact').where({
        user_id: existingUser.id
    }).first();

    const contact_sections = await knex('section')
        .where({
            user_id: existingUser.id,
            page: 'CONTACT'
        });

    const contactSectionDetails = [];

    const contactHandlers = {
        VALUE: async (section) => {
            const valueSection = await knex('value_section').where('user_id', existingUser.id).first();
            if (valueSection) {
                const values = await knex('values').where('user_id', existingUser.id);
                const valuesList = values.map(value => ({ value: value.value }));
                return {
                    type: "VALUE",
                    details: {
                        header_one: valueSection.header_one,
                        description_one: valueSection.description_one,
                        values: valuesList,
                        page_order: section.page_order
                    }
                };
            }
        },
        STORY: async (section) => {
            const storySection = await knex('story_section').where('user_id', existingUser.id).first();
            if (storySection) {
                return {
                    type: "STORY",
                    details: {
                        header_one: storySection.header_one,
                        description_one: storySection.description_one,
                        bullet_one: storySection.bullet_one,
                        bullet_two: storySection.bullet_two,
                        bullet_three: storySection.bullet_three,
                        image_one: storySection.image_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        SKILL: async (section) => {
            const skillSection = await knex('skill_section').where('user_id', existingUser.id).first();
            if (skillSection) {
                return {
                    type: "SKILL",
                    details: {
                        header_one: skillSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        RESUME: async (section) => {
            const resumeSection = await knex('resume_section').where('user_id', existingUser.id).first();
            if (resumeSection) {
                return {
                    type: "RESUME",
                    details: {
                        header_one: resumeSection.header_one,
                        page_order: section.page_order
                    }
                };
            }
        },
        FAQ: async (section) => {
            const faqSection = await knex('faq_section').where('user_id', existingUser.id).first();
            if (faqSection) {
                const faqs = await knex('faq').where('user_id', existingUser.id);
                const faqList = faqs.map(faq => ({ question: faq.question, answer: faq.answer, id: faq.id }));
                return {
                    type: "FAQ",
                    details: {
                        header_one: faqSection.header_one,
                        description_one: faqSection.description_one,
                        faq: faqList,
                        page_order: section.page_order
                    }
                };
            }
        }
    };
    for (const section of contact_sections) {
        const handler = contactHandlers[section.type];
        if (handler) {
            const detail = await handler(section);
            if (detail) {
                contactSectionDetails.push(detail);
            }
        }
    }

    const user_data = {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        company: existingUser.company,
        location: existingUser.location,
        about: existingUser.about,
        website: existingUser.website,
        skills: skills_formatted,
        projects: project_formatted,
        work: work_formatted,
        role: existingUser.role,
        profession: existingUser.profession,
        services: services_formatted,
        slugs: slug_list
    };

    const projects_page_data = {
        header_one: projects_page.header_one,
        description_one: projects_page.description_one,
    };

    const home_data = {
        header_one: home.header_one,
        header_two: home.header_two,
        description_one: home.description_one,
        profile_image: home.profile_image,
        sections: homeSectionDetails
    };

    const contact_data = {
        header_one: contact.header_one,
        description_one: contact.description_one,
        sections: contactSectionDetails
    };

    let homeString = "const homeData = useMemo(\n" +
        "                    () => ({\n" +
        "                      headerOne: \"" + home_data.header_one + "\",\n" +
        "                      descriptionOne: \"" + home_data.description_one + "\",\n" +
        "                      profileImage: \"" + home_data.profile_image.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
        "                      sections: [\n";

    home_data.sections.forEach(section => {
        homeString += "                        {\n" +
            "                          type: \"" + section.type + "\",\n" +
            "                          details: {\n";

        switch (section.type) {
            case "VALUE":
                homeString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            values: " + JSON.stringify(section.details.values) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "STORY":
                homeString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            bulletOne: \"" + section.details.bullet_one + "\",\n" +
                    "                            bulletTwo: \"" + section.details.bullet_two + "\",\n" +
                    "                            bulletThree: \"" + section.details.bullet_three + "\",\n" +
                    "                            imageOne: \"" + section.details.image_one.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "SKILL":
                homeString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "RESUME":
                homeString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "FAQ":
                homeString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            faq: " + JSON.stringify(section.details.faq) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
        }

        homeString += "                          }\n" +
            "                        },\n";
    });

    homeString += "                      ],\n" +
        "                    }),\n" +
        "                    []\n" +
        "                  );";

    console.log(homeString);

    let projectsPageString = "const projectsPageData = useMemo(\n" +
        "                    () => ({\n" +
        "                      headerOne: \"" + projects_page_data.header_one + "\",\n" +
        "                      descriptionOne: \"" + projects_page_data.description_one + "\"\n" +
        "                    }),\n" +
        "                    []\n" +
        "                  );";

    let aboutString = "const aboutData = useMemo(\n" +
        "                    () => ({\n" +
        "                      headerOne: \"" + about_data.header_one + "\",\n" +
        "                      iconOne: \"" + about_data.icon_one.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
        "                      iconTwo: \"" + about_data.icon_two.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
        "                      iconThree: \"" + about_data.icon_three.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
        "                      headerTwo: \"" + about_data.header_two + "\",\n" +
        "                      descriptionOne: \"" + about_data.description_one + "\",\n" +
        "                      descriptionTwo: \"" + about_data.description_two + "\",\n" +
        "                      sections: [\n";

    about_data.sections.forEach(section => {
        aboutString += "                        {\n" +
            "                          type: \"" + section.type + "\",\n" +
            "                          details: {\n";

        switch (section.type) {
            case "VALUE":
                aboutString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            values: " + JSON.stringify(section.details.values) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "STORY":
                aboutString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            bulletOne: \"" + section.details.bullet_one + "\",\n" +
                    "                            bulletTwo: \"" + section.details.bullet_two + "\",\n" +
                    "                            bulletThree: \"" + section.details.bullet_three + "\",\n" +
                    "                            imageOne: \"" + section.details.image_one.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "SKILL":
                aboutString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "RESUME":
                aboutString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "FAQ":
                aboutString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            faq: " + JSON.stringify(section.details.faq) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
        }

        aboutString += "                          }\n" +
            "                        },\n";
    });

    aboutString += "                      ],\n" +
        "                    }),\n" +
        "                    []\n" +
        "                  );";

    let contactString = "const contactData = useMemo(\n" +
        "                    () => ({\n" +
        "                      headerOne: \"" + contact_data.header_one + "\",\n" +
        "                      descriptionOne: \"" + contact_data.description_one + "\",\n" +
        "                      sections: [\n";

    contact_data.sections.forEach(section => {
        contactString += "                        {\n" +
            "                          type: \"" + section.type + "\",\n" +
            "                          details: {\n";

        switch (section.type) {
            case "VALUE":
                contactString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            values: " + JSON.stringify(section.details.values) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "STORY":
                contactString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            bulletOne: \"" + section.details.bullet_one + "\",\n" +
                    "                            bulletTwo: \"" + section.details.bullet_two + "\",\n" +
                    "                            bulletThree: \"" + section.details.bullet_three + "\",\n" +
                    "                            imageOne: \"" + section.details.image_one.replace("https://codefolioimagebucket.s3.amazonaws.com/", "") + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "SKILL":
                contactString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "RESUME":
                contactString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
            case "FAQ":
                contactString += "                            headerOne: \"" + section.details.header_one + "\",\n" +
                    "                            descriptionOne: \"" + section.details.description_one + "\",\n" +
                    "                            faq: " + JSON.stringify(section.details.faq) + ",\n" +
                    "                            order: " + section.details.page_order + "\n";
                break;
        }

        contactString += "                          }\n" +
            "                        },\n";
    });

    contactString += "                      ],\n" +
        "                    }),\n" +
        "                    []\n" +
        "                  );";

    // Final app content
    let appTsContent =
        `import { FC, useMemo } from "react";
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
                                
                   const userData = useMemo(() => ({
                      name: "${user_data.name}",
                      email: "${user_data.email}",
                      phone: "${user_data.phone}",
                      company: "${user_data.company}",
                      location: "${user_data.location}",
                      about: "${user_data.about}",
                      skills: [${user_data.skills.map(skill => `"${skill}"`).join(',')}],
                      projects: ${JSON.stringify(user_data.projects)}, 
                      work: ${JSON.stringify(user_data.work)},
                      role: "${user_data.role}",
                      profession: "${user_data.profession}",
                      services: [${user_data.services.map(service => `"${service}"`).join(',')}],
                      slugs: ${JSON.stringify(user_data.slugs)}
                    }),
                    []
                  );
                             
                  ${homeString}
                                
                  ${aboutString}
                                
                  ${projectsPageString}
                                
                  ${contactString}
                                
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
                                
                export default App;`;

    console.log(appTsContent);

    try {
        fs.writeFileSync(directoryPath + "/App.css", appCssContent);
        fs.writeFileSync(directoryPath + "/App.tsx", appTsContent);
    } catch (e) {
        console.error("Failed to write files: " + e.message);
    }
}

const writeMain = async (pathDirectory) => {
    const mainTsContent = `
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App.tsx";

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  `;

    const mainTsFile = path.join(pathDirectory, 'main.tsx');

    fs.writeFileSync(mainTsFile, mainTsContent);
};


export { handler };