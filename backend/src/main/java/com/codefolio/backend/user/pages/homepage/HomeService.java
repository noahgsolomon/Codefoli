package com.codefolio.backend.user.pages.homepage;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.sections.PageType;
import com.codefolio.backend.user.sections.Section;
import com.codefolio.backend.user.sections.SectionRepository;
import com.codefolio.backend.user.sections.type.faq.FAQSectionRepository;
import com.codefolio.backend.user.sections.type.faq.FAQSectionResponseModel;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionRepository;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionResponseModel;
import com.codefolio.backend.user.sections.type.skill.SkillSectionRepository;
import com.codefolio.backend.user.sections.type.skill.SkillSectionResponseModel;
import com.codefolio.backend.user.sections.type.story.StorySectionRepository;
import com.codefolio.backend.user.sections.type.story.StorySectionResponseModel;
import com.codefolio.backend.user.sections.type.value.ValueSectionRepository;
import com.codefolio.backend.user.sections.type.value.ValueSectionResponseModel;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class HomeService {
    private final HomeRepository homeRepository;
    private final SectionRepository sectionRepository;
    private final FAQSectionRepository faqSectionRepository;
    private final ResumeSectionRepository resumeSectionRepository;
    private final SkillSectionRepository skillSectionRepository;
    private final StorySectionRepository storySectionRepository;
    private final ValueSectionRepository valueSectionRepository;
    public ResponseEntity<?> getHome(Principal principal) {
        Users user = getAuthenticatedUser(principal);
        Home homeData = homeRepository.findByUsers(user);
        List<Section> sections = sectionRepository.findAllByUsersAndPage(user, PageType.HOME);
        List<Object> sectionDetails = new ArrayList<>();
        for (Section section : sections){
            Map<String, Object> map = new HashMap<>();
            switch (section.getType()) {
                case VALUE -> valueSectionRepository.findByUsers(user).ifPresent(valueSection -> {
                    map.put("type", "VALUE");
                    map.put("details", new ValueSectionResponseModel(valueSection.getHeaderOne(), valueSection.getDescriptionOne()));
                    sectionDetails.add(map);
                });
                case STORY -> storySectionRepository.findByUsers(user).ifPresent(storySection -> {
                    map.put("type", "STORY");
                    map.put("details", new StorySectionResponseModel(storySection.getHeaderOne(), storySection.getDescriptionOne(), storySection.getBulletOne(), storySection.getBulletTwo(), storySection.getBulletThree(), storySection.getImageOne()));
                    sectionDetails.add(map);
                });
                case SKILL -> skillSectionRepository.findByUsers(user).ifPresent(skillSection -> {
                    map.put("type", "SKILL");
                    map.put("details", new SkillSectionResponseModel(skillSection.getHeaderOne()));
                    sectionDetails.add(map);
                });
                case RESUME -> resumeSectionRepository.findByUsers(user).ifPresent(resumeSection -> {
                    map.put("type", "RESUME");
                    map.put("details", new ResumeSectionResponseModel(resumeSection.getHeaderOne()));
                    sectionDetails.add(map);
                });
                case FAQ -> faqSectionRepository.findByUsers(user).ifPresent(faqSection -> {
                    map.put("type", "FAQ");
                    map.put("details", new FAQSectionResponseModel(faqSection.getHeaderOne(), faqSection.getDescriptionOne()));
                    sectionDetails.add(map);
                });
            }
        }
        return ResponseEntity.ok(new HomeResponseModel(
                homeData.getHeaderOne(),
                homeData.getDescriptionOne(),
                homeData.getHeaderTwo(),
                homeData.getProfileImage(),
                sectionDetails
        ));
    }

    public ResponseEntity<?> updateHeaderOne(Principal principal, String headerOne) {
        Users user = getAuthenticatedUser(principal);
        Home homeData = homeRepository.findByUsers(user);
        homeData.setHeaderOne(headerOne);
        homeRepository.save(homeData);
        return ResponseEntity.ok(homeData.getHeaderOne());
    }

    public ResponseEntity<?> updateDescriptionOne(Principal principal, String descriptionOne) {
        Users user = getAuthenticatedUser(principal);
        Home homeData = homeRepository.findByUsers(user);
        homeData.setDescriptionOne(descriptionOne);
        homeRepository.save(homeData);
        return ResponseEntity.ok(homeData.getDescriptionOne());
    }
}
