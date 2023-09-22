import React, { useEffect, useState } from "react";
import Header from "Components/Header/Header.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import { authenticated } from "api/authenticateapi.tsx";
import {
  userDetails,
} from "api/userapi.tsx";
import Loader from "Components/Loader/Loader.tsx";
import Github from "Components/Github/Github.tsx";
import NotFound from "./NotFound.tsx";
import {
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_REFRESH_KEY,
  LOCALSTORAGE_ROLE_KEY,
} from "./util/constants";
import Themes from "./theme/Themes.tsx";
import {STAGE} from "./config.ts";

const MainApp: React.FC = () => {
  const navigate = useNavigate();

  const [authenticatedUser, setAuthenticatedUser] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [themes, setThemes] = useState<{
    theme: string,
    header: string,
    about: string,
    image: string
  }[]>([]);

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
          if (window.location.pathname !== "/home") {
            navigate("/home");
          }
          setAuthenticatedUser(true);
        } else {
          setAuthenticatedUser(true);

          const path = window.location.pathname;
          if (
            path === "/" ||
            path === "/login" ||
            path === "/register"
          ) {
            navigate("/home");
          }
        }
      } else {
        const path = window.location.pathname;
        if (path !== "/login" && path !== "/register" && path !== "/") {
          localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
          navigate("/login");
        }
      }
      const themesFetch = async () => {
        try {
          const response = await fetch(
              `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/themes`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
                },
              }
          );

          const responseJson = await response.json();

          if (responseJson.status === "OK") {
            console.log(responseJson);
            setThemes(responseJson.data);
            return responseJson;
          } else {
            return responseJson;
          }
        } catch (e) {
          console.log(e);
        }
      }

      await themesFetch();
      setLoading(false);
    };

    authenticatedCheck().then();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Github />
      <Header authenticated={authenticatedUser} />
      <Routes>
        <Route path="/home" element={<Themes themes={themes}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainApp;
