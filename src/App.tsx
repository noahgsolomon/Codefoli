import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MainApp from "./MainApp.tsx";
import PreviewApp from "./PreviewApp.tsx";
import Processing from "./Processing.tsx";
import {
  LOCALSTORAGE_THEME_KEY,
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
} from "./util/constants";
import Verify from "./Verify.tsx";
import Analytics from "./Analytics.tsx";
import Unsubscribing from "./Unsubscribing.tsx";

const App: React.FC = () => {
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
        <Route path="/processing" element={<Processing />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/unsubscribe" element={<Unsubscribing />} />
        {/*<Route path={"/origin"} element={<Origin />}/>*/}
        <Route path={"analytics"} element={<Analytics />} />
        {/*<Route path={"/architecture"} element={<Architecture />}/>*/}
        <Route path="/*" element={<MainApp />} />
        <Route path="/preview/*" element={<PreviewApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
