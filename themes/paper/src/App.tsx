import { FC, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MainApp from "./MainApp.tsx";
import PreviewApp from "./PreviewApp.tsx";
import {
  LOCALSTORAGE_THEME_KEY,
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
} from "./util/constants";
import Newsletter from "./pages/Newsletter/Newsletter.tsx";
import Origin from "./Origin.tsx";
import Analytics from "./Analytics.tsx";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/preview/*" element={<PreviewApp />} />
        <Route path="/*" element={<MainApp />} />
        <Route path={"/newsletter"} element={<Newsletter />} />
        <Route path={"/origin"} element={<Origin />} />
        <Route path={"/analytics"} element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
