import { FC } from "react";
import UserData from "Type/UserData.tsx";
import { ResumeType } from "Type/Section.tsx";
import JobCardP from "./JobCard/JobCardP.tsx";

const ResumeSectionP: FC<{
  details: ResumeType;
  userData: UserData;
}> = ({ details, userData }) => {
  return (
    <section className="relative mb-20 mt-20">
      <div className="container mx-auto max-w-screen-lg px-5">
        <h2 className="mb-8 text-center text-3xl font-bold transition-all">
          {details.header_one}
        </h2>
        <div>
          {userData.work
            .sort((a, b) => a.order_id - b.order_id)
            .map((job, index) => (
              <JobCardP
                key={job.id}
                image={job.image}
                companyTitle={job.company}
                role={job.position}
                description={job.description}
                startDate={job.start_date}
                endDate={job.end_date}
                active={index === 0}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSectionP;
