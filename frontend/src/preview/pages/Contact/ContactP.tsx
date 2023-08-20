import { FC, useEffect } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import SectionsP from "../../common/Components/Sections/SectionsP.tsx";
import ContactMainP from "./ContactMainP.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const ContactP: FC<{
  setDownloaded: (downloaded: {bool: boolean, message: string}) => void;
  downloaded: {bool: boolean, message: string};
  pageData: ContactData;
  userData: UserData;
  setUserData: (userData: UserData) => void;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({
    downloaded,
    setDownloaded,
  pageData,
  userData,
  setUserData,
  deployed,
  setDeployed,
  setDeploying,
  deploying,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ContactMainP pageData={pageData} userData={userData} />
      <SectionsP userData={userData} pageData={pageData} />
      <ModeButtonsP
        setDownloaded={setDownloaded}
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
      {downloaded.bool && (<StatusBar message={downloaded.message} color={'bg-green-500'}/>)}
    </>
  );
};

export default ContactP;
