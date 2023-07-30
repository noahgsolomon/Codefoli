package com.codefolio.backend.user;

import java.util.List;

public record ProjectsResponseModel(String name, String description, List<String> languages, String updatedAt, String image, String id, String slug) {
}
