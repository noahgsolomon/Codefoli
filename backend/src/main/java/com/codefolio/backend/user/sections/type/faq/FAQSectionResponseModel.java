package com.codefolio.backend.user.sections.type.faq;

import com.codefolio.backend.user.faq.FAQResponseModel;

import java.util.List;

public record FAQSectionResponseModel(String headerOne, String descriptionOne, List<FAQResponseModel> faq, int order) {
}
