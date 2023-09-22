import { FC, useMemo } from "react";
import AboutData from "Type/AboutData.tsx";
import { Link } from "react-router-dom";
import Marquee from "Components/Marquee/Marquee.tsx";
import UserData from "Type/UserData.tsx";
import { useSpring, animated } from "react-spring";

const AboutMainP: FC<{
  userData: UserData;
  pageData: AboutData;
}> = ({ userData, pageData }) => {
  const date = useMemo(() => Date.now(), []);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const imageAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 300,
  });

  const descriptionAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  return (
    <>
      <div className="mx-auto my-20 px-5">
        <section className="flex flex-col justify-center">
          <animated.div
            style={headerAnimation}
            className="flex flex-col justify-center"
          >
            <div>
              <h2 className="mx-auto mb-5 max-w-[15ch] text-center text-5xl font-bold transition-all  md:text-7xl">
                {pageData.header_one}
              </h2>
            </div>
            <div className="ml-5">
              <p className="mx-auto mb-5  max-w-[40ch] text-center text-2xl font-semibold transition-all ">
                {pageData.description_one}
              </p>
            </div>
            <div className="flex justify-center text-center">
              <Link
                to="/preview/contact"
                className="mb-4 inline-block rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500"
              >
                Get in touch
              </Link>
            </div>
          </animated.div>
          <div className="flex justify-between md:mx-12 lg:mx-32">
            <animated.div
              style={imageAnimation}
              className="image-wrapper relative order-2 h-[150px] w-[150px] text-center"
            >
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={pageData.icon_one + "?date=" + date}
                  alt="portfolio"
                />
              </div>
            </animated.div>

            <animated.div
              style={imageAnimation}
              className="image-wrapper relative order-last h-[150px] w-[150px] text-center md:self-start"
            >
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={pageData.icon_two + "?date=" + date}
                  alt="portfolio"
                />
              </div>
            </animated.div>
          </div>
        </section>
      </div>
      <animated.section style={descriptionAnimation} className="story mb-20">
        <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 md:grid md:grid-cols-2 md:items-start md:justify-between">
          <div className="content-left">
            <div className="flex justify-center md:justify-between">
              <h2 className="mb-8 text-center text-4xl font-bold transition-all  lg:text-left lg:text-6xl lg:leading-tight">
                {pageData.header_two}
              </h2>
            </div>
            <div className="image-wrapper relative mb-5 h-60 w-full sm:mx-auto sm:h-[200px] sm:w-[300px] md:mx-0 md:h-[200px] md:w-[400px] lg:h-72 lg:w-[500px]">
              <div className="h-full w-full overflow-hidden rounded-3xl border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={pageData.icon_three + "?date=" + date}
                  alt="portfolio"
                />
              </div>
            </div>
            <p className="mb-5 text-2xl font-semibold transition-all">
              {pageData.description_two}
            </p>
          </div>
        </div>
      </animated.section>
      <Marquee
        items={userData.services.map((service) => {
          return service
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
        })}
      />
    </>
  );
};

export default AboutMainP;
