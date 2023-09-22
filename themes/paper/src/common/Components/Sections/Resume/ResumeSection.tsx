import React, { SetStateAction, useRef, useState } from "react";
import JobCard from "Components/Sections/Resume/JobCard/JobCard.tsx";
import UserData from "Type/UserData.tsx";
import PageType from "Type/Pages.tsx";
import { ResumeType } from "Type/Section.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import AddJobCard from "Components/Sections/Resume/JobCard/AddJobCard.tsx";
import { updateText } from "api/updatetext.tsx";

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
    details.header_one
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleHeaderOneSubmit = async () => {
    if (headerOneEditValue.length === 0) {
      setHeaderOneEdit(false);
      setHeaderOneEditValue(details.header_one);
      return;
    }
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "resume_section"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "RESUME"
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

  return (
    <section
      className="resume relative mb-20 mt-20"
      onMouseEnter={() => setResumeSectionHover(true)}
      onMouseLeave={() => setResumeSectionHover(false)}
    >
      {removeResumeSection && (
        <div
          className={`absolute right-0 top-0 z-10 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          resumeSectionHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveResumeSection(true)}
        onMouseLeave={() => setRemoveResumeSection(false)}
        onClick={async () => {
          const remove = await addRemoveSection(
            page,
            "RESUME",
            order,
            "remove"
          );
          if (remove.status === "OK") {
            setPageData((prev) => {
              const removedSection = prev.sections.find(
                (section) => section.type === "RESUME"
              );
              if (!removedSection) {
                return prev;
              }
              const removedOrder = removedSection.details.page_order;
              const updatedSections = prev.sections
                .filter((section) => section.type !== "RESUME")
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
              setHeaderOneEditValue(details.header_one);
              setHeaderOneEdit(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleHeaderOneSubmit();
              }
            }}
            className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-3xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onFocus={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
              e.currentTarget.select();
            }}
            maxLength={50}
          />
        ) : (
          <h2
            className="mb-8 text-center text-3xl font-bold transition-all hover:cursor-pointer hover:opacity-50 "
            onClick={() => setHeaderOneEdit(true)}
          >
            {details.header_one}
          </h2>
        )}
        <div className="resume-events">
          {userData.work
            .sort((a, b) => a.order_id - b.order_id)
            .map((job, index) => (
              <JobCard
                key={job.id}
                id={job.id}
                image={job.image}
                companyTitle={job.company}
                role={job.position}
                description={job.description}
                startDate={job.start_date}
                endDate={job.end_date}
                active={index === 0}
                orderId={job.order_id}
                setUserData={setUserData}
                userData={userData}
              />
            ))}
          {userData.work.length < 8 && (
            <AddJobCard
              setUserData={setUserData}
              orderId={userData.work.length + 1}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
