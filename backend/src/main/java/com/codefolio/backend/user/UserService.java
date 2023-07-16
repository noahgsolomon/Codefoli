package com.codefolio.backend.user;

import com.codefolio.backend.user.githubrepo.ProjectsRepository;
import com.codefolio.backend.user.githubrepo.Projects;
import com.codefolio.backend.user.pages.aboutpage.About;
import com.codefolio.backend.user.pages.aboutpage.AboutRepository;
import com.codefolio.backend.user.pages.aboutpage.values.Values;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesRepository;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesType;
import com.codefolio.backend.user.pages.contactpage.Contact;
import com.codefolio.backend.user.pages.contactpage.ContactRepository;
import com.codefolio.backend.user.pages.contactpage.faq.FAQ;
import com.codefolio.backend.user.pages.contactpage.faq.FAQRepository;
import com.codefolio.backend.user.pages.homepage.Home;
import com.codefolio.backend.user.pages.homepage.HomeRepository;
import com.codefolio.backend.user.sections.PageType;
import com.codefolio.backend.user.sections.Section;
import com.codefolio.backend.user.sections.SectionRepository;
import com.codefolio.backend.user.sections.SectionType;
import com.codefolio.backend.user.sections.type.faq.FAQSection;
import com.codefolio.backend.user.sections.type.faq.FAQSectionRepository;
import com.codefolio.backend.user.sections.type.resume.ResumeSection;
import com.codefolio.backend.user.sections.type.resume.ResumeSectionRepository;
import com.codefolio.backend.user.sections.type.skill.SkillSection;
import com.codefolio.backend.user.sections.type.skill.SkillSectionRepository;
import com.codefolio.backend.user.sections.type.story.StorySection;
import com.codefolio.backend.user.sections.type.story.StorySectionRepository;
import com.codefolio.backend.user.sections.type.value.ValueSection;
import com.codefolio.backend.user.sections.type.value.ValueSectionRepository;
import com.codefolio.backend.user.services.Services;
import com.codefolio.backend.user.services.ServicesRepository;
import com.codefolio.backend.user.services.ServicesType;
import com.codefolio.backend.user.skills.Skills;
import com.codefolio.backend.user.skills.SkillsRepository;
import com.codefolio.backend.user.skills.SkillsType;
import com.codefolio.backend.user.workhistory.Work;
import com.codefolio.backend.user.workhistory.WorkRepository;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final WorkRepository workRepository;
    private final ProjectsRepository projectsRepository;
    private final SkillsRepository skillsRepository;
    private final ServicesRepository servicesRepository;
    private final HomeRepository homeRepository;
    private final AboutRepository aboutRepository;
    private final ValuesRepository valuesRepository;
    private final ContactRepository contactRepository;
    private final FAQRepository faqRepository;
    private final SectionRepository sectionRepository;
    private final ResumeSectionRepository resumeSectionRepository;
    private final StorySectionRepository storySectionRepository;
    private final SkillSectionRepository skillSectionRepository;
    private final ValueSectionRepository valueSectionRepository;
    private final FAQSectionRepository faqSectionRepository;


    public static Users getAuthenticatedUser(Principal principal) {
        if (!(principal instanceof Authentication)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        Object principalUser = ((Authentication) principal).getPrincipal();
        if (!(principalUser instanceof Users user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return user;
    }

    public ResponseEntity<Response> userDetails(Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            List<Work> userWorks = workRepository.findAllByUsers(user);
            List<Projects> userProjects = projectsRepository.findAllByUsers(user);
            List<Skills> userSkills = skillsRepository.findAllByUsers(user);
            List<Services> userServices = servicesRepository.findAllByUsers(user);

            SkillsType[] userSkillsTypes = userSkills.stream()
                    .map(Skills::getSkill)
                    .toArray(SkillsType[]::new);

            ServicesType[] userServicesTypes = userServices.stream()
                    .map(Services::getService)
                    .toArray(ServicesType[]::new);

            UserHomeResponseModel userHomeResponseModel = new UserHomeResponseModel(
                    user.getName(),
                    user.getEmail(),
                    user.getCompany(),
                    user.getLocation(),
                    user.getAbout(),
                    userSkillsTypes,
                    userProjects.toArray(new Projects[0]),
                    userWorks.toArray(new Work[0]),
                    user.getRole().toString(),
                    user.getProfession(),
                    userServicesTypes
            );

            return ResponseEntity.ok(new Response(StatusType.OK, "User details fetched successfully", userHomeResponseModel));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> setup(UserProfileRequestModel userProfile, Principal principal) {
        try {
            if (!(principal instanceof Authentication)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.ERROR, "User not authenticated", null));
            }
            Object principalUser = ((Authentication) principal).getPrincipal();
            if (!(principalUser instanceof Users user)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.ERROR, "User not authenticated", null));
            }

            user.setName(userProfile.name());
            user.setEmail(userProfile.email());
            user.setCompany(userProfile.company());
            user.setLocation(userProfile.location());
            user.setProfession(userProfile.profession());
            user.setAbout(userProfile.about());
            userRepository.save(user);

            userProfile.skills().forEach(skill -> {
                System.out.println(skill);
                Skills newSkill = new Skills(SkillsType.valueOf(skill), user);
                skillsRepository.save(newSkill);
            });

            AtomicInteger jobOrder = new AtomicInteger(1);

            userProfile.work().forEach(work -> {
                Work newWork = new Work(user, work.getCompany(), work.getPosition(), work.getStartDate(), work.getEndDate(), work.getDescription(), jobOrder.getAndIncrement());
                workRepository.save(newWork);
            });
            userProfile.services().forEach(service -> {
                Services newService = new Services(ServicesType.valueOf(service), user);
                servicesRepository.save(newService);
            });

            List<Projects> userProjects = projectsRepository.findAllByUsers(user);
            for (Projects userProject : userProjects) {
                projectsRepository.deleteById(userProject.getId());
            }

            userProfile.projects().forEach(project -> {
                System.out.println(project.getName());
                Projects newProject = new Projects(user, project.getName(), project.getLanguage(), project.getDescription(), project.getUpdatedAt(), user.getName());
                projectsRepository.save(newProject);
            });

            faqRepository.save(new FAQ(user, "What is your design process?", "My design process starts with understanding the client's needs, then moving onto research, ideation, prototyping, and finally, implementation."));
            faqRepository.save(new FAQ(user, "How long does a project usually take?", "The duration of a project varies depending on its complexity and scope, but typically it ranges from a few weeks to a few months."));
            faqRepository.save(new FAQ(user, "Do you collaborate with other designers?", "Yes, I often collaborate with other designers and believe that teamwork can lead to more innovative and comprehensive solutions."));
            faqRepository.save(new FAQ(user, "What types of projects do you work on?", "I work on a wide range of projects, from website and app design to branding and graphic design. Each project brings its own unique challenges and opportunities."));
            faqRepository.save(new FAQ(user, "How can I contact you for a project?", "You can reach out to me via the contact form on this website, or directly through email. I look forward to discussing how we can work together."));

            user.setRole(RoleType.USER);
            userRepository.save(user);
            String homeHeaderOne = "I'm " + user.getName() + ", a " + user.getProfession() + " from " + user.getLocation();
            String homeDescriptionOne = user.getAbout();
            String homeHeaderTwo = "My broad set of services and skills";
            Home home = new Home(user, homeHeaderOne, homeDescriptionOne, homeHeaderTwo, "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/63407fbdc2d4ac5270385fd4_home-hero-image-paperfolio-webflow-template.svg");
            homeRepository.save(home);

            String aboutHeaderOne = "Hello, I'm " + user.getName();
            String aboutHeaderTwo = "My story as a designer";
            String aboutDescriptionOne = user.getAbout();
            String aboutIconOne = "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b443e2bb8e12b5faf51a7_about-hero-rigth-image-paperfolio-webflow-template.png";
            String aboutIconTwo = "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b440128f648585c383865_about-hero-left-image-paperfolio-webflow-template.png";
            String aboutIconThree = "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b52d3639fb5250039e574_my-story-image-paperfolio-webflow-template.png";

            About about = new About(user, aboutHeaderOne, aboutIconOne, aboutIconTwo, aboutHeaderTwo, aboutIconThree, aboutDescriptionOne);
            aboutRepository.save(about);

            String contactHeaderOne = "Contact me";
            String contactDescriptionOne = "Don't hesitate to get in touch! Whether you're looking for a design consult, interested in a collaboration, or just want to say hello, I'd be delighted to hear from you. I strive to respond promptly and look forward to our potential correspondence!";
            String contactEmail = user.getEmail();
            String contactPhone = "(123) 456 - 7890";
            Contact contact = new Contact(user, contactHeaderOne, contactDescriptionOne, contactEmail, contactPhone);
            contactRepository.save(contact);

            String StoryHeaderOne = "Designing since I was ? years old";
            String StoryDescriptionOne = "I started designing when I was ? years old. My first designs were for my school projects. I was fascinated by the idea of creating something that people can interact with. I studied design for 5 years in college and have been working as a designer for 3 years.";
            String StoryBulletOne = "Passionate about design from a young age.";
            String StoryBulletTwo = "Five years of design education, three professionally.";
            String StoryBulletThree = "Strong advocate of user-centered design.";
            String StoryImageOne = "https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png";
            String ResumeHeaderOne = "Take a look at my resume";
            String ValueHeaderOne = "The core values that drive my work";
            String ValueDescriptionOne = "Steering the helm of my career is a deeply ingrained set of core values. These principles not only guide my work ethic but also shape the way I view and approach design. Let's delve into the convictions that drive my professional journey.";

            String faqHeaderOne = "Frequently Asked Questions";
            String faqDescriptionOne = "From understanding my design process to discussing project timelines, I've gathered responses to questions often asked by clients and collaborators. If you can't find your answer here, feel free to reach out!";

            StorySection storySection = new StorySection(user, StoryHeaderOne, StoryDescriptionOne, StoryBulletOne, StoryBulletTwo, StoryBulletThree, StoryImageOne);
            storySectionRepository.save(storySection);

            ResumeSection resumeSection = new ResumeSection(user, ResumeHeaderOne);
            resumeSectionRepository.save(resumeSection);

            ValueSection valuesSection = new ValueSection(user, ValueHeaderOne, ValueDescriptionOne);
            valueSectionRepository.save(valuesSection);

            FAQSection faqSection = new FAQSection(user, faqHeaderOne, faqDescriptionOne);
            faqSectionRepository.save(faqSection);

            SkillSection skillSection = new SkillSection(user, "My broad set of services and skills");
            skillSectionRepository.save(skillSection);

            Section aboutStorySectionOne = new Section(user, SectionType.STORY, PageType.ABOUT, 1);
            Section aboutResumeSectionTwo = new Section(user, SectionType.RESUME, PageType.ABOUT, 2);
            Section aboutValuesSectionThree = new Section(user, SectionType.VALUE, PageType.ABOUT, 3);
            Section homeSkillSectionOne = new Section(user, SectionType.SKILL, PageType.HOME, 1);
            Section contactFaqSectionOne = new Section(user, SectionType.FAQ, PageType.CONTACT, 1);
            sectionRepository.saveAll(List.of(aboutStorySectionOne, aboutResumeSectionTwo, aboutValuesSectionThree, homeSkillSectionOne, contactFaqSectionOne));

            valuesRepository.save(new Values(user, ValuesType.HARD_WORK));
            valuesRepository.save(new Values(user, ValuesType.TRANSPARENCY));
            valuesRepository.save(new Values(user, ValuesType.INNOVATION));
            valuesRepository.save(new Values(user, ValuesType.GROWTH));

            return ResponseEntity.ok(new Response(StatusType.OK, "Profile setup successfully!", null));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
