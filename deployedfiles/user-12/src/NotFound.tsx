import { FC } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const NotFound: FC = () => {
  const warningAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const textAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  const errorCodeAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 300,
  });

  return (
    <div className="mt-20 flex flex-col items-center justify-center md:mt-40 lg:flex-row">
      <animated.div
        style={warningAnimation}
        className="z-10 text-center md:mr-24"
      >
        <img
          className={"w-64 md:w-80"}
          src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633dea45e1cbb3429b10d94d_page-not-found-icon-paperfolio-webflow-template.svg"
          alt="Warning"
        />
      </animated.div>
      <animated.div
        style={textAnimation}
        className="z-10 flex flex-col items-center justify-center text-center"
      >
        <h1 className="mt-10 text-2xl font-bold md:text-4xl">Oops!</h1>
        <h1 className="mt-5 text-2xl font-bold md:text-4xl">Page Not Found</h1>
        <Link
          to={"/"}
          className="mt-10 rounded-xl bg-black px-8 py-2 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Go to homepage
        </Link>
      </animated.div>
      <animated.div
        style={errorCodeAnimation}
        className="absolute text-[12rem] font-bold text-gray-300 opacity-80 md:left-10 md:top-6 md:text-[18rem]"
      >
        404
      </animated.div>
    </div>
  );
};

export default NotFound;
