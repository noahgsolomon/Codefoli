import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header
      className={`relative z-40 mx-5 flex items-center justify-center py-5 font-bold transition-all ease-linear md:flex-row`}
    >
      <div
        className="mx-auto flex w-full flex-col items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3 shadow-custom transition-all md:flex-row"
        style={{ maxWidth: "40rem" }}
      >
        <>
          <div className="flex w-full flex-row items-center justify-center text-gray-800 md:flex-row md:text-base">
            <div className="lg:mx-10">
              <Link
                to="/"
                className="mx-2 py-1 text-lg no-underline transition-all hover:text-blue-500 md:mx-10"
              >
                Home
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
                Projects
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
      </div>
    </header>
  );
};

export default Header;
