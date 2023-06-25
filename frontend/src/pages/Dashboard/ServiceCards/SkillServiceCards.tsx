import React, { useMemo } from "react";
import Card from "Components/Card/Card.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import { Link } from "react-router-dom";
import { COLORS } from "../../../util/constants";

const SkillServiceCards: React.FC<{
  services: string[];
  userData: UserData;
  preview: boolean;
}> = ({ services, userData, preview }) => {
  const colors = useMemo(
    () => COLORS,
    []
  );

  return (
    <div className="mx-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card mb-5 flex max-w-[400px] flex-col rounded-2xl border-2 border-black bg-white shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover">
        <div style={{marginBottom: (12 - userData.skills.length)*25 + 'px'}} className={`mt-5 flex flex-wrap gap-2 min-h-64 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2`}>
          {userData?.skills.map((skill, index) => {
            return (
              <span
                key={index}
                className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
                  colors[Math.floor(Math.random() * colors.length)]
                } py-2 text-sm`}
              >
                {skill.replaceAll("_", " ")}
              </span>
            );
          })}
        </div>
        <div className="content flex-grow rounded-b-2xl bg-blue p-5">
          <h2 className="text-2xl font-bold text-white">{"</>"} Languages</h2>
        </div>
      </div>
      <>
        {services.map((service, index) => {
          return (
            <Card
              key={index}
              imageUrl={ServiceData[service]?.image}
              title={service.replaceAll("_", " ")}
              description={ServiceData[service]?.description}
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
          to={`${preview ? '/preview' : ''}/contact`}
          className="mx-5 mb-5 mt-20 rounded-xl bg-black py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
};
export default SkillServiceCards;
