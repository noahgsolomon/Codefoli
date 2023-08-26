import { Dispatch, FC, SetStateAction } from "react";
import Footer from "Components/Footer/Footer.tsx";
import HomeData from "Type/HomeData.tsx";
import UserData from "Type/UserData.tsx";
import DashboardSections from "./DashboardSections.tsx";
import DashboardMain from "./DashboardMain.tsx";
import ModeButtons from "Components/ModeButtons/ModeButtons.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const Dashboard: FC<{
  pageData: HomeData;
  setPageData: Dispatch<SetStateAction<HomeData>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  downloaded: { bool: boolean; message: string };
  setDownloaded: (downloaded: { bool: boolean; message: string }) => void;
}> = ({
  pageData,
  userData,
  setPageData,
  setUserData,
  deployed,
  setDeploying,
  setDeployed,
  deploying,
  downloaded,
  setDownloaded,
}) => {
  return (
    <>
      <DashboardMain pageData={pageData} setPageData={setPageData} />
      <DashboardSections
        userData={userData}
        setUserData={setUserData}
        pageData={pageData}
        setPageData={setPageData}
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
export default Dashboard;
