import { FC } from "react";
import UserData from "Type/UserData.tsx";
import HomeData from "Type/HomeData.tsx";
import HomeMainP from "./HomeMainP.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import SectionsP from "../../common/Components/Sections/SectionsP.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const HomeP: FC<{
  userData: UserData;
  setUserData: (userData: UserData) => void;
  pageData: HomeData;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({
  userData,
  pageData,
  deployed,
  setDeploying,
  deploying,
  setDeployed,
  setUserData,
}) => {
  return (
    <>
      <HomeMainP pageData={pageData} />
      <SectionsP userData={userData} pageData={pageData} />
      <ModeButtonsP
        deploying={deploying}
        setDeploying={setDeploying}
        setDeployed={setDeployed}
        userData={userData}
        setUserData={setUserData}
      />
      {deploying && (
        <StatusBar
          message="Deploying! plz wait a few minutes..."
          color="bg-green-500"
        />
      )}
      {deployed.bool && (
        <DeploymentBar url={deployed.url} setDeployed={setDeployed} />
      )}
    </>
  );
};

export default HomeP;
