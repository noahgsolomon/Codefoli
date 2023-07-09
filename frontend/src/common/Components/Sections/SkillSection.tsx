import React, { useEffect, useState } from "react";
import Card from "Components/Card/Card.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import { Link } from "react-router-dom";
import { COLORS } from "../../../util/colors.ts";
import { SkillType } from "Type/Section.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import PageType from "Type/Pages.tsx";

const SkillSection: React.FC<{
  userData: UserData;
  setPageData: React.Dispatch<React.SetStateAction<AnyPageData>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
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
  const [skillColors, setSkillColors] = useState<string[]>([]);
  const [skillHover, setSkillHover] = useState<boolean>(false);
  const [removeSkill, setRemoveSkill] = useState<boolean>(false);
  const [removeLanguagesHover, setRemoveLanguagesHover] =
    useState<boolean>(false);

  useEffect(() => {
    const colors = userData?.skills.map(
      () => COLORS[Math.floor(Math.random() * COLORS.length)]
    );
    setSkillColors(colors);
  }, [userData?.skills]);

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
        onClick={async () => {
          const remove = await removeSection(page, "SKILL", order);
          if (remove) {
            setPageData((prev) => {
              const removedSection = prev.sections.find(
                (section) => section.type === "SKILL"
              );
              if (!removedSection) {
                return prev;
              }
              const removedOrder = removedSection.details.order;
              const updatedSections = prev.sections
                .filter((section) => section.type !== "SKILL")
                .map((section) => {
                  if (section.details.order > removedOrder) {
                    return {
                      ...section,
                      details: {
                        ...section.details,
                        order: section.details.order - 1,
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
        }}
      >
        -
      </button>
      <h2 className="mb-10 cursor-pointer select-none text-center text-2xl font-bold leading-relaxed transition-all hover:opacity-50">
        {details.headerOne}
      </h2>
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
            className={`absolute inset-0 bg-red-500 ${
              removeLanguagesHover ? "opacity-20" : "hidden"
            }`}
          />
          <button
            className={`${
              languageHover ? "opacity-100" : "opacity-0"
            } absolute -right-3 -top-3 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
            onMouseEnter={() => setRemoveLanguagesHover(true)}
            onMouseLeave={() => setRemoveLanguagesHover(false)}
          >
            -
          </button>
          <div
            style={{ marginBottom: (12 - userData.skills.length) * 25 + "px" }}
            className={`min-h-64 mt-5 flex flex-wrap gap-2 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2`}
          >
            {userData?.skills.map((skill, index) => {
              return (
                <span
                  key={index}
                  className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
                    skillColors[index]
                  } ${
                    !preview ? "hover:bg-red-500 hover:line-through" : ""
                  } py-2 text-sm`}
                >
                  {skill.replaceAll("_", " ")}
                </span>
              );
            })}
            <span
              className={`${
                languageHover && !removeLanguagesHover
                  ? "opacity-100"
                  : "opacity-0"
              } inline-flex cursor-pointer items-center justify-center rounded-lg bg-gray-300 px-3 text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white`}
            >
              +
            </span>
          </div>
          <div className="content flex-grow rounded-b-2xl bg-blue p-5">
            <h2 className="text-2xl font-bold text-white">{"</>"} Languages</h2>
          </div>
        </div>
        <>
          {userData.services.map((service, index) => {
            return (
              <Card
                key={index}
                imageUrl={ServiceData[service]?.image}
                setUserData={setUserData}
                userData={userData}
                title={service.replaceAll("_", " ")}
                description={ServiceData[service]?.description}
                preview={preview}
              />
            );
          })}
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
