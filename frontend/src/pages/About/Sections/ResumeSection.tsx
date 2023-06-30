import React, { useState } from "react";
import { changeSectionThreeActive } from "../aboutapi.tsx";
import JobCard from "../JobCard/JobCard.tsx";
import AboutData from "Type/AboutData.tsx";
import UserData from "Type/UserData.tsx";

const ResumeSection: React.FC<{
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
  userData: UserData;
}> = ({ pageData, setPageData, userData }) => {
  const [sectionThreeHover, setSectionThreeHover] = useState<boolean>(false);
  const [removeSectionThreeHover, setRemoveSectionThreeHover] =
    useState<boolean>(false);

  return (
    <section
      className="resume relative"
      onMouseEnter={() => setSectionThreeHover(true)}
      onMouseLeave={() => setSectionThreeHover(false)}
    >
      {removeSectionThreeHover && (
        <div
          className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          sectionThreeHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveSectionThreeHover(true)}
        onMouseLeave={() => setRemoveSectionThreeHover(false)}
        onClick={async () => {
          const changeSectionThree = await changeSectionThreeActive("true");
          if (changeSectionThree) {
            setPageData((prev) => ({
              ...prev,
              sectionThreeActive: false,
            }));
          }
          setRemoveSectionThreeHover(false);
        }}
      >
        -
      </button>
      <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {pageData.headerFour}
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
