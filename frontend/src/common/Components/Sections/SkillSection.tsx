import React, {useEffect, useState} from "react";
import Card from "Components/Card/Card.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import { Link } from "react-router-dom";
import { COLORS } from "../../../util/colors.ts";
import {SkillType} from "Type/Section.tsx";

const SkillSection: React.FC<{
  userData: UserData;
  details: SkillType
  preview: boolean;
}> = ({ userData, details, preview }) => {

    const [languageHover, setLanguageHover] = useState<boolean>(false);
    const [skillColors, setSkillColors] = useState<string[]>([]);

    useEffect(() => {
        const colors = userData?.skills.map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
        setSkillColors(colors);
    }, [userData?.skills]);


  return (
      <div className="mt-20 mb-20">
          <h2
              className="text-2xl font-bold hover:opacity-50 transition-all text-center mb-10 leading-relaxed cursor-pointer select-none"
          >
              {details.headerOne}
          </h2>
          <div className="mx-10 grid gap-4 md:grid-cols-2 2xl:mx-80 lg:grid-cols-3 justify-center">
              <div className="card relative mb-5 flex max-w-[400px] flex-col rounded-2xl border-2 border-black bg-white shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
                   onMouseEnter={() => {
                       if (preview) {
                           return;
                       }
                       setLanguageHover(true);
                   }}
                   onMouseLeave={() => {
                       if (preview){
                           return;
                       }
                       setLanguageHover(false);
                   }}
              >
                  <button className={`${languageHover ? 'opacity-100' : 'opacity-0'} absolute -top-4 -right-4 bg-white border-2 border-red-500 rounded-lg px-3 py-1 text-red-500 transition-all hover:-translate-y-0.5`}>x</button>
                  <div style={{marginBottom: (12 - userData.skills.length)*25 + 'px'}} className={`mt-5 flex flex-wrap gap-2 min-h-64 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2`}>
                      {userData?.skills.map((skill, index) => {
                          return (
                              <span
                                  key={index}
                                  className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
                                      skillColors[index]
                                  } ${!preview ? 'hover:bg-red-500 hover:line-through' : ''} py-2 text-sm`}
                              >
                {skill.replaceAll("_", " ")}
              </span>
                          );
                      })}
                      <span
                          className={`${languageHover ? 'opacity-100' : 'opacity-0'} bg-gray-300 inline-flex cursor-pointer items-center justify-center rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white`}
                      >+</span>
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
                      to={`${preview ? '/preview' : ''}/contact`}
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
