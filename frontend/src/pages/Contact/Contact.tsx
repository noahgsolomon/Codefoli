import Accordion from "Components/Accordion/Accordion";
import Footer from "Components/Footer/Footer";
import Form from "./Form/Form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import UserData from "Type/UserData.tsx";
import ContactData from "Type/ContactData.tsx";

const Contact: React.FC<{ userData: UserData; pageData: ContactData }> = ({
  userData,
  pageData,
}) => {
  console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/");
    } else if (localStorage.getItem("role") === "NEWBIE") {
      navigate("/setup");
    }
  }, [navigate]);

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const faqAnimationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <div className="wrapper items-center gap-10 md:flex">
            <animated.div
              style={animationProps}
              className="content mx-auto max-w-lg md:mx-0"
            >
              <h2 className="text-center text-5xl font-bold md:text-left md:text-6xl">
                {pageData.headerOne}
              </h2>
              <p className="text-center md:text-left">
                {pageData.descriptionOne}
              </p>
              <div className="mb-5">
                <div className="card contact-card rounded-lg border-2 border-black p-5">
                  <a
                    href={`mailto:${pageData.email}`}
                    className="mb-8 inline-block"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="envelope icon"
                      />
                      <div className="contact-link">{pageData.email}</div>
                    </div>
                  </a>

                  <a href={`tel:${pageData.phone}`} className="">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="phone icon"
                      />
                      <div className="contact-link">{pageData.phone}</div>
                    </div>
                  </a>
                </div>
              </div>
            </animated.div>

            <Form />
          </div>
        </div>

        {/* FAQs */}
        <animated.section style={faqAnimationProps} className="px-5">
          <div className="header mx-auto mb-5 max-w-[647px]">
            <h2 className="text-center text-2xl font-bold md:text-5xl">
              {pageData.headerTwo}
            </h2>
            <p className="text-center">{pageData.descriptionTwo}</p>
          </div>
          <div className="accordion-wrapper mx-auto max-w-[800px]">
            {pageData.faq.map((faq, index) => (
              <Accordion
                key={index}
                title={faq.question}
                content={faq.answer}
              />
            ))}
          </div>
        </animated.section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
