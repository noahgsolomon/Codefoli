package com.codefolio.backend.user.sections;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.values.Values;
import com.codefolio.backend.user.values.ValuesRepository;
import com.codefolio.backend.user.values.ValuesResponseModel;
import com.codefolio.backend.user.faq.FAQ;
import com.codefolio.backend.user.faq.FAQRepository;
import com.codefolio.backend.user.faq.FAQResponseModel;
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
import java.util.List;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class SectionService {

    private final SectionRepository sectionRepository;
    private final StorySectionRepository storySectionRepository;
    private final FAQSectionRepository faqSectionRepository;
    private final SkillSectionRepository skillSectionRepository;
    private final ValueSectionRepository valueSectionRepository;
    private final ResumeSectionRepository resumeSectionRepository;
    private final FAQRepository faqRepository;
    private final ValuesRepository valuesRepository;

    public ResponseEntity<Response> removeSection(Principal principal, SectionModelRequest remove) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Section> section = sectionRepository.findByUsersAndPageAndType(user, PageType.valueOf(remove.page()), SectionType.valueOf(remove.section()));
            if (section.isPresent()) {
                List<Section> sections = sectionRepository.findAllByUsersAndPage(user, PageType.valueOf(remove.page()));

                for (Section sec : sections) {
                    if (sec.getPageOrder() > remove.order()) {
                        sec.setPageOrder(sec.getPageOrder() - 1);
                        sectionRepository.save(sec);
                    }
                }
                sectionRepository.delete(section.get());
                return ResponseEntity.ok(new Response(StatusType.OK, "Section deleted successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Section not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addSection(Principal principal, SectionModelRequest add){
        try{
            System.out.println(add.order());
            Users user = getAuthenticatedUser(principal);
            Optional<Section> section = sectionRepository.findByUsersAndPageAndType(user, PageType.valueOf(add.page()), SectionType.valueOf(add.section()));
            if (section.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Section already present", null));
            }

            List<Section> sections = sectionRepository.findAllByUsersAndPage(user, PageType.valueOf(add.page()));

            for (Section sec : sections) {
                if (sec.getPageOrder() >= add.order()) {
                    sec.setPageOrder(sec.getPageOrder() + 1);
                    sectionRepository.save(sec);
                }
            }

            Section newSection = new Section(user, SectionType.valueOf(add.section()), PageType.valueOf(add.page()), add.order());
            Object data = null;
            if (newSection.getType().equals(SectionType.STORY)) {
                Optional<StorySection> storyOpt = storySectionRepository.findByUsers(user);
                if (storyOpt.isPresent()) {
                    StorySection story = storyOpt.get();
                    data = new StorySectionResponseModel(story.getHeaderOne(), story.getDescriptionOne(), story.getBulletOne(), story.getBulletTwo(), story.getBulletThree(), story.getImageOne(), add.order());
                }
            } else if (newSection.getType().equals(SectionType.RESUME)){
                Optional<ResumeSection> resumeOpt = resumeSectionRepository.findByUsers(user);
                if (resumeOpt.isPresent()) {
                    ResumeSection resume = resumeOpt.get();
                    data = new ResumeSectionResponseModel(resume.getHeaderOne(), add.order());
                }
            } else if (newSection.getType().equals(SectionType.FAQ)) {
                Optional<FAQSection> faqOpt = faqSectionRepository.findByUsers(user);
                if (faqOpt.isPresent()) {
                    FAQSection faq = faqOpt.get();
                    List<FAQ> faqList = faqRepository.findAllByUsers(user);
                    List<FAQResponseModel> faqResponseModels = new ArrayList<>();
                    for (FAQ f : faqList) {
                        faqResponseModels.add(new FAQResponseModel(f.getQuestion(), f.getAnswer(), f.getId()));
                    }
                    data = new FAQSectionResponseModel(faq.getHeaderOne(), faq.getDescriptionOne(), faqResponseModels, add.order());
                }
            } else if (newSection.getType().equals(SectionType.VALUE)) {
                Optional<ValueSection> valueSectionOpt = valueSectionRepository.findByUsers(user);
                if (valueSectionOpt.isPresent()) {
                    ValueSection valueSection = valueSectionOpt.get();
                    List<Values> valuesList = valuesRepository.findAllByUsers(user);
                    List<ValuesResponseModel> valuesResponseModelList = new ArrayList<>();
                    for (Values v : valuesList) {
                        valuesResponseModelList.add(new ValuesResponseModel(v.getValue()));
                    }
                    data = new ValueSectionResponseModel(valueSection.getHeaderOne(), valueSection.getDescriptionOne(), valuesResponseModelList, add.order());
                }
            } else if (newSection.getType().equals(SectionType.SKILL)) {
                Optional<SkillSection> skillSectionOpt = skillSectionRepository.findByUsers(user);
                if (skillSectionOpt.isPresent()) {
                    SkillSection skillSection = skillSectionOpt.get();
                    data = new SkillSectionResponseModel(skillSection.getHeaderOne(), add.order());
                }
            }

            sectionRepository.save(newSection);
            return ResponseEntity.ok(new Response(StatusType.OK, "Section added successfully", data));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
