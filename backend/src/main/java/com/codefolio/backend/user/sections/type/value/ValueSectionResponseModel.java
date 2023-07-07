package com.codefolio.backend.user.sections.type.value;

import com.codefolio.backend.user.pages.aboutpage.values.ValuesResponseModel;

import java.util.List;

public record ValueSectionResponseModel(String headerOne, String descriptionOne, List<ValuesResponseModel> values){}
