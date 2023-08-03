import Footer from "Components/Footer/Footer";
import React from "react";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";
import AboutSections from "./AboutSections.tsx";
import AboutMain from "./AboutMain.tsx";
import ModeButtons from "Components/ModeButtons/ModeButtons.tsx";

const About: React.FC<{
  userData: UserData;
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}> = ({ userData, pageData, setPageData, setUserData }) => {
  return (
    <>
      <main>
        <AboutMain
          pageData={pageData}
          setPageData={setPageData}
          userData={userData}
        />
        <AboutSections
          pageData={pageData}
          setPageData={setPageData}
          userData={userData}
          setUserData={setUserData}
        />
      </main>
      <ModeButtons />
      <Footer />
    </>
  );
};

export default About;
