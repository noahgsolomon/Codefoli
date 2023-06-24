import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeP from "./preview/pages/Home/HomeP.tsx";
import ContactP from "./preview/pages/Contact/ContactP.tsx";
import ProjectsP from "./preview/pages/Projects/ProjectsP.tsx";
import AboutP from "./preview/pages/About/AboutP.tsx";
import HeaderP from "./preview/common/Components/Header/HeaderP.tsx";
import UserData from "Type/UserData.tsx";
import { authenticated } from "api/authenticateapi.tsx";
import { getAbout, getContact, getHome, userDetails } from "api/userapi.tsx";
import HomeData from "Type/HomeData.tsx";
import AboutData from "Type/AboutData.tsx";
import Loader from "Components/Loader/Loader.tsx";
import ContactData from "Type/ContactData.tsx";

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

  const [aboutData, setAboutData] = useState<AboutData>({
    headerOne: "",
    iconOne: "",
    iconTwo: "",
    headerTwo: "",
    iconThree: "",
    descriptionOne: "",
    headerThree: "",
    descriptionTwo: "",
    bulletOne: "",
    bulletTwo: "",
    bulletThree: "",
    imageOne: "",
    headerFour: "",
    headerFive: "",
    descriptionThree: "",
    values: [{ value: "", description: "" }],
  });

  const [contactData, setContactData] = useState<ContactData>({
    headerOne: "",
    descriptionOne: "",
    email: "",
    phone: "",
    headerTwo: "",
    descriptionTwo: "",
    faq: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  useEffect(() => {
    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
      if (fetchState) {
        const homeFetch = await getHome();
        if (homeFetch) {
          setHomeData(homeFetch);
        }
        const aboutFetch = await getAbout();
        if (aboutFetch) {
          setAboutData(aboutFetch);
        }
        const contactFetch = await getContact();
        if (contactFetch) {
          setContactData(contactFetch);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeaderP />
      <Routes>
        <Route
          path="/"
          element={<HomeP pageData={homeData} userData={userData} />}
        />
        <Route
          path="/contact"
          element={<ContactP userData={userData} pageData={contactData} />}
        />
        <Route path="/projects" element={<ProjectsP />} />
        <Route
          path="/about"
          element={<AboutP userData={userData} pageData={aboutData} />}
        />
      </Routes>
    </>
  );
};

export default PreviewApp;
