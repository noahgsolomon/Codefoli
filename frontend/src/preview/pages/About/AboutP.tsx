import { FC } from "react";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";
import SectionsP from "../../common/Components/Sections/SectionsP.tsx";
import AboutMainP from "./AboutMainP.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";

const AboutP: FC<{
  userData: UserData;
  pageData: AboutData;
}> = ({ userData, pageData }) => {
  return (
    <>
      <main>
        <AboutMainP pageData={pageData} userData={userData} />
        <SectionsP pageData={pageData} userData={userData} />
      </main>
      <ModeButtonsP />
    </>
  );
};

export default AboutP;
