package com.codefolio.backend.authentication;

public record RegisterRequest(String name, String email, String password) {
}
