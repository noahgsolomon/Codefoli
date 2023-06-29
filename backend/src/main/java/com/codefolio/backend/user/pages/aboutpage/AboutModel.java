package com.codefolio.backend.user.pages.aboutpage;

import com.codefolio.backend.user.pages.aboutpage.values.Values;

import java.util.List;

public record AboutModel(
        String headerOne,
        String iconOne,
        String iconTwo,
        String headerTwo,
        String iconThree,
        String descriptionOne,
        String headerThree,
        String descriptionTwo,
        String bulletOne,
        String bulletTwo,
        String bulletThree,
        String imageOne,
        String headerFour,
        String headerFive,
        String descriptionThree,
        boolean sectionTwoActive,
        List<Values> values) {
}