import React, { SetStateAction, useState } from "react";
import JobCard from "../../../pages/About/JobCard/JobCard.tsx";
import UserData from "Type/UserData.tsx";
import PageType from "Type/Pages.tsx";
import { ResumeType } from "Type/Section.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";

const ResumeSection: React.FC<{
  page: PageType;
  details: ResumeType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
  userData: UserData;
}> = ({ page, details, setPageData, userData }) => {
  const [resumeSectionHover, setResumeSectionHover] = useState<boolean>(false);
  const [removeResumeSection, setRemoveResumeSection] =
    useState<boolean>(false);

  return (
    <section
      className="resume relative"
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
          const remove = await removeSection(page, "RESUME");
          if (remove) {
            setPageData((prev) => ({
              ...prev,
              sections: prev.sections.filter(
                (section) => section.type !== "RESUME"
              ),
            }));
          }
        }}
      >
        -
      </button>
      <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {details.headerOne}
        </h2>
        <div className="resume-events">
          {userData.work.map((job, index) => (
            <JobCard
              key={index}
              companyTitle={job.company}
              role={job.position}
              description={job.description}
              duration={job.startDate + " - " + job.endDate}
              active={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
