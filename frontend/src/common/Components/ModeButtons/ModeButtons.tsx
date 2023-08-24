import { useState, useEffect, FC } from "react";
import { useSpring, animated } from "react-spring";
import {checkDeployed, deploy, subdomainAvailability} from "api/deployapi.tsx";
import UserData from "Type/UserData.tsx";
import { FaDownload, FaPaperPlane } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { download } from "api/downloadapi.tsx";

const ModeButtons: FC<{
  deploying: boolean;
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  setDownloaded: (downloaded: { bool: boolean; message: string }) => void;
  userData: UserData;
  setUserData: (userData: UserData) => void;
}> = ({
  deploying,
  setDeploying,
  userData,
  setDownloaded,
  setUserData,
  setDeployed,
}) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [subdomain, setSubdomain] = useState('subdomain');
  const [subdomainChecking, setSubdomainChecking] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const [subdomainMessage, setSubdomainMessage] = useState('^ write what subdomain you want');
  const thresholdShow = 200;
  const thresholdHide = 0;
  const [activeDownload, setActiveDownload] = useState(false);

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

  const modalAnimation = useSpring({
    opacity: (codeModalOpen || deployModalOpen) ? 1 : 0,
    config: { duration: 200 },
  });

  const handleDeploy = async () => {
    setDeployModalOpen(false);
    setDeploying(true);
    await deploy(subdomain);
    let attempts = 0;
    const maxAttempts = 40;
    const interval = setInterval(async () => {
      const deployed = await checkDeployed();
      if (deployed.status === "OK") {
        clearInterval(interval);
        setDeployed({ url: deployed.data, bool: true });
        setDeploying(false);
        setUserData({ ...userData, website: deployed.data });
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.log("Max attempts reached, website not yet deployed.");
        }
      }
    }, 3000);
  };

  const handleCheckSubdomain = async () => {
    setSubdomainChecking(true);
    setSubdomainMessage('Checking subdomain availability...')
    if (subdomain === '') {
        setSubdomainMessage('Subdomain cannot be empty!');
        setSubdomainChecking(false);
        setSubdomainAvailable(false);
        return;
    }
    const subdomainFetch = await subdomainAvailability(subdomain);
    if (subdomainFetch.status === "OK") {
      setSubdomainMessage('Subdomain available!');
      setSubdomainAvailable(true);
    } else {
      setSubdomainMessage('Subdomain taken!');
      setSubdomainAvailable(false);
    }
    setSubdomainChecking(false);
  }

  const handleDownloadReactCode = async () => {
    setCodeModalOpen(false);
    setActiveDownload(true);
    setDownloaded({
      bool: true,
      message: "Generating react code... est. time: 11 seconds",
    });
    setTimeout(() => {
      setDownloaded({ bool: false, message: "" });
    }, 3000);
    await download();
    setDownloaded({ bool: true, message: "React code downloaded!" });
    setActiveDownload(false);
    setTimeout(() => {
      setDownloaded({ bool: false, message: "" });
    }, 3000);
  };

  return (
    <>
      <animated.div
        style={animation}
        className="fixed bottom-6 left-0 right-0 flex justify-center"
      >
        <div className="mx-2 flex max-w-full flex-col rounded-3xl border-2 border-black bg-white px-4 py-3 shadow-custom sm:max-w-screen-md sm:flex-row">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap justify-center">
              {!deploying && !activeDownload ? (
                <>
                  <a href="/preview">
                    <button className="m-2 flex h-10 w-40 items-center justify-center rounded-3xl border-2 border-black bg-green-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom">
                      Preview{" "}
                      <AiOutlineEye fill={"white"} className="ml-2 text-2xl" />
                    </button>
                  </a>
                  <button
                    className="m-2 flex h-10 w-40 items-center justify-center rounded-3xl border-2 border-black bg-red-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                    onClick={() => setCodeModalOpen(true)}
                  >
                    Code <FaDownload fill={"white"} className="ml-2" />
                  </button>
                  <button
                      className="m-2 flex h-10 w-40 items-center justify-center rounded-3xl border-2 border-black bg-blue-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                      onClick={() => setDeployModalOpen(true)}
                  >
                    Deploy <FaPaperPlane fill={"white"} className="ml-2" />
                  </button>
                </>
              ) : (
                <div
                  className={`flex h-10 w-40 items-center justify-center rounded-3xl border-2 border-black ${
                    activeDownload ? "bg-red-500" : "bg-blue-500"
                  } text-white transition-all hover:-translate-y-0.5 hover:shadow-custom`}
                >
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
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
                  {activeDownload ? "Generating..." : "Deploying..."}
                </div>
              )}
            </div>
            <div>
              <a
                href={userData.website}
                className="break-all text-sm text-blue-500 underline transition-all hover:text-yellow-500"
                target={"_blank"}
              >
                {userData.website}
              </a>
            </div>
          </div>
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
            Download your React Code
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
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/color/64/tailwindcss.png"
              alt="tailwindcss"
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
      <animated.div
          style={modalAnimation}
          className={`${
              deployModalOpen ? "" : "hidden"
          } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
      >
        <div className="rounded-lg bg-white p-8 shadow-lg flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">Deployment Config</h2>
          <p className={'text-center'}>{subdomain}.codefoli.com</p>
          <div className="flex items-center">
            <input
                placeholder={'// subdomain'}
                className="border-2 border-black rounded-xl px-2 focus:ring-0 focus:outline-none"
                onChange={(e) => setSubdomain(e.target.value)}
            />
            { !subdomainChecking ? (
                <button
                    className={'m-2 rounded-xl bg-black text-white px-2 py-1 hover:opacity-80 transition-all'}
                    onClick={async () => handleCheckSubdomain()}
                >Check</button>
            ) : (
                <div className={'flex items-center justify-center m-2 px-4 py-2 rounded-xl border-black border-2 bg-black'}>
                  <svg
                      className="h-5 w-5 animate-spin z-10"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
            )}
          </div>
          <div className={`${subdomainAvailable ? 'text-green-500' : 'text-red-500'}`}>{subdomainMessage}</div>


          <button
              className={`mb-2 mt-4 ${!subdomainAvailable ? 'bg-gray-500 opacity-50' : 'bg-blue-500'} flex w-full items-center justify-center rounded-3xl border-2 border-black px-4 py-3 font-bold text-white transition-all ${subdomainAvailable ? 'hover:-translate-y-0.5 hover:shadow-custom': ''}`}
              onClick={async () => await handleDeploy()}
              disabled={!subdomainAvailable}
          >
            <FaPaperPlane fill={"white"} className="mr-2" />
            Deploy Now
          </button>
          <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={() => setDeployModalOpen(false)}
          >
            Close
          </button>
        </div>
      </animated.div>
    </>
  );
};

export default ModeButtons;
