import React, { SetStateAction, useEffect } from "react";
import Footer from "Components/Footer/Footer.tsx";
import { useSpring, animated } from "react-spring";
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
  const [animationProps, setAnimation] = useSpring(() => ({
    opacity: 0,
    transform: "translate3d(0, -20px, 0)",
  }));

  useEffect(() => {
    setAnimation.start({ opacity: 1, transform: "translate3d(0, 0px, 0)" });
  }, [setAnimation]);

  return (
    <>
      <animated.div style={animationProps}>
        <DashboardMain pageData={pageData} setPageData={setPageData} />
        <DashboardSections
          userData={userData}
          setUserData={setUserData}
          pageData={pageData}
          setPageData={setPageData}
        />
      </animated.div>
      <Footer />
    </>
  );
};
export default Dashboard;
