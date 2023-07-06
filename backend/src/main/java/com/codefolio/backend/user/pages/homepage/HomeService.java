package com.codefolio.backend.user.pages.homepage;

import com.codefolio.backend.user.Users;
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
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Response> getHome(Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            List<Section> sections = sectionRepository.findAllByUsersAndPage(user, PageType.HOME);
            List<Object> sectionDetails = new ArrayList<>();

            for (Section section : sections) {
                Map<String, Object> map = new HashMap<>();

                switch (section.getType()) {
                    case VALUE -> {
                        ValueSection valueSection = valueSectionRepository.findByUsers(user).orElse(null);
                        if (valueSection != null) {
                            map.put("type", "VALUE");
                            map.put("details", new ValueSectionResponseModel(valueSection.getHeaderOne(), valueSection.getDescriptionOne()));
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
                            map.put("type", "FAQ");
                            map.put("details", new FAQSectionResponseModel(faqSection.getHeaderOne(), faqSection.getDescriptionOne()));
                            sectionDetails.add(map);
                        }
                    }
                }
            }

            return ResponseEntity.ok(new Response(StatusType.OK, "Success",
                    new HomeResponseModel(homeData.getHeaderOne(), homeData.getDescriptionOne(), homeData.getHeaderTwo(), homeData.getProfileImage(), sectionDetails)));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            homeData.setHeaderOne(headerOne);
            homeRepository.save(homeData);
            return ResponseEntity.ok(new Response(StatusType.OK, "HeaderOne updated successfully", homeData.getHeaderOne()));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            homeData.setDescriptionOne(descriptionOne);
            homeRepository.save(homeData);
            return ResponseEntity.ok(new Response(StatusType.OK, "DescriptionOne updated successfully", homeData.getDescriptionOne()));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
