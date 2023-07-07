import React, { useEffect, useState } from "react";
import Header from "Components/Header/Header.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Setup from "./pages/Setup/Setup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import About from "./pages/About/About.tsx";
import UserData from "Type/UserData.tsx";
import { authenticated } from "api/authenticateapi.tsx";
import { getAbout, getContact, getHome, userDetails } from "api/userapi.tsx";
import HomeData from "Type/HomeData.tsx";
import AboutData from "Type/AboutData.tsx";
import Loader from "Components/Loader/Loader.tsx";
import ContactData from "Type/ContactData.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import Project from "./pages/Project/Project.tsx";

const MainApp: React.FC = () => {
  const navigate = useNavigate();

  const [authenticatedUser, setAuthenticatedUser] = useState<boolean>(false);

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
    sections: [],
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    headerOne: "",
    iconOne: "",
    iconTwo: "",
    headerTwo: "",
    iconThree: "",
    descriptionOne: "",
    sections: [],
  });

  const [contactData, setContactData] = useState<ContactData>({
    headerOne: "",
    descriptionOne: "",
    email: "",
    phone: "",
    sections: [],
  });

  useEffect(() => {
    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
      console.log(fetchState);
      if (fetchState) {
        const user: UserData = await userDetails();
        if (user.role === "NEWBIE") {
          if (window.location.pathname !== "/setup") {
            navigate("/setup");
          }
          localStorage.setItem("role", user.role);
          setAuthenticatedUser(true);
          setUserData(user);
        } else {
          setAuthenticatedUser(true);
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
          setUserData(user);
          localStorage.setItem("role", user.role);
          const path = window.location.pathname;
          console.log(path);
          if (path === "/" || path === "/login" || path === "/register") {
            navigate("/dashboard");
          }
        }
      } else {
        localStorage.removeItem("role");
        const path = window.location.pathname;
        if (
          path === "/about" ||
          path === "/contact" ||
          path === "/dashboard" ||
          path === "/setup"
        ) {
          navigate("/");
        }
      }
      setLoading(false);
    };
    authenticatedCheck();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  console.log(aboutData);

  return (
    <>
      <Header authenticated={authenticatedUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<Setup userData={userData} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userData={userData}
              pageData={homeData}
              setPageData={setHomeData}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              pageData={contactData}
              userData={userData}
              setPageData={setContactData}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              userData={userData}
              pageData={aboutData}
              setPageData={setAboutData}
            />
          }
        />
        <Route path="/projects" element={<Projects userData={userData} />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
};

export default MainApp;
