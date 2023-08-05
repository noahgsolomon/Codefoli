import { FC } from "react";
import { UserData } from "../types/UserData.tsx";
import SkillSection from "./Skill/SkillSection.tsx";
import {
  FAQType,
  ResumeType,
  SkillType,
  StoryType,
  ValueType,
} from "../types/Section.tsx";
import StorySection from "./Story/StorySection.tsx";
import ResumeSection from "./Resume/ResumeSection.tsx";
import FAQSection from "./FAQ/FaqSection.tsx";
import ValueSection from "./Value/ValueSection.tsx";
import { HomeData } from "../types/HomeData.tsx";
import { AboutData } from "../types/AboutData.tsx";
import ContactData from "../types/ContactData.tsx";

const Sections: FC<{
  userData: UserData;
  pageData: HomeData | AboutData | ContactData;
}> = ({ userData, pageData }) => {
  return (
    <>
      {pageData.sections
        .sort((a, b) => a.details.order - b.details.order)
        .map((section, index) => {
          const { type, details } = section;
          let sectionComponent;
          switch (type) {
            case "SKILL":
              if ("headerOne" in details) {
                sectionComponent = (
                  <SkillSection
                    key={index}
                    userData={userData}
                    details={details as SkillType}
                  />
                );
              }
              break;
            case "STORY":
              if (
                "descriptionOne" in details &&
                "bulletOne" in details &&
                "bulletTwo" in details &&
                "bulletThree" in details &&
                "imageOne" in details
              ) {
                sectionComponent = (
                  <StorySection key={index} details={details as StoryType} />
                );
              }
              break;
            case "RESUME":
              if ("headerOne" in details) {
                sectionComponent = (
                  <ResumeSection
                    key={index}
                    details={details as ResumeType}
                    userData={userData}
                  />
                );
              }
              break;
            case "FAQ":
              if (
                "descriptionOne" in details &&
                "headerOne" in details &&
                "faq" in details
              ) {
                sectionComponent = (
                  <FAQSection key={index} details={details as FAQType} />
                );
              }
              break;
            case "VALUE":
              if (
                "descriptionOne" in details &&
                "headerOne" in details &&
                "values" in details
              ) {
                sectionComponent = (
                  <ValueSection key={index} details={details as ValueType} />
                );
              }
              break;
            default:
              sectionComponent = null;
          }
          return sectionComponent;
        })}
    </>
  );
};

export default Sections;
