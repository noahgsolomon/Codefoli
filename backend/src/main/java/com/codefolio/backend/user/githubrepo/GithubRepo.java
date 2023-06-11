package com.codefolio.backend.user.githubrepo;

import com.google.gson.annotations.SerializedName;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GithubRepo {
    private String name;
    private Owner owner;
    private String language;
    @SerializedName("updated_at")
    private String updatedAt;
    private String description;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Owner {
        private String login;
    }

}
