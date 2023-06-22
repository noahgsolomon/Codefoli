import React from "react";
import {Route, Routes} from "react-router-dom";
import HomeP from "./preview/pages/Home/HomeP.tsx";
import ContactP from "./preview/pages/Contact/ContactP.tsx";
import ProjectsP from "./preview/pages/Projects/ProjectsP.tsx";
import AboutP from "./preview/pages/About/AboutP.tsx";

const PreviewApp: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeP/>} />
            <Route path="/contact" element={<ContactP/>}/>
            <Route path="/projects" element={<ProjectsP/>}/>
            <Route path="/about" element={<AboutP/>}/>
        </Routes>
    );
};

export default PreviewApp;