import Footer from "Components/Footer/Footer";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import ContactSections from "./ContactSections.tsx";
import ContactMain from "./ContactMain.tsx";
import ModeButtons from "Components/ModeButtons/ModeButtons.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const Contact: FC<{
  pageData: ContactData;
  setPageData: Dispatch<SetStateAction<ContactData>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  downloaded: { bool: boolean; message: string };
  setDownloaded: (downloaded: { bool: boolean; message: string }) => void;
}> = ({
  pageData,
  setPageData,
  userData,
  setUserData,
  deployed,
  setDeploying,
  setDeployed,
  deploying,
  downloaded,
  setDownloaded,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ContactMain
        pageData={pageData}
        setPageData={setPageData}
        userData={userData}
        setUserData={setUserData}
      />
      <ContactSections
        pageData={pageData}
        setPageData={setPageData}
        userData={userData}
        setUserData={setUserData}
      />
      <ModeButtons
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
      {downloaded.bool && (
        <StatusBar message={downloaded.message} color={"bg-green-500"} />
      )}
      <Footer />
    </>
  );
};

export default Contact;
