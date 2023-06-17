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
      className={`font-bold relative z-40 mx-5 flex items-center justify-center py-5 transition-all ease-linear md:flex-row ${
        loading ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <div
        className="mx-auto flex w-full flex-col items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3 shadow-custom transition-all md:flex-row"
        style={{ maxWidth: "50rem" }}
      >
        <h1 className="cursor-pointer select-none transition-all hover:text-blue-500">
          <Link
            to={logoLink}
            className="text-4xl text-current no-underline md:text-2xl"
          >
            Codefolio
          </Link>
        </h1>
        {blank ? (
          <></>
        ) : showButtons ? (
          <>
            <div className="flex w-full flex-row items-center justify-between text-gray-800 md:flex-row md:text-base">
             <div className="md:mx-10">
               <Link
                   to="/dashboard"
                   className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
               >
                 Dashboard
               </Link>
               <Link
                   to="/about"
                   className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
               >
                 About
               </Link>
               <Link
                   to="/portfolio"
                   className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
               >
                 Portfolio
               </Link>
             </div>
              <a
                href="mailto:email@example.com"
                className="flex items-center justify-center rounded-2xl border-2 border-black px-3 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 md:my-0 md:ml-2 hover:border-blue-500"
              >
                <img
                  className={"w-8 transition-all"}
                  src={"https://img.icons8.com/cotton/48/handshake--v2.png"}
                  alt={"email icon"}
                />
              </a>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="my-2 text-current no-underline transition-all md:my-0"
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
