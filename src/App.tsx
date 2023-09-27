import { FC, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MainApp from "./MainApp.tsx";
import Processing from "./Processing.tsx";
import {
  LOCALSTORAGE_THEME_KEY,
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
} from "./util/constants";
import Verify from "./Verify.tsx";
import Unsubscribing from "./Unsubscribing.tsx";

const App: FC = () => {
  useEffect(() => {
    const userTheme = window.localStorage.getItem(LOCALSTORAGE_THEME_KEY);
    const systemTheme = window.matchMedia(
      `(prefers-color-scheme:${DARK_THEME_KEY})`
    ).matches
      ? DARK_THEME_KEY
      : LIGHT_THEME_KEY;
    document.body.classList.add(userTheme || systemTheme);
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, userTheme || systemTheme);
  }, []);

  const RedirectToGitHub: FC = () => {
    useEffect(() => {
      window.location.href = "https://github.com/noahgsolomon/Codefoli";
    }, []);
    return null;
  };

  const RedirectToDiscord: FC = () => {
    useEffect(() => {
      window.location.href = "https://discord.com/invite/JXKx5HwAQK";
    }, []);
    return null;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/processing" element={<Processing />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/unsubscribe" element={<Unsubscribing />} />
        <Route path="/github" element={<RedirectToGitHub />} />
        <Route path="/discord" element={<RedirectToDiscord />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
