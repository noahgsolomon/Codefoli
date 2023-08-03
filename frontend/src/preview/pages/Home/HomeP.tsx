import {FC} from "react";
import UserData from "Type/UserData.tsx";
import HomeData from "Type/HomeData.tsx";
import HomeMainP from "./HomeMainP.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import SectionsP from "../../common/Components/Sections/SectionsP.tsx";

const HomeP: FC<{
  userData: UserData;
  pageData: HomeData;
}> = ({ userData, pageData }) => {

  return (
      <>
        <HomeMainP pageData={pageData} />
        <SectionsP
            userData={userData}
            pageData={pageData}
        />
        <ModeButtonsP />
      </>
  );
};

export default HomeP;
