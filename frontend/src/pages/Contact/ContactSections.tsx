import { Dispatch, FC, SetStateAction } from "react";
import SkillSection from "Components/Sections/Skill/SkillSection.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import StorySection from "Components/Sections/Story/StorySection.tsx";
import ResumeSection from "Components/Sections/Resume/ResumeSection.tsx";
import FAQSection from "Components/Sections/FAQ/FAQSection.tsx";
import ValueSection from "Components/Sections/Value/ValueSection.tsx";
import AddSection from "Components/AddSection/AddSection.tsx";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import { SectionType } from "Type/Section.tsx";

const ContactSections: FC<{
  pageData: ContactData;
  setPageData: Dispatch<SetStateAction<ContactData>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}> = ({ pageData, setPageData, userData, setUserData }) => {
  const allSectionTypes: SectionType[] = [
    "STORY",
    "RESUME",
    "SKILL",
    "FAQ",
    "VALUE",
  ] as SectionType[];

  const sectionList = pageData.sections.map((section) => section.type);

  const availableSectionTypes = allSectionTypes.filter(
    (t) => !sectionList.includes(t)
  );

  return (
    <>
      {pageData.sections
        .sort((a, b) => a.details.order - b.details.order)
        .map((section, index) => {
          const { type, details } = section;

          let sectionComponent;
          switch (type) {
            case "SKILL":
              sectionComponent =
                "header_one" in details ? (
                  <SkillSection
                    key={index}
                    userData={userData}
                    setUserData={setUserData}
                    preview={false}
                    details={details}
                    setPageData={
                      setPageData as Dispatch<SetStateAction<AnyPageData>>
                    }
                    page={"CONTACT"}
                    order={section.details.order}
                  />
                ) : null;
              break;
            case "STORY":
              sectionComponent =
                "description_one" in details &&
                "bullet_one" in details &&
                "bullet_two" in details &&
                "bullet_three" in details &&
                "image_one" in details ? (
                  <StorySection
                    page={"CONTACT"}
                    key={index}
                    details={details}
                    setPageData={
                      setPageData as Dispatch<SetStateAction<AnyPageData>>
                    }
                    order={section.details.order}
                  />
                ) : null;
              break;
            case "RESUME":
              sectionComponent =
                "header_one" in details ? (
                  <ResumeSection
                    key={index}
                    page={"CONTACT"}
                    details={details}
                    setPageData={
                      setPageData as Dispatch<SetStateAction<AnyPageData>>
                    }
                    userData={userData}
                    order={section.details.order}
                    setUserData={setUserData}
                  />
                ) : null;
              break;
            case "FAQ":
              sectionComponent =
                "description_one" in details &&
                "header_one" in details &&
                "faq" in details ? (
                  <FAQSection
                    setPageData={
                      setPageData as Dispatch<SetStateAction<AnyPageData>>
                    }
                    key={index}
                    page={"CONTACT"}
                    details={details}
                    order={section.details.order}
                  />
                ) : null;
              break;
            case "VALUE":
              sectionComponent =
                "description_one" in details &&
                "header_one" in details &&
                "values" in details ? (
                  <ValueSection
                    setPageData={
                      setPageData as Dispatch<SetStateAction<AnyPageData>>
                    }
                    key={index}
                    page={"CONTACT"}
                    details={details}
                    order={section.details.order}
                  />
                ) : null;
              break;
            default:
              sectionComponent = null;
          }
          return [
            <AddSection
              key={`add-${index}`}
              sections={availableSectionTypes}
              page={"CONTACT"}
              setPageData={setPageData as Dispatch<SetStateAction<AnyPageData>>}
              order={section.details.order}
            />,
            sectionComponent,
          ];
        })}
      <AddSection
        setPageData={setPageData as Dispatch<SetStateAction<AnyPageData>>}
        sections={availableSectionTypes}
        page={"CONTACT"}
        order={pageData.sections.length + 1}
      />
    </>
  );
};

export default ContactSections;
