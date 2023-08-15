import { Dispatch, FC, SetStateAction } from "react";
import SkillSection from "Components/Sections/Skill/SkillSection.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import StorySection from "Components/Sections/Story/StorySection.tsx";
import ResumeSection from "Components/Sections/Resume/ResumeSection.tsx";
import FAQSection from "Components/Sections/FAQ/FAQSection.tsx";
import ValueSection from "Components/Sections/Value/ValueSection.tsx";
import AddSection from "Components/AddSection/AddSection.tsx";
import UserData from "Type/UserData.tsx";
import HomeData from "Type/HomeData.tsx";
import { SectionType } from "Type/Section.tsx";

const DashboardSections: FC<{
  pageData: HomeData;
  setPageData: Dispatch<SetStateAction<HomeData>>;
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
                    page={"HOME"}
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
                    page={"HOME"}
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
                    page={"HOME"}
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
                    page={"HOME"}
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
                    page={"HOME"}
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
              page={"HOME"}
              setPageData={setPageData as Dispatch<SetStateAction<AnyPageData>>}
              order={section.details.order}
            />,
            sectionComponent,
          ];
        })}
      <AddSection
        setPageData={setPageData as Dispatch<SetStateAction<AnyPageData>>}
        sections={availableSectionTypes}
        page={"HOME"}
        order={pageData.sections.length + 1}
      />
    </>
  );
};

export default DashboardSections;
