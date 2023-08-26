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
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row xl:mx-auto xl:justify-center">
        <animated.div style={headerAnimation}>
          <div className="mx-auto mt-10  max-w-2xl font-bold xl:mt-32">
            <h1 className="font-extra-bold mx-auto max-w-[15ch] text-center text-4xl leading-snug transition-all md:text-5xl md:leading-relaxed lg:mx-0 lg:text-left xl:text-6xl xl:leading-normal">
              {pageData.header_one}
            </h1>
            <p className="mx-auto max-w-[35ch] text-center text-base opacity-60 transition-all lg:mx-0 lg:text-left xl:max-w-[50ch]">
              {pageData.description_one}
            </p>
          </div>
          <div className="mt-5 whitespace-nowrap text-center lg:text-left">
            <Link
              to="/preview/contact"
              className="mr-4 rounded-xl border-2 border-black bg-black px-4 py-2 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 lg:px-6 lg:py-4"
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
          <div
            className={`relative mx-auto mt-10 h-[300px] w-[300px] transition-all md:h-[500px] md:w-[500px] lg:mx-0 xl:ml-20 xl:mt-24`}
          >
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
    </div>
  );
};

export default HomeMainP;
