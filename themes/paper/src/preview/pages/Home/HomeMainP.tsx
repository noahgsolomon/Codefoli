import { FC, useMemo } from "react";
import { animated, useSpring } from "react-spring";
import { Link } from "react-router-dom";
import HomeData from "Type/HomeData.tsx";

const HomeMainP: FC<{
  pageData: HomeData;
}> = ({ pageData }) => {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const imageAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  const date = useMemo(() => Date.now(), []);

  return (
    <div className="mx-4 flex flex-col justify-center md:mx-10 md:flex-row">
      <animated.div style={headerAnimation} className={"md:mr-10"}>
        <div className="mx-auto mt-10 max-w-2xl font-bold xl:mt-32">
          <h1 className="font-extra-bold mx-auto max-w-[15ch] text-center text-4xl leading-snug transition-all md:mx-0 md:text-left md:text-5xl md:leading-relaxed xl:text-6xl xl:leading-normal">
            {pageData.header_one}
          </h1>
          <p className="mx-auto max-w-[35ch] text-center text-base opacity-60 transition-all md:mx-0 md:text-left xl:max-w-[50ch]">
            {pageData.description_one}
          </p>
        </div>
        <div className="mt-5 whitespace-nowrap text-center md:text-left">
          <Link
            to="/preview/contact"
            className="mr-4 rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500"
          >
            Get in touch
          </Link>
          <Link
            to="/preview/projects"
            className="rounded-xl border-2 border-black px-6 py-4 font-bold transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
          >
            View Projects
          </Link>
        </div>
      </animated.div>
      <animated.div style={imageAnimation}>
        <div className="relative mx-auto mt-10 h-[350px] w-[350px] transition-all lg:h-[500px] lg:w-[500px] xl:mt-24">
          <div className="h-full w-full overflow-hidden rounded-3xl border-2 border-black shadow-customHover">
            <img
              className="h-full w-full object-cover"
              src={pageData.profile_image + "?date=" + date}
              alt="pfp"
            ></img>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default HomeMainP;
