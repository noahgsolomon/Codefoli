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
      className={`relative z-40 flex items-center justify-center py-5 transition-opacity duration-300 ease-linear ${
        loading ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <div
        className="mx-auto flex w-full items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3 shadow-custom transition-all duration-300 ease-linear"
        style={{ maxWidth: "50rem" }}
      >
        <h1 className="cursor-pointer select-none text-4xl transition-all duration-300 ease-linear hover:text-blue-500">
          <Link to={logoLink} className="text-current no-underline">
            Codefolio
          </Link>
        </h1>
        {blank ? (
          <></>
        ) : showButtons ? (
          <>
            <div className="flex flex-grow items-center justify-center text-xl font-bold text-gray-800 transition-all duration-300 ease-linear">
              <Link
                to="/dashboard"
                className="mx-10 py-1 no-underline transition-all duration-300 ease-linear hover:text-blue-500"
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className="mx-10 py-1 no-underline transition-all duration-300 ease-linear hover:text-blue-500"
              >
                About
              </Link>
              <Link
                to="/portfolio"
                className="mx-10 py-1 no-underline transition-all duration-300 ease-linear hover:text-blue-500"
              >
                Portfolio
              </Link>
            </div>
            <a
              href="mailto:email@example.com"
              className="ml-2 flex items-center justify-center rounded-full bg-black px-3 py-2 text-white transition-all duration-300 ease-linear hover:-translate-y-0.5 hover:bg-blue-500"
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
            <button className="duration-400 inline-block cursor-pointer rounded-full bg-black px-6 py-2 text-center font-custom text-lg text-white no-underline transition-all ease-linear hover:translate-y-[-5px] hover:bg-blue-500">

              Hop In!
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
