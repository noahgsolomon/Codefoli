import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const blank = ["/setup"].includes(location.pathname);
  const showButtons = !["/login", "/register", "/"].includes(location.pathname);
  const [loading, setLoading] = useState(true);
  const logoLink = blank ? "/setup" : showButtons ? "/dashboard" : "/";

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <header
      className={`z-40 flex justify-center items-center lg:py-5 lg:px-0 py-3 px-3 relative transition-opacity duration-300 ease-linear ${
        loading ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <div
        className="flex justify-between items-center py-3 bg-white border-2 border-black rounded-xl shadow-custom px-4 mx-auto lg:w-full w-[400px] transition-all duration-300 ease-linear"
        style={{ maxWidth: "50rem" }}
      >
        <h1 className="select-none cursor-pointer text-4xl transition-all duration-300 ease-linear hover:text-blue-500">
          <Link to={logoLink} className="text-current no-underline">
            Codefolio
          </Link>
        </h1>
        {blank ? (
          <></>
        ) : showButtons ? (
          <>
            <div className="flex text-xl font-bold text-gray-800 justify-center items-center flex-grow transition-all duration-300 ease-linear">
              <Link
                to="/dashboard"
                className="no-underline mx-10 py-1 transition-all duration-300 ease-linear hover:text-blue-500"
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className="no-underline mx-10 py-1 transition-all duration-300 ease-linear hover:text-blue-500"
              >
                About
              </Link>
              <Link
                to="/portfolio"
                className="no-underline mx-10 py-1 transition-all duration-300 ease-linear hover:text-blue-500"
              >
                Portfolio
              </Link>
            </div>
            <a
              href="mailto:email@example.com"
              className="flex justify-center items-center bg-black rounded-full text-white ml-2 px-3 py-2 transition-all duration-300 ease-linear hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <img
                className={"w-8 transition-all duration-300 ease-linear"}
                src={"src/assets/email.svg"}
                alt={"email icon"}
              />
            </a>
          </>
        ) : (
          <Link
            to="/login"
            className="text-current no-underline transition-all duration-300 ease-linear"
          >
            <button className="bg-black text-white px-6 py-2 text-center no-underline inline-block text-lg transition-all duration-400 ease-linear cursor-pointer rounded-full font-custom hover:translate-y-[-5px] hover:bg-blue-500">
              Hop In!
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
