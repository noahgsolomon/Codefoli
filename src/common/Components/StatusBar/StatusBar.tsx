import { FC, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const StatusBar: FC<{
  message: string;
  color: string;
}> = ({ message, color }) => {
  const [show, setShow] = useState(false);
  const [animateDown, setAnimateDown] = useState(false);
  const [animateUp, setAnimateUp] = useState(false);

  const animate = useSpring({
    opacity: show ? 1 : 0,
    top: animateUp ? "-100px" : animateDown ? "50px" : "-100px",
  });

  useEffect(() => {
    setShow(true);
    setAnimateDown(true);
    const timer = setTimeout(() => {
      setAnimateUp(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (animateUp) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [animateUp]);

  return (
    <animated.div
      style={animate}
      className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-xl ${color} px-3 text-lg md:px-6 md:py-3 md:text-2xl md:font-bold`}
    >
      {message}
    </animated.div>
  );
};

export default StatusBar;
