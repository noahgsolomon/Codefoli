import React, { SetStateAction, useRef, useState } from "react";
import JobCard from "Components/Sections/Resume/JobCard/JobCard.tsx";
import UserData from "Type/UserData.tsx";
import PageType from "Type/Pages.tsx";
import { ResumeType } from "Type/Section.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";
import { updateHeaderOneResume } from "Components/Sections/Resume/resumeapi.tsx";

const ResumeSection: React.FC<{
  page: PageType;
  details: ResumeType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
  userData: UserData;
  setUserData: React.Dispatch<SetStateAction<UserData>>;
  order: number;
}> = ({ page, details, setPageData, userData, order, setUserData }) => {
  const [resumeSectionHover, setResumeSectionHover] = useState<boolean>(false);
  const [removeResumeSection, setRemoveResumeSection] =
    useState<boolean>(false);
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.headerOne
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneResume(headerOneEditValue);
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "RESUME"
            ? {
                ...section,
                details: { ...section.details, headerOne: headerOneEditValue },
              }
            : section
        ),
      }));
      setHeaderOneEditValue(updateHeader.data);
    }
    setHeaderOneEdit(false);
  };

  return (
    <section
      className="resume relative mb-20 mt-20"
      onMouseEnter={() => setResumeSectionHover(true)}
      onMouseLeave={() => setResumeSectionHover(false)}
    >
      {removeResumeSection && (
        <div
          className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          resumeSectionHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveResumeSection(true)}
        onMouseLeave={() => setRemoveResumeSection(false)}
        onClick={async () => {
          const remove = await removeSection(page, "RESUME", order);
          if (remove) {
            setPageData((prev) => {
              const removedSection = prev.sections.find(
                (section) => section.type === "RESUME"
              );
              if (!removedSection) {
                return prev;
              }
              const removedOrder = removedSection.details.order;
              const updatedSections = prev.sections
                .filter((section) => section.type !== "RESUME")
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
      <div className="container mx-auto max-w-screen-lg px-5">
        {headerOneEdit ? (
          <textarea
            ref={headerOneTextareaRef}
            value={headerOneEditValue}
            onChange={(e) => setHeaderOneEditValue(e.target.value)}
            onBlur={() => {
              setHeaderOneEditValue(details.headerOne);
              setHeaderOneEdit(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handleHeaderOneSubmit();
              }
            }}
            className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-3xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            maxLength={50}
          />
        ) : (
          <h2
            className="mb-8 text-center text-3xl font-bold transition-all hover:opacity-50 "
            onClick={() => setHeaderOneEdit(true)}
          >
            {details.headerOne}
          </h2>
        )}
        <div className="resume-events">
          {userData.work.map((job, index) => (
            <JobCard
              key={job.id}
              id={job.id}
              companyTitle={job.company}
              role={job.position}
              description={job.description}
              duration={job.startDate + " - " + job.endDate}
              active={index === 0}
              setUserData={setUserData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
