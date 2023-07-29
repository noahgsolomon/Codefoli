package com.codefolio.backend.user;

import java.util.List;

public record ProjectRequestModel(String name, String description, List<String> languages, String updatedAt, String image, String id) {
}
