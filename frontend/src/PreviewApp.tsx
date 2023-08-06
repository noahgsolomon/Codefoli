import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
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

const PreviewApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    profession: "",
    website: "",
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
    descriptionTwo: "",
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

  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState<{ url: string; bool: boolean }>({
    url: "",
    bool: false,
  });

  const ProjectOr404 = () => {
    const { slug } = useParams();

    if (slug && userData.slugs.some((s) => s.slug === slug)) {
      return (
        <ProjectP
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
      if (fetchState) {
        const user: UserData = await userDetails();
        setUserData(user);
        localStorage.setItem("role", user.role);
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
          element={
            <HomeP
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
