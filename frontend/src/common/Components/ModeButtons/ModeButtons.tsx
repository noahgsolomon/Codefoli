import { useState, useEffect, FC } from "react";
import { useSpring, animated } from "react-spring";

const ModeButtons: FC = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScroll, setPrevScroll] = useState(window.scrollY);
  const thresholdShow = 100;
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
        <button className="mr-2 flex h-12 w-40 justify-center rounded-3xl border-2 hover:shadow-custom border-black bg-green-400 text-white transition-all hover:-translate-y-0.5">
          Preview ↗
        </button>
        <button className="flex h-12 w-40 justify-center rounded-3xl border-2 border-black hover:shadow-custom bg-blue-500 text-white transition-all hover:-translate-y-0.5">
          Deploy <span className={"text-2xl text-white"}>&nbsp; ✈</span>
        </button>
      </div>
    </animated.div>
  );
};

export default ModeButtons;
