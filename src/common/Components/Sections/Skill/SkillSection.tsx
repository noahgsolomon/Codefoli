import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import ServiceCard from "Components/Sections/Skill/ServiceCard.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import { Link } from "react-router-dom";
import { COLORS } from "../../../../util/colors.ts";
import { SkillType } from "Type/Section.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import PageType from "Type/Pages.tsx";
import { Skills } from "Type/Skills.tsx";
import { changeSkill } from "Components/Sections/Skill/skillapi.tsx";
import AddServiceCard from "Components/Sections/Skill/AddServiceCard.tsx";
import { updateText } from "api/updatetext.tsx";

const SkillSection: FC<{
  userData: UserData;
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
  page: PageType;
  details: SkillType;
  preview: boolean;
  order: number;
}> = ({
  userData,
  details,
  preview,
  setPageData,
  setUserData,
  page,
  order,
}) => {
  const [languageHover, setLanguageHover] = useState<boolean>(false);
  const [skillHover, setSkillHover] = useState<boolean>(false);
  const [removeSkill, setRemoveSkill] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const [addingSkill, setAddingSkill] = useState<boolean>(false);
  const allSkills = Skills;
  const [matchingSkills, setMatchingSkills] = useState<string[]>([
    ...allSkills,
  ]);
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.header_one
  );

  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleNewSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
    const userSkills = userData.skills;
    const matches = allSkills.filter(
      (skill) =>
        skill.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
        !userSkills.includes(skill.toUpperCase().replaceAll(" ", "_") as Skills)
    );
    setMatchingSkills(matches);
  };

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "skill_section"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "SKILL"
            ? {
                ...section,
                details: { ...section.details, header_one: headerOneEditValue },
              }
            : section
        ),
      }));
    }
    setHeaderOneEdit(false);
  };

  const handleRemoveSkill = async (skill: string) => {
    const removeLanguageFetch = await changeSkill({
      type: "language",
      operation: "remove",
      value: skill,
    });
    if (removeLanguageFetch.status === "OK") {
      setUserData((prev) => {
        const updatedSkills = prev.skills.filter(
          (prevSkill) => prevSkill !== skill
        );
        return {
          ...prev,
          skills: updatedSkills,
        };
      });
    }
  };

  const handleRemoveSection = async () => {
    const remove = await addRemoveSection(page, "SKILL", order, "remove");
    if (remove.status === "OK") {
      setPageData((prev) => {
        const removedSection = prev.sections.find(
          (section) => section.type === "SKILL"
        );
        if (!removedSection) {
          return prev;
        }
        const removedOrder = removedSection.details.page_order;
        const updatedSections = prev.sections
          .filter((section) => section.type !== "SKILL")
          .map((section) => {
            if (section.details.page_order > removedOrder) {
              return {
                ...section,
                details: {
                  ...section.details,
                  page_order: section.details.page_order - 1,
                },
              };
            } else {
              return section;
            }
          });

        return {
          ...prev,
          sections: updatedSections,
        };
      });
    }
  };

  const handleAddSkill = async (skill: string) => {
    const addNewSkillFetch = await changeSkill({
      type: "language",
      operation: "add",
      value: skill,
    });
    if (addNewSkillFetch.status === "OK") {
      setUserData((prev) => {
        const updatedSkills = [...prev.skills, skill as Skills];
        return {
          ...prev,
          skills: updatedSkills,
        };
      });
    }
    setNewSkill("");
    setMatchingSkills([...allSkills]);
    setAddingSkill(false);
  };

  return (
    <div
      className="relative mb-20 mt-20"
      onMouseEnter={() => setSkillHover(true)}
      onMouseLeave={() => setSkillHover(false)}
    >
      {removeSkill && (
        <div
          className={` absolute inset-0 z-10 bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          skillHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveSkill(true)}
        onMouseLeave={() => setRemoveSkill(false)}
        onClick={async () => await handleRemoveSection()}
      >
        -
      </button>
      {headerOneEdit ? (
        <textarea
          ref={headerOneTextareaRef}
          value={headerOneEditValue}
          onChange={(e) => setHeaderOneEditValue(e.target.value)}
          onBlur={() => {
            setHeaderOneEditValue(details.header_one);
            setHeaderOneEdit(false);
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              await handleHeaderOneSubmit();
            }
          }}
          className="mb-10 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-2xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
          autoFocus
          onFocus={(e) => {
            e.target.select();
          }}
          maxLength={50}
        />
      ) : (
        <h2
          className="mb-10 cursor-pointer select-none text-center text-2xl font-bold leading-relaxed transition-all hover:opacity-50"
          onClick={() => setHeaderOneEdit(true)}
        >
          {details.header_one}
        </h2>
      )}
      <div className="mx-10 grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:mx-80">
        <div
          className="card relative mb-5 flex max-w-[400px] flex-col rounded-2xl border-2 border-black bg-white shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
          onMouseEnter={() => {
            if (preview) {
              return;
            }
            setLanguageHover(true);
          }}
          onMouseLeave={() => {
            if (preview) {
              return;
            }
            setLanguageHover(false);
          }}
        >
          <div
            className={`min-h-64 mt-5 flex flex-wrap gap-2 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2`}
          >
            {userData.skills.map((skill, index) => {
              return (
                <span
                  key={index}
                  className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
                    COLORS[index]
                  } ${
                    !preview ? "hover:bg-red-500 hover:line-through" : ""
                  } py-2 text-sm`}
                  onClick={async () => await handleRemoveSkill(skill)}
                >
                  {skill}
                </span>
              );
            })}
            {addingSkill && (
              <div className="relative mr-2 ">
                <input
                  autoFocus={true}
                  type="text"
                  value={newSkill}
                  onBlur={() => {
                    setAddingSkill(false);
                    setNewSkill("");
                  }}
                  onChange={handleNewSkillChange}
                  className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm shadow-custom transition-all hover:shadow-customHover"
                  style={{ width: "fit-content" }}
                />
                {newSkill && matchingSkills.length > 0 && (
                  <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white pt-5">
                    {matchingSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                        onMouseDown={async (e) => {
                          e.preventDefault();
                          await handleAddSkill(skill);
                        }}
                      >
                        <span className="px-2 text-white">{skill}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {userData.skills.length < 12 && (
              <span
                className={`${
                  languageHover ? "opacity-100" : "opacity-0"
                } inline-flex cursor-pointer items-center justify-center rounded-lg bg-gray-300 px-3 text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white`}
                onClick={() => setAddingSkill(true)}
              >
                +
              </span>
            )}
          </div>
          <div className={"flex-grow"}></div>
          <div className="content h-40 rounded-b-xl bg-blue p-5">
            <h2 className="text-2xl font-bold text-white">{"</>"} Languages</h2>
          </div>
        </div>
        <>
          {userData.services.map((service, index) => {
            return (
              <ServiceCard
                key={index}
                imageUrl={
                  ServiceData[service.toUpperCase().replaceAll(" ", "_")]?.image
                }
                setUserData={setUserData}
                userData={userData}
                title={service}
                description={
                  ServiceData[service.toUpperCase().replaceAll(" ", "_")]
                    ?.description
                }
              />
            );
          })}
          {userData.services.length < 4 &&
            (() => {
              const cardCount = 4 - userData.services.length;
              return (
                <>
                  {Array.from({ length: cardCount }).map((_, i) => (
                    <AddServiceCard
                      key={i}
                      setUserData={setUserData}
                      userData={userData}
                    />
                  ))}
                </>
              );
            })()}
        </>
        <div className="card mb-5 flex max-w-[400px] flex-col rounded-2xl bg-yellow-400 shadow-customHover transition-all">
          <img
            className="mx-auto mt-20 w-32"
            src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633759c572fde20672b6748b_get-in-touch-image-paperfolio-webflow-template.svg"
            alt="email"
          />
          <Link
            to={`${preview ? "/preview" : ""}/contact`}
            className="mx-5 mb-5 mt-20 rounded-xl bg-black py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SkillSection;
