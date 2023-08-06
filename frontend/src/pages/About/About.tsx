import Footer from "Components/Footer/Footer";
import React from "react";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";
import AboutSections from "./AboutSections.tsx";
import AboutMain from "./AboutMain.tsx";
import ModeButtons from "Components/ModeButtons/ModeButtons.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const About: React.FC<{
  userData: UserData;
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({
  userData,
  pageData,
  setPageData,
  setUserData,
  deployed,
  setDeployed,
  deploying,
  setDeploying,
}) => {
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
      <ModeButtons
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
      <Footer />
    </>
  );
};

export default About;
