package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.user.pages.contactpage.faq.FAQ;

import java.util.List;

public record ContactModel(
        String headerOne,
        String descriptionOne,
        String email,
        String phone,
        String headerTwo,
        String descriptionTwo,
        List<FAQ> faq
        ) {
}
