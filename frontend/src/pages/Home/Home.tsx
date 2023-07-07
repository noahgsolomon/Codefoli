import React, { useEffect, useState } from "react";
import { useSpring, animated, useInView } from "react-spring";
import { useNavigate } from "react-router-dom";
import { FiCode, FiRefreshCw, FiLayout } from "react-icons/fi";
import profileDisplayImg from "assets/profiledisplay.png";
import user2PfpImg from "assets/user2-pfp.png";
import userPfpImg from "assets/user-pfp.png";
import Footer from "Components/Footer/Footer";
import Loader from "Components/Loader/Loader.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [refIntro, inViewIntro] = useInView({});
  const fadeInIntro = useSpring({
    opacity: inViewIntro ? 1 : 0,
    transform: inViewIntro ? "translateY(0)" : "translateY(20px)",
  });
  const [refTestimonial, inViewTestimonial] = useInView({});
  const fadeInTestimonial = useSpring({
    opacity: inViewTestimonial ? 1 : 0,
    transform: inViewTestimonial ? "translateY(0)" : "translateY(20px)",
  });
  const [refFeature, inViewFeature] = useInView({});
  const fadeInFeature = useSpring({
    opacity: inViewFeature ? 1 : 0,
    transform: inViewFeature ? "translateY(0)" : "translateY(20px)",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="home-container mx-auto my-10 max-w-screen-lg rounded px-5 text-gray-800">
        <main>
          <animated.section
            ref={refIntro}
            style={fadeInIntro}
            className="intro-section mb-10 px-5"
          >
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to{" "}
              <span className="highlight-codefolio bg-red-500 px-1 text-white">
                Codefolio
              </span>
              !
            </h1>
            <img
              className="shadow-box mb-5 h-auto w-full transform rounded-lg border-2 border-black transition-all duration-300 hover:translate-y-1 hover:shadow-lg md:max-w-screen-lg"
              src={profileDisplayImg}
              alt="Introductory visual"
            />
            <p className="mb-2 text-lg leading-6">
              Codefolio is a platform dedicated to helping programmers create
              stunning portfolio websites...
            </p>
            <h2 className="mb-5 text-4xl font-bold">What you can do:</h2>
            <div className="pl-5">
              <ul className="list-none">
                <li>
                  Create a professional and personalized portfolio website
                </li>
                <li>Showcase your projects, skills, and accomplishments</li>
                <li>Easily update and maintain your portfolio over time</li>
              </ul>
            </div>
            <h3 className="mb-5 text-3xl font-bold leading-9">
              Ready to build your portfolio website with Codefolio? Sign Up and
              get started!
            </h3>
          </animated.section>
          <animated.section
            ref={refTestimonial}
            style={fadeInTestimonial}
            className="testimonial-section mb-10 grid-cols-1 gap-5 px-5 md:grid md:grid-cols-2"
          >
            <h2 className="mb-5 text-4xl font-bold">
              What Our{" "}
              <span className="highlight-users bg-blue-500 px-1 text-white">
                Users
              </span>{" "}
              Say
            </h2>

            <blockquote className="testimonial-grid mb-5 border-l-4 border-gray-600 bg-gray-100 px-5 py-4 text-gray-800">
              "Codefolio made building my portfolio a breeze. It truly
              represents my skills and work." - Jane Doe
            </blockquote>
            <img
              className="shadow-box md:w-18 h-auto w-3/12 transform rounded-full border-4 border-black transition-all duration-300 hover:translate-y-1 hover:shadow-lg"
              src={user2PfpImg}
              alt="User testimonial"
            />
            <img
              className="shadow-box md:w-18 h-auto w-3/12 transform rounded-full border-4 border-black transition-all duration-300 hover:translate-y-1 hover:shadow-lg"
              src={userPfpImg}
              alt="User testimonial"
            />
            <blockquote className="testimonial-grid mb-5 border-l-4 border-gray-600 bg-gray-100 px-5 py-4 text-gray-800">
              "With Codefolio, I was able to create a professional portfolio in
              no time." - John Smith
            </blockquote>
          </animated.section>
          <animated.section
            ref={refFeature}
            style={fadeInFeature}
            className="mb-10 px-5"
          >
            <h2 className="mb-5 text-4xl font-bold">
              Codefolio{" "}
              <span className="bg-indigo-500 px-1 text-white">Features</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="md:text-center">
                <FiLayout size={40} />
                <h3 className="mb-2 text-3xl font-bold leading-9">
                  Customizable Templates
                </h3>
                <p className="mb-2 text-lg leading-6">
                  Choose from a variety of templates that suit your style and
                  personalize them according to your needs.
                </p>
              </div>
              <div className="md:text-center">
                <FiCode size={40} />
                <h3 className="mb-2 text-3xl font-bold leading-9">
                  Project Showcasing
                </h3>
                <p className="mb-2 text-lg leading-6">
                  Highlight your projects effectively with detailed
                  descriptions, code snippets, and live demo links.
                </p>
              </div>
              <div className="md:text-center">
                <FiRefreshCw size={40} />
                <h3 className="mb-2 text-3xl font-bold leading-9">
                  Easy Updates
                </h3>
                <p className="mb-2 text-lg leading-6">
                  Keep your portfolio up-to-date with our easy-to-use interface.
                </p>
              </div>
            </div>
          </animated.section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
