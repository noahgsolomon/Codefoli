import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import HomeP from "./preview/pages/Home/HomeP.tsx";
import HeaderP from "./preview/common/Components/Header/HeaderP.tsx";
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
import ProjectsPageData from "Type/ProjectsPageData.tsx";
import ContactP from "./preview/pages/Contact/ContactP.tsx";
import ProjectsP from "./preview/pages/Projects/ProjectsP.tsx";
import ProjectP from "./preview/pages/Project/ProjectP.tsx";
import AboutP from "./preview/pages/About/AboutP.tsx";
import NotFoundP from "./preview/pages/NotFound/NotFoundP.tsx";
import {
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_REFRESH_KEY,
  LOCALSTORAGE_ROLE_KEY,
} from "./util/constants";

const PreviewApp: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    profession: "",
    verified: false,
    website: "",
    cname_name: "",
    cname_value: "",
    distribution: "",
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
    bool: boolean;
    message: string;
  }>({ bool: false, message: "" });

  const ProjectOr404 = () => {
    const { slug } = useParams();

    if (slug && userData.slugs.some((s) => s.slug === slug)) {
      return (
        <ProjectP
          setDownloaded={setDownloaded}
          downloaded={downloaded}
          userData={userData}
          setUserData={setUserData}
          deploying={deploying}
          deployed={deployed}
          setDeploying={setDeploying}
          setDeployed={setDeployed}
        />
      );
    } else {
      return <NotFoundP />;
    }
  };

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
          setUserData(user);
        } else {
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeaderP />
      <Routes>
        <Route
          path="/"
          element={
            <HomeP
              setDownloaded={setDownloaded}
              downloaded={downloaded}
              pageData={homeData}
              setUserData={setUserData}
              userData={userData}
              deploying={deploying}
              deployed={deployed}
              setDeploying={setDeploying}
              setDeployed={setDeployed}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactP
              setDownloaded={setDownloaded}
              downloaded={downloaded}
              userData={userData}
              setUserData={setUserData}
              pageData={contactData}
              deploying={deploying}
              deployed={deployed}
              setDeploying={setDeploying}
              setDeployed={setDeployed}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProjectsP
              setDownloaded={setDownloaded}
              downloaded={downloaded}
              userData={userData}
              setUserData={setUserData}
              pageData={projectsPageData}
              deploying={deploying}
              deployed={deployed}
              setDeploying={setDeploying}
              setDeployed={setDeployed}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutP
              setDownloaded={setDownloaded}
              downloaded={downloaded}
              userData={userData}
              setUserData={setUserData}
              pageData={aboutData}
              deploying={deploying}
              deployed={deployed}
              setDeploying={setDeploying}
              setDeployed={setDeployed}
            />
          }
        />
        <Route path="/:slug" element={<ProjectOr404 />} />
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </>
  );
};

export default PreviewApp;
