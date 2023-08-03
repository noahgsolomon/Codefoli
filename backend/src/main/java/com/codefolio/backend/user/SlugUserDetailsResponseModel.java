package com.codefolio.backend.user;

public record SlugUserDetailsResponseModel(String slug, String header, String description, String about, String image, String overview, String platforms, String link) {
}
