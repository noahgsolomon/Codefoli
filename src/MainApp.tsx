import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Waitlist from "./pages/Waitlist/Waitlist.tsx";
import { FC, useEffect, useState } from "react";
import NotFound from "./NotFound.tsx";
import Register2 from "./pages/Register/Register2.tsx";
import Login2 from "./pages/Login/Login2.tsx";
import { STAGE } from "./config";
import {
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_ROLE_KEY,
} from "./util/constants.ts";
import { authenticated } from "./util/api/authenticateapi.tsx";
import Themes from "./theme/Themes.tsx";
import Loader from "Components/Loader/Loader.tsx";

const MainApp: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [themes, setThemes] = useState<
    {
      theme: string;
      header: string;
      about: string;
      image: string;
      domain: string;
      last_accessed: string;
      deployed: boolean;
    }[]
  >([]);

  useEffect(() => {
    const themesFetch = async () => {
      try {
        const response = await fetch(
          `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/themes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
            },
          }
        );

        const responseJson = await response.json();

        if (responseJson.status === "OK") {
          setThemes(responseJson.data);
          return responseJson;
        } else {
          return responseJson;
        }
      } catch (e) {
        console.log(e);
      }
    };

    const authenticatedCheck = async () => {
      const fetchState = await authenticated();
      if (fetchState.status === "OK") {
        if (fetchState.data !== null) {
          localStorage.setItem(LOCALSTORAGE_ID_KEY, fetchState.data.idToken);
        }
        await themesFetch();
        navigate("/home");
      } else {
        const path = window.location.pathname;
        if (path !== "/login" && path !== "/register" && path !== "/") {
          localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
          navigate("/login");
        }
      }
      setLoading(false);
    };

    authenticatedCheck().then();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/home" element={<Themes themes={themes} />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainApp;
