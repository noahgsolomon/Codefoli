package com.codefolio.backend.user;

import com.codefolio.backend.user.services.ServicesType;
import com.codefolio.backend.user.skills.SkillsType;
import com.codefolio.backend.user.workhistory.Work;

import java.util.List;

public record UserHomeResponseModel(
        String name,
        String email,
        String phone,
        String company,
        String location,
        String about,
        SkillsType[] skills,
        ProjectsResponseModel[] projects,
        Work[] work,
        String role,
        String profession,
        ServicesType[] services,
        List<SlugUserDetailsResponseModel> slugs
) {
}
