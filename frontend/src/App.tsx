import React, {useEffect, useState} from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import "./App.css";
import Header from "Components/Header/Header.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Setup from "./pages/Setup/Setup.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import {userDetails} from "api/userapi.tsx";
import UserData from "Type/UserData.tsx";
import {authenticated} from "api/authenticateapi.tsx";
import About from "./pages/About/About.tsx";

const App: React.FC = () => {

    const [userData, setUserData] = useState<UserData>({name: "", email: "", company: "", location: "", profession: "", projects: [], skills: [], work: [], role: "NEWBIE", about: ""});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const authenticatedCheck = async () => {
            const fetchState = await authenticated();
            if (fetchState){
                const user:UserData = await userDetails();
                setUserData(user);
                localStorage.setItem("role", user.role);
            } else{
                localStorage.removeItem("role");
            }
            setLoading(false);
        }
        authenticatedCheck();

    }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home loading={loading}/>} />
        <Route path="/login" element={<Login loading={loading}/>} />
        <Route path="/register" element={<Register loading={loading}/>} />
        <Route path="/setup" element={<Setup userData={userData} loading={loading}/>} />
        <Route path="/dashboard" element={<Dashboard  userData={userData} loading={loading}/>} />
        <Route path="/contact" element={<Contact userData={userData} loading={loading} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
