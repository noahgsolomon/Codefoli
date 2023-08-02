import React, { SetStateAction } from "react";
import Footer from "Components/Footer/Footer.tsx";
import HomeData from "Type/HomeData.tsx";
import UserData from "Type/UserData.tsx";
import DashboardSections from "./DashboardSections.tsx";
import DashboardMain from "./DashboardMain.tsx";

const Dashboard: React.FC<{
  pageData: HomeData;
  setPageData: React.Dispatch<SetStateAction<HomeData>>;
  userData: UserData;
  setUserData: React.Dispatch<SetStateAction<UserData>>;
}> = ({ pageData, userData, setPageData, setUserData }) => {
  return (
    <>
      <DashboardMain pageData={pageData} setPageData={setPageData} />
      <DashboardSections
        userData={userData}
        setUserData={setUserData}
        pageData={pageData}
        setPageData={setPageData}
      />
      <Footer />
    </>
  );
};
export default Dashboard;
