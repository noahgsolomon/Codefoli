import React, {useEffect} from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MainApp from "./MainApp.tsx";
import PreviewApp from "./PreviewApp.tsx";
import Processing from "./Processing.tsx";

const App: React.FC = () => {

    useEffect(() => {
        const userTheme = window.localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.body.classList.add(userTheme || systemTheme)
        localStorage.setItem('theme', userTheme || systemTheme)
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/processing" element={<Processing />} />
        <Route path="/*" element={<MainApp />} />
        <Route path="/preview/*" element={<PreviewApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
