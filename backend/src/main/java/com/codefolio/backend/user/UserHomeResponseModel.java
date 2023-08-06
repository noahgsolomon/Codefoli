package com.codefolio.backend.user;

import com.codefolio.backend.user.services.ServicesType;
import com.codefolio.backend.user.skills.SkillsType;
import com.codefolio.backend.user.workhistory.WorkModel;

public record UserHomeResponseModel(
       String name,
         String email,
            String phone,
            String company,
            String location,
            String about,
            String website,
            SkillsType[] skills,
            ProjectsResponseModel[] projects,
            WorkModel[] work,
            String role,
            String profession,
            ServicesType[] services,
            SlugUserDetailsResponseModel[] slugs
) {
}