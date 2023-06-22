import React from "react";
import Card from "Components/Card/Card.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";

const SkillServiceCards: React.FC<{
  services: string[];
  userData: UserData;
}> = ({ services, userData }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full max-w-[400px]  md:max-w-[450px] md:w-[450px] rounded-2xl border-2 border-black bg-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover">
        <div className="rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2">
          {userData?.skills.map((skill, index) => (
            <p key={index} className="text-black">
              &#x2022; {skill.replaceAll("_", " ")}
            </p>
          ))}
        </div>
        <div className="rounded-b-2xl rounded-bl-2xl bg-black px-2 text-center py-5">
          <h1 className="text-white">{"</>"} Languages</h1>
        </div>
      </div>
      <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-center">
        {services.map((service) => {
            return (
              <Card
                imageUrl={ServiceData[service]?.image}
                title={service.replaceAll("_", " ")}
                description={ServiceData[service]?.description}
              />
            );
          })}
      </div>
    </div>
  );
};
export default SkillServiceCards;
