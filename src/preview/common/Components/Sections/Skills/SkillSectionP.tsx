import { FC } from "react";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import { Link } from "react-router-dom";
import { SkillType } from "Type/Section.tsx";
import { COLORS } from "../../../../../util/colors.ts";
import ServiceCardP from "./ServiceCardP.tsx";

const SkillSectionP: FC<{
  userData: UserData;
  details: SkillType;
}> = ({ userData, details }) => {
  return (
    <div className="relative mb-20 mt-20">
      <h2 className="mb-10 text-center text-2xl font-bold leading-relaxed transition-all">
        {details.header_one}
      </h2>
      <div className="mx-10 grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:mx-80">
        <div className="card relative mb-5 flex max-w-[400px] flex-col rounded-2xl border-2 border-black bg-white shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover dark:bg-[#1a1a1a]">
          <div
            className="min-h-64 flex flex-wrap gap-2 rounded-tl-2xl rounded-tr-2xl px-2 py-2"
          >
            {userData?.skills.map((skill, index) => {
              return (
                <span
                  key={index}
                  className={`inline-flex items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[index]} py-2 text-sm`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
          <div className={"h-[200px] md:flex-grow"}></div>
          <div className="h-40 rounded-b-xl bg-blue-500 p-5">
            <h2 className="text-2xl font-bold text-white">{"</>"} Languages</h2>
          </div>
        </div>
        <>
          {userData.services.map((service, index) => {
            return (
              <ServiceCardP
                key={index}
                imageUrl={
                  ServiceData[service.toUpperCase().replaceAll(" ", "_")].image
                }
                title={service.replaceAll("_", " ")}
                description={
                  ServiceData[service.toUpperCase().replaceAll(" ", "_")]
                    ?.description
                }
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
            to={`/preview/contact`}
            className="mx-5 mb-5 mt-20 rounded-xl bg-black py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SkillSectionP;
