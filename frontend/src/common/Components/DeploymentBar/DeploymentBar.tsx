import { FC, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const DeploymentBar: FC<{
  url: string;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({ url, setDeployed }) => {
  const [show, setShow] = useState(false);

  const animate = useSpring({
    opacity: show ? 1 : 0,
    bottom: show ? "50%" : "0%",
    transform: show ? "translate(-50%, 50%)" : "translate(-50%, 0%)",
  });

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      const setTimer = setTimeout(() => {
        setDeployed({ url: "", bool: false });
      }, 1000);
      return () => {
        clearTimeout(setTimer);
      };
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [setDeployed]);

  return (
    <animated.div
      style={animate}
      className={`fixed left-1/2 z-50 transform rounded-xl border-2 border-black bg-blue-500 px-3 text-lg text-white md:px-6 md:py-3 md:text-2xl md:font-bold`}
    >
      Deployment successful! Please wait 5 minutes for deployment to propagate...
      <a
        className={
          "px-1 font-bold underline transition-all hover:text-yellow-300"
        }
        href={url}
        target={"_blank"}
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </animated.div>
  );
};

export default DeploymentBar;
