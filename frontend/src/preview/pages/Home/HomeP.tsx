import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import SkillServiceCards from "../../../pages/Dashboard/ServiceCards/SkillServiceCards.tsx";
import UserData from "Type/UserData.tsx";
import HomeData from "Type/HomeData.tsx";

const HomeP: React.FC<{
  userData: UserData;
  pageData: HomeData;
}> = ({ userData, pageData }) => {
  const navigate = useNavigate();

  const [animationProps, setAnimation] = useSpring(() => ({
    opacity: 0,
    transform: "translate3d(0, -20px, 0)",
  }));

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/");
    } else if (localStorage.getItem("role") === "NEWBIE") {
      navigate("/setup");
    }

    setAnimation.start({ opacity: 1, transform: "translate3d(0, 0px, 0)" });
  }, [navigate, setAnimation]);

  return (
    <>
      <animated.div style={animationProps}>
        <div className="container mx-auto mb-32 px-6">
          <div className="flex flex-col lg:flex-row xl:mx-auto xl:justify-center">
            <div>
              <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center font-bold xl:mt-32">
                <h1 className="font-extra-bold max-w-[15ch] text-center text-4xl leading-snug text-black md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal">
                  {pageData.headerOne}
                </h1>
                <p className="max-w-[35ch] text-center opacity-60 xl:max-w-[50ch] xl:text-left xl:text-base">
                  {pageData.descriptionOne}
                </p>
              </div>
              <div className="mx-auto mt-5 flex justify-center xl:justify-start">
                <Link
                  to="/preview/contact"
                  className="mr-4 rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500"
                >
                  Get in touch
                </Link>
                <Link
                  to="/preview/portfolio"
                  className="rounded-xl border-2 border-black px-6 py-4 font-bold transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-10 lg:mx-0 xl:ml-20 xl:mt-32">
              <img
                className="rounded-3xl border-4 border-black shadow-customHover"
                src={pageData.profileImage}
                alt="pfp"
              ></img>
            </div>
          </div>
          <div className="mb-10 mt-32 flex flex-col items-center text-2xl font-bold ">
            <p className="mb-10 leading-relaxed">{pageData.headerTwo}</p>
            <SkillServiceCards
              services={userData.services}
              userData={userData}
            />
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default HomeP;
