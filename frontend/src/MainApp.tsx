import React, { useEffect, useState } from "react";
import Header from "Components/Header/Header.tsx";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Setup from "./pages/Setup/Setup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import About from "./pages/About/About.tsx";
import UserData from "Type/UserData.tsx";
import { authenticated } from "api/authenticateapi.tsx";
import {
  getAbout,
  getContact,
  getHome,
  getProjectsPage,
  userDetails,
} from "api/userapi.tsx";
import HomeData from "Type/HomeData.tsx";
import AboutData from "Type/AboutData.tsx";
import Loader from "Components/Loader/Loader.tsx";
import ContactData from "Type/ContactData.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import Project from "./pages/Project/Project.tsx";
import Github from "Components/Github/Github.tsx";
import ProjectsPageData from "Type/ProjectsPageData.tsx";
import NotFound from "./NotFound.tsx";

const MainApp: React.FC = () => {
  const navigate = useNavigate();

  const [authenticatedUser, setAuthenticatedUser] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    profession: "",
    projects: [],
    skills: [],
    work: [],
    role: "NEWBIE",
    about: "",
    services: [],
    slugs: [
      {
        slug: "",
        header: "",
        description: "",
        about: "",
        image: "",
        overview: "",
        platforms: "",
      },
    ],
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
    sections: [],
  });

  const [projectsPageData, setProjectsPageData] = useState<ProjectsPageData>({
    headerOne: "",
    descriptionOne: "",
  });

  useEffect(() => {
    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
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
          const projectsPageFetch = await getProjectsPage();
          if (projectsPageFetch) {
            setProjectsPageData(projectsPageFetch);
          }
          setUserData(user);
          localStorage.setItem("role", user.role);
          const path = window.location.pathname;
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

  console.log(userData);

  const ProjectOr404 = () => {
    const { slug } = useParams();

    if (slug && userData.slugs.some((s) => s.slug === slug)) {
      return <Project userData={userData} setUserData={setUserData} />;
    } else {
      return <NotFound />;
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Github />
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
              setUserData={setUserData}
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
              setUserData={setUserData}
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
              setUserData={setUserData}
              setPageData={setAboutData}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects
              userData={userData}
              pageData={projectsPageData}
              setPageData={setProjectsPageData}
              setUserData={setUserData}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="/:slug" element={<ProjectOr404 />} />
      </Routes>
    </>
  );
};

export default MainApp;
