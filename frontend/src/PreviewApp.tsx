import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeP from "./preview/pages/Home/HomeP.tsx";
import ContactP from "./preview/pages/Contact/ContactP.tsx";
import ProjectsP from "./preview/pages/Projects/ProjectsP.tsx";
import AboutP from "./preview/pages/About/AboutP.tsx";
import HeaderP from "./preview/common/Components/Header/HeaderP.tsx";
import UserData from "Type/UserData.tsx";
import { authenticated } from "api/authenticateapi.tsx";
import { getHome, userDetails } from "api/userapi.tsx";
import HomeData from "Type/HomeData.tsx";

const PreviewApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    company: "",
    location: "",
    profession: "",
    projects: [],
    skills: [],
    work: [],
    role: "NEWBIE",
    about: "",
    services: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeData>({
    headerOne: "",
    descriptionOne: "",
    headerTwo: "",
    profileImage: "",
  });

  useEffect(() => {
    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
      if (fetchState) {
        const homeFetch = await getHome();
        if (homeFetch) {
          setHomeData(homeFetch);
        }
        const user: UserData = await userDetails();
        setUserData(user);
        localStorage.setItem("role", user.role);
      } else {
        localStorage.removeItem("role");
      }
      setLoading(false);
    };
    authenticatedCheck();
  }, []);

  return (
    <>
      <HeaderP />
      <Routes>
        <Route
          path="/"
          element={
            <HomeP pageData={homeData} userData={userData} loading={loading} />
          }
        />
        <Route
          path="/contact"
          element={<ContactP userData={userData} loading={loading} />}
        />
        <Route path="/projects" element={<ProjectsP />} />
        <Route
          path="/about"
          element={<AboutP userData={userData} loading={loading} />}
        />
      </Routes>
    </>
  );
};

export default PreviewApp;
