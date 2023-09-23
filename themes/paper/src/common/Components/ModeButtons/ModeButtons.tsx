import { useState, useEffect, FC, useRef } from "react";
import { useSpring, animated } from "react-spring";
import {
  checkCustomDomainDetails,
  checkDeployed,
  deploy,
  subdomainAvailability,
} from "api/deployapi.tsx";
import UserData from "Type/UserData.tsx";
import {FaArrowLeft, FaDownload, FaGlobe, FaPaperPlane, FaTrash} from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { download } from "api/downloadapi.tsx";
import { deleteWebsite } from "api/deletewebsiteapi.tsx";
import { IoIosCloud } from "react-icons/io";
import {
  LIGHT_THEME_KEY,
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../../util/constants";
import {HOME_URL, STAGE} from "../../../config.ts";

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
  const [importedDomainModalOpen, setImportedDomainModalOpen] = useState(false);
  const [subdomain, setSubdomain] = useState("subdomain");
  const [subdomainChecking, setSubdomainChecking] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const [subdomainMessage, setSubdomainMessage] = useState("");
  const [customDomainCreatedModalOpen, setCustomDomainCreatedModalOpen] =
    useState(false);
  const [importedDomainLoading, setImportedDomainLoading] = useState(false);
  const [importedDomainError, setImportedDomainError] = useState(false);
  const [importedDomainSuccess, setImportedDomainSuccess] = useState(false);
  const [importedDomain, setImportedDomain] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const thresholdShow = 200;
  const thresholdHide = 0;
  const [activeDownload, setActiveDownload] = useState(false);
  const tmIds = useRef<{
    tmDownloadId?: NodeJS.Timeout; // created by setTimeout
    tmCheckDeployId?: NodeJS.Timeout; // created by setInterval
  }>({});
  const [animateVisibility, setAnimateVisibility] = useState(false);

  useEffect(() => {
    clearTimeout(tmIds.current.tmDownloadId);
    clearInterval(tmIds.current.tmCheckDeployId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDifference = Math.abs(currentScroll - prevScroll);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScroll >= totalHeight - 50) {
        setAnimateVisibility(false);
        setTimeout(() => {setScrollingDown(false)}, 100)
        return;
      }

      if (currentScroll > prevScroll && scrollDifference >= thresholdShow) {
        setAnimateVisibility(true);
        setTimeout(() => {setScrollingDown(true)}, 100)
        setPrevScroll(currentScroll);
      } else if (
          currentScroll < prevScroll &&
          scrollDifference >= thresholdHide
      ) {
        setAnimateVisibility(false);
        setTimeout(() => {setScrollingDown(false)}, 100)
        setPrevScroll(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  const animation = useSpring({
    to: async (next) => {
      if (animateVisibility) {
        await next({ transform: "translate3d(0, 0, 0)", opacity: 1 });
      } else {
        await next({ transform: "translate3d(0, 20px, 0)", opacity: 0 });
      }
    },
    config: { duration: 100 },
  });

  const handleDeploy = async () => {
    setDeployModalOpen(false);
    setDeploying(true);
    const website = userData.website
      ? userData.website.replace("https://", "").replace(".codefoli.com", "")
      : subdomain;
    console.log(website);
    console.log(userData.website);
    await deploy({
      subdomain: website,
      custom_domain: null,
      distribution: null,
    });
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
    }, 5000);
  };

  const handleCheckSubdomain = async () => {
    setSubdomainChecking(true);
    setSubdomainMessage("Checking subdomain availability...");
    if (subdomain === "") {
      setSubdomainMessage("Subdomain cannot be empty!");
      setSubdomainChecking(false);
      setSubdomainAvailable(false);
      return;
    }
    const validSubdomainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/;
    if (!validSubdomainPattern.test(subdomain) || subdomain.length < 2) {
      setSubdomainMessage("Subdomain contains invalid characters!");
      setSubdomainChecking(false);
      setSubdomainAvailable(false);
      return;
    }
    const subdomainFetch = await subdomainAvailability(subdomain);
    if (subdomainFetch.status === "OK") {
      setSubdomainMessage("Subdomain available!");
      setSubdomainAvailable(true);
    } else {
      setSubdomainMessage("Subdomain taken!");
      setSubdomainAvailable(false);
    }
    setSubdomainChecking(false);
  };

  const handleDownloadReactCode = async () => {
    setCodeModalOpen(false);
    setActiveDownload(true);
    setDownloaded({
      bool: true,
      message: "Generating react code... est. time: 11 seconds",
    });
    tmIds.current.tmDownloadId = setTimeout(() => {
      setDownloaded({ bool: false, message: "" });
    }, 3000);
    await download();
    clearTimeout(tmIds.current.tmDownloadId);
    setDownloaded({ bool: true, message: "React code downloaded!" });
    setActiveDownload(false);
    setTimeout(() => {
      setDownloaded({ bool: false, message: "" });
    }, 3000);
  };

  const handleDeleteWebsite = async () => {
    setDeleteModalOpen(false);
    const deleteFetch = await deleteWebsite();
    if (deleteFetch.status === "OK") {
      setUserData({ ...userData, website: "" });
      setDeleteModalOpen(false);
    }
  };

  const invalidDomain = (domain: string) => {
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return !domainRegex.test(domain);
  };

  const handleDeployCustomDomain = async () => {
    setImportedDomainLoading(true);
    if (importedDomain === "" || invalidDomain(importedDomain)) {
      setImportedDomainError(true);
      setImportedDomainLoading(false);
      return;
    }
    await deploy({
      subdomain: null,
      custom_domain: importedDomain,
      distribution: null,
    });

    let attempts = 0;
    const maxAttempts = 40;
    tmIds.current.tmCheckDeployId = setInterval(async () => {
      const deployed = await checkCustomDomainDetails();
      if (deployed.status === "OK") {
        clearInterval(tmIds.current.tmCheckDeployId);
        setImportedDomainLoading(false);
        setImportedDomainSuccess(true);
        setCustomDomainCreatedModalOpen(true);
        setImportedDomainError(false);
        setImportedDomainModalOpen(false);
        setUserData({
          ...userData,
          website: deployed.data.website,
          cname_name: deployed.data.cname_name,
          cname_value: deployed.data.cname_value,
          distribution: deployed.data.distribution,
        });
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          setImportedDomainLoading(false);
          clearInterval(tmIds.current.tmCheckDeployId);
          setImportedDomainError(false);
          console.log("Max attempts reached, website not yet deployed.");
        }
      }
    }, 5000);
  };

  const handleCustomRedeploy = async () => {
    setDeploying(true);
    setDeployModalOpen(false);
    await deploy({
      subdomain: null,
      custom_domain: userData.website.replace("https://", ""),
      distribution: userData.distribution,
    });
    let attempts = 0;
    const maxAttempts = 40;
    tmIds.current.tmCheckDeployId = setInterval(async () => {
      const deployed = await checkDeployed();
      if (deployed.status === "OK") {
        clearInterval(tmIds.current.tmCheckDeployId);
        setDeployed({ url: deployed.data, bool: true });
        setDeploying(false);
        setUserData({ ...userData, website: deployed.data });
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(tmIds.current.tmCheckDeployId);
          console.log("Max attempts reached, website not yet deployed.");
        }
      }
    }, 5000);
  };

  const handleResendVerificationEmail = async () => {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/resend-verification`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = await response.json();
    if (responseJson.status === "OK") {
      console.log("email sent");
    } else {
      console.log(responseJson.message);
    }
    setDeployModalOpen(false);
  };

  return (
    <>
      <animated.div
        className={`${scrollingDown || animateVisibility ? '' : 'hidden'} fixed bottom-6 left-0 right-0 z-30 flex justify-center`}
        style={animation}
      >
        <div className="mx-2 flex max-w-full flex-col rounded-3xl border-2 border-black bg-white px-4 py-3 shadow-custom dark:bg-[#0d0d0d] sm:max-w-screen-md sm:flex-row">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap justify-center">
              {!deploying && !activeDownload ? (
                <>
                  <a href="/preview">
                    <button className="mr-1 flex items-center justify-center rounded-3xl border-2 border-black bg-green-500 px-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom sm:m-2 sm:px-4">
                      Preview{" "}
                      <AiOutlineEye fill={"white"} className="ml-2 text-2xl" />
                    </button>
                  </a>
                  <button
                    className="mr-1 flex items-center justify-center rounded-3xl border-2 border-black bg-red-500 px-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom sm:m-2 sm:px-4"
                    onClick={() => setCodeModalOpen(true)}
                  >
                    Code <FaDownload fill={"white"} className="ml-2" />
                  </button>
                  <button
                    className="mr-1 flex items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom sm:m-2 sm:px-4"
                    onClick={() => setDeployModalOpen(true)}
                  >
                    Deploy <FaPaperPlane fill={"white"} className="ml-2" />
                  </button>
                </>
              ) : (
                <div
                  className={`flex items-center justify-center rounded-3xl border-2 border-black px-1 sm:m-2 sm:px-4 ${
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
              <div className={'flex flex-row gap-5'}>
                <a href={HOME_URL} className={'font-bold flex flex-row cursor-pointer items-center gap-1 hover:gap-2 transition-all underline'}>
                  <FaArrowLeft />Exit editor
                </a>
                {userData.website &&
                userData.cname_value &&
                userData.cname_name &&
                userData.cname_value ? (
                    <p
                        className={
                          "cursor-pointer text-blue-500 underline transition-all hover:opacity-50"
                        }
                        onClick={() => setCustomDomainCreatedModalOpen(true)}
                    >
                      DNS Records
                    </p>
                ) : (
                    <a
                        href={userData.website}
                        className="break-all text-sm text-blue-500 underline transition-all hover:text-yellow-500"
                        target="_blank"
                    >
                      {userData.website}
                    </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
      <div
        className={`${
          codeModalOpen ? "" : "hidden"
        } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
      >
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
          <h2 className="mb-4 text-2xl font-bold">Download Code</h2>
          <button
            className="mb-2 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
            onClick={handleDownloadReactCode}
          >
            <FaDownload fill="white" className="mr-2" />
            Download your React Code
            <img
              className="ml-2"
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
            onClick={() => {
              setCodeModalOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
      <div
        className={`${
          deployModalOpen ? "" : "hidden"
        } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
      >
        {!userData.verified ? ( //!userData.verified
          <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
            <h2 className="text-2xl font-bold">Email verification required</h2>
            <p className="mb-4 text-center text-base opacity-60">
              {userData.email}
            </p>
            <div
              className="cursor-pointer text-center text-blue-500 underline transition-all hover:opacity-80"
              onClick={handleResendVerificationEmail}
            >
              resend verification email
            </div>

            <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={() => {
                setDeployModalOpen(false);
                setSubdomainAvailable(false);
                setSubdomainMessage("");
                setSubdomainChecking(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {!userData.website ? (
              <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
                <h2 className="mb-4 text-2xl font-bold">Deployment Config</h2>
                <p className={"text-center"}>{subdomain}.codefoli.com</p>
                <div className="flex items-center">
                  <input
                    placeholder={"// subdomain"}
                    className="rounded-xl border-2 border-black px-2 focus:outline-none focus:ring-0 dark:bg-[#0d0d0d]"
                    onChange={(e) => {
                      setSubdomain(e.target.value);
                      setSubdomainAvailable(false);
                      setSubdomainMessage("");
                    }}
                  />
                  {!subdomainChecking ? (
                    <button
                      className="m-2 rounded-xl bg-black px-2 py-1 text-white transition-all hover:opacity-80"
                      onClick={handleCheckSubdomain}
                    >
                      Check
                    </button>
                  ) : (
                    <div
                      className={
                        "m-2 flex items-center justify-center rounded-xl border-2 border-black bg-black px-4 py-2"
                      }
                    >
                      <svg
                        className="z-10 h-5 w-5 animate-spin"
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
                <div
                  className={`${
                    subdomainAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {subdomainMessage}
                </div>

                <button
                  className={`mb-2 mt-4 ${
                    !subdomainAvailable
                      ? "bg-gray-500 opacity-50"
                      : "bg-blue-500"
                  } flex w-full items-center justify-center rounded-3xl border-2 border-black px-4 py-3 font-bold text-white transition-all ${
                    subdomainAvailable
                      ? "hover:-translate-y-0.5 hover:shadow-custom"
                      : ""
                  }`}
                  onClick={async () => await handleDeploy()}
                  disabled={!subdomainAvailable}
                >
                  <FaPaperPlane fill={"white"} className="mr-2" />
                  Deploy Now
                </button>
                <button
                  className={`flex w-full items-center justify-center rounded-3xl border-2 border-yellow-500 bg-black px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-custom`}
                  onClick={() => {
                    setImportedDomainModalOpen(true);
                    setDeployModalOpen(false);
                  }}
                >
                  <FaGlobe fill={"white"} className="mr-2" />
                  Deploy on custom domain
                </button>
                <button
                  className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                  onClick={() => {
                    setDeployModalOpen(false);
                    setSubdomainAvailable(false);
                    setSubdomainMessage("");
                    setSubdomainChecking(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : userData.website &&
              userData.cname_value &&
              userData.cname_name &&
              userData.distribution ? (
              <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
                <h2 className="mb-4 text-2xl font-bold">Deployment Config</h2>
                <p className={""}>Current deployment:</p>
                <p
                  className={
                    "cursor-pointer text-blue-500 underline transition-all hover:opacity-50"
                  }
                  onClick={() => {
                    setDeployModalOpen(false);
                    setCustomDomainCreatedModalOpen(true);
                  }}
                >
                  DNS Records
                </p>
                <a
                  className={
                    "text-center text-blue-500 transition-all hover:opacity-80"
                  }
                  target={"_blank"}
                  href={userData.website}
                >
                  {userData.website}
                </a>
                <div>
                  <p className={""}>
                    status:{" "}
                    <span className={"text-yellow-500"}>custom website</span>
                  </p>
                </div>

                <button
                  className={`mb-2 mt-1 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-custom`}
                  onClick={async () => await handleCustomRedeploy()}
                >
                  <FaPaperPlane fill={"white"} className="mr-2" />
                  Redeploy
                </button>
                {/*<button*/}
                {/*    className={`mb-2 mt-1 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-black px-4 py-3 font-bold text-white transition-all hover:bg-red-900`}*/}
                {/*    onClick={() => {*/}
                {/*      setDeployModalOpen(false);*/}
                {/*      setDeleteModalOpen(true);*/}
                {/*    }}*/}
                {/*>*/}
                {/*  <FaTrash fill={"white"} className="mr-2" />*/}
                {/*  Delete website*/}
                {/*</button>*/}
                <button
                  className="mt-1 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                  onClick={() => {
                    setDeployModalOpen(false);
                    setSubdomainAvailable(false);
                    setSubdomainMessage("");
                    setSubdomainChecking(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
                <h2 className="mb-4 text-2xl font-bold">Deployment Config</h2>
                <p className={""}>Current deployment:</p>
                <a
                  className={
                    "text-center text-blue-500 underline transition-all hover:opacity-80"
                  }
                  target={"_blank"}
                  href={userData.website}
                >
                  {userData.website}
                </a>
                <div>
                  <p className={""}>
                    status: <span className={"text-green-500"}>online</span>
                  </p>
                </div>

                <button
                  className={`mb-2 mt-1 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-4 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-custom`}
                  onClick={async () => await handleDeploy()}
                >
                  <FaPaperPlane fill={"white"} className="mr-2" />
                  Redeploy
                </button>
                <button
                  className={`mb-2 mt-1 flex w-full items-center justify-center rounded-3xl border-2 border-black bg-black px-4 py-3 font-bold text-white transition-all hover:bg-red-900`}
                  onClick={() => {
                    setDeployModalOpen(false);
                    setDeleteModalOpen(true);
                  }}
                >
                  <FaTrash fill={"white"} className="mr-2" />
                  Delete website
                </button>
                <button
                  className="mt-1 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                  onClick={() => {
                    setDeployModalOpen(false);
                    setSubdomainAvailable(false);
                    setSubdomainMessage("");
                    setSubdomainChecking(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {deleteModalOpen && (
        <div
          className={`${
            deleteModalOpen ? "" : "hidden"
          } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
        >
          <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg dark:bg-[#1a1a1a]">
            <h2 className="mb-4 max-w-[20ch] text-2xl font-bold ">
              Are you sure you want to delete this website?
            </h2>
            <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-green-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={async () => handleDeleteWebsite()}
            >
              Yes!
            </button>
            <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={() => setDeleteModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {importedDomainModalOpen && (
        <div
          className={`${
            importedDomainModalOpen ? "" : "hidden"
          } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
        >
          <div className="w-1/2 max-w-[400px] rounded-lg bg-white p-6 dark:bg-[#1a1a1a]">
            <h2 className="text-2xl font-bold">Custom Domain</h2>
            <p className={"mb-4 text-sm opacity-50"}>
              include subdomain (e.g., www)
            </p>
            <input
              type="text"
              onChange={(e) => setImportedDomain(e.target.value)}
              placeholder="www.mydomain.com"
              className="mb-16 w-full rounded-xl border-2 border-black px-2 py-1 transition-all dark:bg-[#0d0d0d]"
            />
            <p
              className={`mb-4 text-sm text-red-500 opacity-50 ${
                importedDomainError ? "" : "hidden"
              }`}
            >
              invalid domain!
            </p>
            <p
              className={`mb-4 text-sm text-green-500 opacity-50 ${
                importedDomainSuccess ? "" : "hidden"
              }`}
            >
              imported domain!
            </p>
            {!importedDomainLoading ? (
              <button
                className="flex w-full items-center justify-center rounded-3xl border-2 border-black bg-blue-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                onClick={async () => await handleDeployCustomDomain()}
              >
                <IoIosCloud fill={"white"} className="mr-2" />
                Deploy
              </button>
            ) : (
              <div
                className={
                  "fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center bg-gray-600 bg-opacity-50"
                }
              >
                <h2 className={"text-3xl font-bold"}>
                  Getting your website ready...
                </h2>
                <p className={"mb-4"}>Please stay here. est. time: 1 minute</p>
                <svg
                  className="mr-2 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 dark:border-gray-300"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="rainbow-stroke"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    fill={
                      localStorage.getItem(LOCALSTORAGE_THEME_KEY) ===
                      LIGHT_THEME_KEY
                        ? "white"
                        : "#1a1a1a"
                    }
                  ></circle>
                  <path
                    className="opacity-75"
                    fill={"white"}
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={() => {
                setImportedDomainModalOpen(false);
                setImportedDomain("");
                setImportedDomainError(false);
                setImportedDomainSuccess(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {customDomainCreatedModalOpen && (
        <div
          className={`${
            customDomainCreatedModalOpen ? "" : "hidden"
          } fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50`}
        >
          <div className="overflow-x-auto rounded-lg bg-white p-6 dark:bg-[#1a1a1a] ">
            <p className={"text-5xl font-bold"}>
              Add these records to your DNS
            </p>
            <p className={"mb-4 opacity-80"}>
              Please allow <span className={"underline"}>24 hours</span> for
              these changes to take affect depending on your provider
            </p>
            <table className="min-w-full divide-y divide-gray-200 border-2 border-white">
              <thead className="font-bold">
                <tr>
                  <th className="border-r px-4 py-2"> </th>
                  <th className="border-r px-4 py-2 text-blue-500">Entry 1</th>
                  <th className="px-4 py-2 text-green-500">Entry 2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="border-r px-4 py-2">Record Type</th>
                  <td className="w-1/4 break-words border-r px-4 py-2 text-lg text-blue-500">
                    CNAME
                  </td>
                  <td className="w-1/4 break-words px-4 py-2 text-lg text-green-500">
                    CNAME
                  </td>
                </tr>
                <tr>
                  <th className="border-r px-4 py-2">Name</th>
                  <td className="w-1/4 break-words border-r px-4 py-2 text-lg text-blue-500">
                    {userData.website.replace("https://", "")}
                  </td>
                  <td className="w-1/4 break-words px-4 py-2 text-lg text-green-500">
                    {userData.cname_name}
                  </td>
                </tr>
                <tr>
                  <th className="border-r px-4 py-2">Value</th>
                  <td className="w-2/5 break-words border-r px-4 py-2 text-lg text-blue-500">
                    {userData.distribution}
                  </td>
                  <td className="w-2/5 break-words px-4 py-2 text-lg text-green-500">
                    {userData.cname_value}
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className="mt-4 flex w-full justify-center rounded-3xl border-2 border-black bg-red-500 px-2 py-1 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
              onClick={() => {
                setCustomDomainCreatedModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModeButtons;
