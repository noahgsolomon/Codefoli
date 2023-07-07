package com.codefolio.backend.user.pages.aboutpage;


import java.util.List;

public record AboutResponseModel(
        String headerOne,
        String iconOne,
        String iconTwo,
        String headerTwo,
        String iconThree,
        String descriptionOne,
        List<Object> sections
) {
}