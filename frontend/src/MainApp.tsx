import React, { useEffect, useState } from "react";
import Header from "Components/Header/Header.tsx";
import { Route, Routes } from "react-router-dom";
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

const MainApp: React.FC = () => {
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

  console.log(contactData);

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<Setup userData={userData} />} />
        <Route
          path="/dashboard"
          element={<Dashboard userData={userData} pageData={homeData} />}
        />
        <Route
          path="/contact"
          element={<Contact userData={userData} pageData={contactData} />}
        />
        <Route
          path="/about"
          element={<About userData={userData} pageData={aboutData} />}
        />
      </Routes>
    </>
  );
};

export default MainApp;
