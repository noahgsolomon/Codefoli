import { useState, useEffect, FC } from "react";
import { useSpring, animated } from "react-spring";
import { deploy } from "api/deployapi.tsx";
import UserData from "Type/UserData.tsx";

const ModeButtons: FC<{
  deploying: boolean;
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  userData: UserData;
  setUserData: (userData: UserData) => void;
}> = ({ deploying, setDeployed, setDeploying, userData, setUserData }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
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
    const deployFetch = await deploy();
    if (deployFetch.status === "OK") {
      setDeployed({ url: deployFetch.data, bool: true });
      setDeploying(false);
      setUserData({ ...userData, website: deployFetch.data });
    }
  };

  return (
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
              <a href="/preview">
                <button className="mr-2 flex h-12 w-40 justify-center rounded-3xl border-2 border-black bg-green-400 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom">
                  Preview ↗
                </button>
              </a>
              <button
                className="flex h-12 w-40 justify-center rounded-3xl border-2 border-black bg-blue-500 text-white transition-all hover:-translate-y-0.5 hover:shadow-custom"
                onClick={async () => await handleDeploy()}
              >
                Deploy <span className={"text-2xl text-white"}>&nbsp; ✈</span>
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
  );
};

export default ModeButtons;
