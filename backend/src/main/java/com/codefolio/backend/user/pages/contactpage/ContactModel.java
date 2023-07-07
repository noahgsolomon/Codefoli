package com.codefolio.backend.user.pages.contactpage;


import java.util.List;

public record ContactModel(
        String headerOne,
        String descriptionOne,
        String email,
        String phone,
        List<Object> sections
        ) {}
