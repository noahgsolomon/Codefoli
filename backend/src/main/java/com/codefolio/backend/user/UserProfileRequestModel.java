package com.codefolio.backend.user;

import com.codefolio.backend.user.workhistory.Work;

import java.util.List;

public record UserProfileRequestModel(
        String name,
        String email,
        String company,
        String location,
        List<String> skills,
        List<Work> work,
        List<ProjectRequestModel> projects,
        String profession,
        String about,
        List<String> services) {
}