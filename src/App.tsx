import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import './App.css';
import Header from "./common/Components/Header/Header.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
const App: React.FC = () => {

  return (

      <BrowserRouter>
          <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
