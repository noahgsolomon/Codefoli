package com.codefolio.backend.config;

import com.codefolio.backend.user.Projects.languages.Languages;
import com.codefolio.backend.user.Projects.languages.LanguagesRepository;
import com.codefolio.backend.user.Projects.projectcontent.ProjectContent;
import com.codefolio.backend.user.Projects.projectcontent.ProjectContentRepository;
import com.codefolio.backend.user.UserRepository;
import com.codefolio.backend.user.session.UserSession;
import com.codefolio.backend.user.session.UserSessionRepository;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.Projects.GithubRepo;
import com.codefolio.backend.user.Projects.ProjectsRepository;
import com.codefolio.backend.user.Projects.Projects;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Component
@AllArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final UserSessionRepository userSessionRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final ProjectsRepository projectsRepository;
    private final LanguagesRepository languagesRepository;
    private final ProjectContentRepository projectContentRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
            throw new IllegalArgumentException("Unexpected type of authentication: " + authentication);
        }
        String email = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("email");
        String name = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("name");
        String bio = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("bio");
        String location = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("location");
        String company = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("company");
        String id = Objects.requireNonNull(((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("id")).toString();

        boolean newUser = false;
        Users user;
        if (userRepository.findByGitHubId(id).isPresent()){
            user = userRepository.findByGitHubId(id).get();
            if (user.getRole().toString().equals("NEWBIE")){
                newUser = true;
            }
        }else {
            newUser = true;
            String username = ((OAuth2AuthenticationToken) authentication).getPrincipal().getAttribute("login");
            OAuth2AuthorizedClient oAuthClient = authorizedClientService.loadAuthorizedClient(
                    oauthToken.getAuthorizedClientRegistrationId(),
                    oauthToken.getName());

            String accessToken = oAuthClient.getAccessToken().getTokenValue();
            String randomPassword = UUID.randomUUID().toString();
            if (userRepository.findByEmail(email).isPresent()){
                email = "";
            }
            user = new Users(name, email, passwordEncoder.encode(randomPassword), company, location, bio);
            user.setGitHubId(id);
            userRepository.save(user);
            try {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest repoRequest = HttpRequest.newBuilder()
                        .uri(URI.create("https://api.github.com/users/" + username + "/repos"))
                        .header("Authorization", "token " + accessToken)
                        .build();


                HttpResponse<String> repoResponse = client.send(repoRequest, HttpResponse.BodyHandlers.ofString());
                Gson gson = new Gson();
                Type repoListType = new TypeToken<ArrayList<GithubRepo>>(){}.getType();
                List<GithubRepo> repos = gson.fromJson(repoResponse.body(), repoListType);

                for(GithubRepo repo : repos) {
                    Projects project = new Projects(user, repo.getName(), repo.getDescription(), repo.getUpdatedAt(), repo.getOwner().getLogin());
                    projectsRepository.save(project);
                    Languages language = new Languages(user, project, repo.getLanguage());
                    languagesRepository.save(language);
                    ProjectContent projectContent = new ProjectContent(
                            user,
                            project,
                            project.getName(),
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ex similique fuga beatae officia nam unde, velit accusantium et inventore.",
                            "Overview",
                            """
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum dolore unde saepe qui sint. Neque aliquid quam corrupti voluptas nam magni sed, temporibus delectus suscipit illum repellendus modi! Fuga, nemo.
    
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate vitae vel tempore, nobis odit quos ipsum accusantium doloremque atque nihil molestias deleniti obcaecati expedita earum commodi doloribus ex delectus culpa magni id. Ab culpa nam, optio fugiat libero quia illum nihil vitae, placeat, eligendi est a blanditiis nemo\s
                                     iusto.""",
                            "https://picsum.photos/2000",
                            "Web, Android, iOS"
                    );
                    projectContentRepository.save(projectContent);
                }

            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }

        String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();

        UserSession userSession = new UserSession(sessionId, user, new Date());

        userSessionRepository.save(userSession);

        Cookie cookie = new Cookie("SESSION_ID", sessionId);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 30);
        response.addCookie(cookie);

        System.out.println("User session saved: " + userSession.getId());

        if (newUser){
            response.sendRedirect("http://localhost:5173/setup");
        }
        else{
            response.sendRedirect("http://localhost:5173/dashboard");
        }

    }
}