import { useState, useEffect, FC } from "react";
import { useSpring, animated } from "react-spring";
import { deploy } from "api/deployapi.tsx";
import UserData from "Type/UserData.tsx";
import userData from "Type/UserData.tsx";
import { AiOutlineEdit } from "react-icons/ai";
import { FaDownload, FaPaperPlane } from "react-icons/fa";

const ModeButtonsP: FC<{
  deploying: boolean;
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  userData: userData;
  setUserData: (userData: UserData) => void;
}> = ({ deploying, setDeploying, setDeployed, userData, setUserData }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const thresholdShow = 200;
  const thresholdHide = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDifference = Math.abs(currentScroll - prevScroll);

      if (currentScroll > prevScroll && scrollDifference >= thresholdShow) {
        setScrollingDown(true);
        setPrevScroll(currentScroll);
      } else if (
        currentScroll < prevScroll &&
        scrollDifference >= thresholdHide
      ) {
        setScrollingDown(false);
        setPrevScroll(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  const animation = useSpring({
    transform: scrollingDown
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 20px, 0)",
    opacity: scrollingDown ? 1 : 0,
    config: { duration: 100 },
  });

  const handleDeploy = async () => {
    setDeploying(true);
    await deploy();
    // const deployFetch = await deploy();
    // if (deployFetch.status === "OK") {
    //   setDeployed({ url: deployFetch.data, bool: true });
    //   setDeploying(false);
    //   setUserData({ ...userData, website: deployFetch.data });
    // }
  };

  const handleDownloadReactCode = async () => {
    console.log("react download code");
  };
  const handleDownloadCompiledCode = async () => {
    console.log("compiled download code");
  };

  const modalAnimation = useSpring({
    opacity: codeModalOpen ? 1 : 0,
    config: { duration: 200 },
  });

  return (
    <>
      <animated.div
        style={animation}
        className="fixed bottom-10 left-0 right-0 flex justify-center"
      >
        <div
          className={
            "flex flex-row rounded-3xl border-2 border-black bg-white px-4 py-3 shadow-custom"
          }
        >
          {!deploying ? (
            <div className={"flex flex-col items-center justify-center"}>
              <div className={"flex flex-row"}>
                <a href="/dashboard">
                  <button className="mr-2 flex h-12 w-40 items-center justify-center rounded-3xl border-2 border-black bg-black text-white transition-all hover:-translate-y-0.5 hover:shadow-custom">
                    Edit{" "}
                    <AiOutlineEdit fill={"white"} className="ml-2 text-2xl" />
                  </button>
                </a>
                <button
                  className="mr-2 flex h-12 w-40 items-center justify-center rounded-3xl border-2 border-black bg-red-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                  onClick={() => setCodeModalOpen(true)}
                >
                  Code <FaDownload fill={"white"} className="ml-2" />
                </button>
                <button
                  className="flex h-12 w-40 items-center justify-center rounded-3xl border-2 border-black bg-blue-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                  onClick={async () => await handleDeploy()}
                >
                  Deploy <FaPaperPlane fill={"white"} className="ml-2" />
                </button>
              </div>
              <div>
                <a
                  href={userData.website}
                  className={
                    "break-all text-sm text-blue-500 underline transition-all hover:text-yellow-500"
                  }
                  target={"_blank"}
                >
                  {userData.website}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex h-12 w-40 items-center justify-center rounded-3xl border-2 border-black bg-blue-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom">
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deploying...
            </div>
          )}
        </div>
      </animated.div>
      <animated.div
        style={modalAnimation}
        className={`${
          codeModalOpen ? "" : "hidden"
        } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
      >
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Download Code</h2>
          <button
            className="mb-2 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
            onClick={handleDownloadReactCode}
          >
            <FaDownload fill={"white"} className="mr-2" />
            Download React Source Code
            <img
              className={"ml-2"}
              width="36"
              height="36"
              src="https://img.icons8.com/color/64/react-native.png"
              alt="react"
            />
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/color/64/typescript.png"
              alt="typescript"
            />
          </button>
          <button
            className="flex w-full items-center justify-center rounded-3xl border-2 border-black bg-yellow-500 px-4 py-3 font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-custom"
            onClick={handleDownloadCompiledCode}
          >
            <FaDownload fill={"black"} className="mr-2" />
            Download Compiled Code
            <img
              className={"ml-2"}
              width="36"
              height="36"
              src="https://img.icons8.com/color/64/javascript--v1.png"
              alt="javascript--v1"
            />
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/fluency/64/css3.png"
              alt="css3"
            />
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/color/64/html-5--v1.png"
              alt="html-5--v1"
            />
          </button>
          <button
            className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
            onClick={() => setCodeModalOpen(false)}
          >
            Close
          </button>
        </div>
      </animated.div>
    </>
  );
};

export default ModeButtonsP;
