import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC<{authenticated: boolean}> = ({authenticated}) => {
  const location = useLocation();
  const blank = ["/setup"].includes(location.pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
  }, []);


  return (
    <header
      className={`relative z-40 mx-5 flex items-center justify-center py-5 font-bold transition-all ease-linear md:flex-row 
      ${loading ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className="mx-auto flex w-full flex-col items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3 shadow-custom transition-all md:flex-row"
        style={{ maxWidth: "50rem" }}
      >
        <h1 className="hover:p-2 cursor-pointer select-none transition-all hover:bg-blue-500 hover:text-white text-4xl text-current no-underline md:text-2xl">
            Codefolio
        </h1>
        {blank ? (
          <></>
        ) : authenticated ? (
          <>
            <div className="flex w-full flex-row items-center justify-center text-gray-800 md:flex-row md:text-base">
              <div className="lg:mx-10">
                <Link
                  to="/dashboard"
                  className="mx-2 py-1 text-lg no-underline transition-all md:mx-10 hover:text-blue-500"
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
                  to="/projects"
                  className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
                >
                  Portfolio
                </Link>
              </div>
              <Link
                to="/contact"
                className="flex w-14 items-center justify-center rounded-2xl border-2 border-black px-3 py-2 text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 md:my-0 md:ml-2"
              >
                <img
                  src="https://img.icons8.com/cotton/48/handshake--v2.png"
                  alt="email icon"
                />
              </Link>
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
