import {FC} from "react";
import UserData from "Type/UserData.tsx";
import SkillSectionP from "./Skills/SkillSectionP.tsx";
import StorySectionP from "./Story/StorySectionP.tsx";
import ResumeSectionP from "./Resume/ResumeSectionP.tsx";
import FAQSectionP from "./FAQ/FaqSectionP.tsx";
import ValueSectionP from "./Value/ValueSectionP.tsx";
import AnyPageData from "Type/AnyPageData.tsx";


const SectionsP: FC<{
    pageData: AnyPageData;
    userData: UserData;
}> = ({pageData, userData}) => {

    return (
        <>
            {pageData.sections
                .sort((a, b) => a.details.order - b.details.order)
                .map((section, index) => {
                    const { type, details } = section;
                    let sectionComponent;
                    switch (type) {
                        case "SKILL":
                            sectionComponent = (
                                <SkillSectionP
                                    key={index}
                                    userData={userData}
                                    details={details}
                                />
                            );
                            break;
                        case "STORY":
                            sectionComponent =
                                "descriptionOne" in details &&
                                "bulletOne" in details &&
                                "bulletTwo" in details &&
                                "bulletThree" in details &&
                                "imageOne" in details ? (
                                    <StorySectionP
                                        key={index}
                                        details={details}
                                    />
                                ) : null;
                            break;
                        case "RESUME":
                            sectionComponent = (
                                <ResumeSectionP
                                    key={index}
                                    details={details}
                                    userData={userData}
                                />
                            );
                            break;
                        case "FAQ":
                            sectionComponent =
                                "descriptionOne" in details &&
                                "headerOne" in details &&
                                "faq" in details ? (
                                    <FAQSectionP
                                        key={index}
                                        details={details}
                                    />
                                ) : null;
                            break;
                        case "VALUE":
                            sectionComponent =
                                "descriptionOne" in details &&
                                "headerOne" in details &&
                                "values" in details ? (
                                    <ValueSectionP
                                        key={index}
                                        details={details}
                                    />
                                ) : null;
                            break;
                        default:
                            sectionComponent = null;
                    }
                    return sectionComponent;
                })}
        </>
    );
};

export default SectionsP;