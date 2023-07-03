package com.codefolio.backend.user.pages.homepage;

import java.util.List;
public record HomeResponseModel(String headerOne, String descriptionOne, String headerTwo, String profileImage, List<Object> sections) {}
