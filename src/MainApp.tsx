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
import { LOCALSTORAGE_ID_KEY, LOCALSTORAGE_REFRESH_KEY, LOCALSTORAGE_ROLE_KEY } from "./util/constants";

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
    website: "",
    cname_name: '',
    cname_value: '',
    distribution: '',
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
        link: "",
      },
    ],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeData>({
    header_one: "",
    description_one: "",
    header_two: "",
    profile_image: "",
    sections: [],
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    header_one: "",
    icon_one: "",
    icon_two: "",
    header_two: "",
    icon_three: "",
    description_one: "",
    description_two: "",
    sections: [],
  });

  const [contactData, setContactData] = useState<ContactData>({
    header_one: "",
    description_one: "",
    sections: [],
  });

  const [projectsPageData, setProjectsPageData] = useState<ProjectsPageData>({
    header_one: "",
    description_one: "",
  });

  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState<{ url: string; bool: boolean }>({
    url: "",
    bool: false,
  });
  const [downloaded, setDownloaded] = useState<{
    message: string;
    bool: boolean;
  }>({ message: "", bool: false });

  useEffect(() => {
    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
      if (fetchState.status === "OK") {
        if (fetchState.data !== null) {
          localStorage.setItem(LOCALSTORAGE_ID_KEY, fetchState.data.idToken);
        }
        const user = await userDetails();
        if (user.status === "ERROR") {
          localStorage.removeItem(LOCALSTORAGE_ID_KEY);
          localStorage.removeItem(LOCALSTORAGE_REFRESH_KEY);
          window.location.href = "/login";
        }
        if (user.data.role === "NEWBIE") {
          if (window.location.pathname !== "/setup") {
            navigate("/setup");
          }
          setAuthenticatedUser(true);
          setUserData(user);
        } else {
          setAuthenticatedUser(true);

          const [homeFetch, aboutFetch, contactFetch, projectsPageFetch] =
            await Promise.all([
              getHome(),
              getAbout(),
              getContact(),
              getProjectsPage(),
            ]);

          if (homeFetch) {
            setHomeData(homeFetch);
          }
          if (aboutFetch) {
            setAboutData(aboutFetch);
          }
          if (contactFetch) {
            setContactData(contactFetch);
          }
          if (projectsPageFetch) {
            setProjectsPageData(projectsPageFetch);
          }
          setUserData(user.data);
          const path = window.location.pathname;
          if (path === "/" || path === "/login" || path === "/register") {
            navigate("/dashboard");
          }
        }
      } else {
        const path = window.location.pathname;
        if (path !== "/login" && path !== "/register" && path !== "/") {
          localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
          navigate("/login");
        }
      }
      setLoading(false);
    };
    authenticatedCheck();
  }, []);

  const ProjectOr404 = () => {
    const { slug } = useParams();

    if (slug && userData.slugs.some((s) => s.slug === slug)) {
      return (
        <Project
          userData={userData}
          setUserData={setUserData}
          setDeployed={setDeployed}
          setDeploying={setDeploying}
          deployed={deployed}
          deploying={deploying}
          downloaded={downloaded}
          setDownloaded={setDownloaded}
        />
      );
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
              downloaded={downloaded}
              setDownloaded={setDownloaded}
              setUserData={setUserData}
              userData={userData}
              pageData={homeData}
              setPageData={setHomeData}
              setDeployed={setDeployed}
              setDeploying={setDeploying}
              deployed={deployed}
              deploying={deploying}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              downloaded={downloaded}
              setDownloaded={setDownloaded}
              pageData={contactData}
              userData={userData}
              setUserData={setUserData}
              setPageData={setContactData}
              setDeployed={setDeployed}
              setDeploying={setDeploying}
              deployed={deployed}
              deploying={deploying}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              downloaded={downloaded}
              setDownloaded={setDownloaded}
              userData={userData}
              pageData={aboutData}
              setUserData={setUserData}
              setPageData={setAboutData}
              setDeployed={setDeployed}
              setDeploying={setDeploying}
              deployed={deployed}
              deploying={deploying}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <Projects
              downloaded={downloaded}
              setDownloaded={setDownloaded}
              userData={userData}
              pageData={projectsPageData}
              setPageData={setProjectsPageData}
              setUserData={setUserData}
              setDeployed={setDeployed}
              setDeploying={setDeploying}
              deployed={deployed}
              deploying={deploying}
            />
          }
        />
        <Route path="/:slug" element={<ProjectOr404 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainApp;
