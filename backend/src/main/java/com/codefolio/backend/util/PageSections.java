package com.codefolio.backend.util;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.aboutpage.values.Values;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesRepository;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesResponseModel;
import com.codefolio.backend.user.pages.contactpage.faq.FAQ;
import com.codefolio.backend.user.pages.contactpage.faq.FAQRepository;
import com.codefolio.backend.user.pages.contactpage.faq.FAQResponseModel;
import com.codefolio.backend.user.sections.PageType;
import com.codefolio.backend.user.sections.Section;
import com.codefolio.backend.user.sections.SectionRepository;
import com.codefolio.backend.user.sections.type.faq.FAQSection;
import com.codefolio.backend.user.sections.type.faq.FAQSectionRepository;
import com.codefolio.backend.user.sections.type.faq.FAQSectionResponseModel;
import com.codefolio.backend.user.sections.type.resume.ResumeSection;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionRepository;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionResponseModel;
import com.codefolio.backend.user.sections.type.skill.SkillSection;
import com.codefolio.backend.user.sections.type.skill.SkillSectionRepository;
import com.codefolio.backend.user.sections.type.skill.SkillSectionResponseModel;
import com.codefolio.backend.user.sections.type.story.StorySection;
import com.codefolio.backend.user.sections.type.story.StorySectionRepository;
import com.codefolio.backend.user.sections.type.story.StorySectionResponseModel;
import com.codefolio.backend.user.sections.type.value.ValueSection;
import com.codefolio.backend.user.sections.type.value.ValueSectionRepository;
import com.codefolio.backend.user.sections.type.value.ValueSectionResponseModel;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class PageSections {

    private final SectionRepository sectionRepository;
    private final FAQSectionRepository faqSectionRepository;
    private final ResumeSectionRepository resumeSectionRepository;
    private final SkillSectionRepository skillSectionRepository;
    private final StorySectionRepository storySectionRepository;
    private final ValueSectionRepository valueSectionRepository;
    private final FAQRepository faqRepository;
    private final ValuesRepository valuesRepository;

    public List<Object> getSections(Users user, PageType pageType) {
        List<Section> sections = sectionRepository.findAllByUsersAndPage(user, pageType);
        List<Object> sectionDetails = new ArrayList<>();

        for (Section section : sections) {
            Map<String, Object> map = new HashMap<>();

            switch (section.getType()) {
                case VALUE -> {
                    ValueSection valueSection = valueSectionRepository.findByUsers(user).orElse(null);
                    if (valueSection != null) {
                        List<Values> values = valuesRepository.findAllByUsers(user);
                        List<ValuesResponseModel> valuesList = new ArrayList<>();
                        for (Values value: values){
                            valuesList.add(new ValuesResponseModel(value.getValue()));
                        }
                        map.put("type", "VALUE");
                        map.put("details", new ValueSectionResponseModel(valueSection.getHeaderOne(), valueSection.getDescriptionOne(), valuesList));
                        sectionDetails.add(map);
                    }
                }
                case STORY -> {
                    StorySection storySection = storySectionRepository.findByUsers(user).orElse(null);
                    if (storySection != null) {
                        map.put("type", "STORY");
                        map.put("details", new StorySectionResponseModel(storySection.getHeaderOne(), storySection.getDescriptionOne(), storySection.getBulletOne(), storySection.getBulletTwo(), storySection.getBulletThree(), storySection.getImageOne()));
                        sectionDetails.add(map);
                    }
                }
                case SKILL -> {
                    SkillSection skillSection = skillSectionRepository.findByUsers(user).orElse(null);
                    if (skillSection != null) {
                        map.put("type", "SKILL");
                        map.put("details", new SkillSectionResponseModel(skillSection.getHeaderOne()));
                        sectionDetails.add(map);
                    }
                }
                case RESUME -> {
                    ResumeSection resumeSection = resumeSectionRepository.findByUsers(user).orElse(null);
                    if (resumeSection != null) {
                        map.put("type", "RESUME");
                        map.put("details", new ResumeSectionResponseModel(resumeSection.getHeaderOne()));
                        sectionDetails.add(map);
                    }
                }
                case FAQ -> {
                    FAQSection faqSection = faqSectionRepository.findByUsers(user).orElse(null);
                    if (faqSection != null) {
                        List<FAQ> faq = faqRepository.findAllByUsers(user);
                        List<FAQResponseModel> faqList = new ArrayList<>();
                        for(FAQ oneFaq : faq) {
                            faqList.add(new FAQResponseModel(oneFaq.getQuestion(), oneFaq.getAnswer()));
                        }
                        map.put("type", "FAQ");
                        map.put("details", new FAQSectionResponseModel(faqSection.getHeaderOne(), faqSection.getDescriptionOne(), faqList));
                        sectionDetails.add(map);
                    }
                }
            }
        }
        return sectionDetails;
    }

}
