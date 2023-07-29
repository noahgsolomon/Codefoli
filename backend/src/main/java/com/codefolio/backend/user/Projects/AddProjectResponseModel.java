package com.codefolio.backend.user.Projects;

import java.util.List;

public record AddProjectResponseModel(String name, String description, List<String> language, String updatedAt, String image, String id) {
}