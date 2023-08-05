package com.codefolio.backend.deploy;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.security.Principal;
import static com.codefolio.backend.user.UserService.getAuthenticatedUser;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
@AllArgsConstructor
public class DeployService {

    public ResponseEntity<Response> deploy(Principal principal) {
        Users user = getAuthenticatedUser(principal);

        String userDirectoryPath = "/Users/noahs/Desktop/codefolio/Codefolio/backend/src/main/java/com/codefolio/backend/deploy/deployments/user-" + user.getId();
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

        writeMainTsFile(userDirectoryPath);
        writeIndexHtmlFile(userDirectoryPath);

        return ResponseEntity.ok().body(new Response(StatusType.OK, "Deployed successfully", null));
    }

    private void writeMainTsFile(String directoryPath) {
        String mainTsContent = """
                import React from "react";
                import ReactDOM from "react-dom/client";
                import App from "./App.tsx";

                ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                );""";

        File mainTsFile = new File(directoryPath + "/main.tsx");
        try (FileWriter writer = new FileWriter(mainTsFile)) {
            writer.write(mainTsContent);
        } catch (IOException e) {
            System.err.println("Failed to write file: " + e.getMessage());
        }
    }

    private void writeIndexHtmlFile(String directoryPath) {
        String indexHtmlContent = """
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="icon" href="./src/assets/gameboy.png" type="image/png" />
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
}
