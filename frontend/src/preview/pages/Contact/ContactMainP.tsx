import { animated, useSpring } from "react-spring";
import { FC } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import FormP from "./Form/FormP.tsx";

const ContactMain: FC<{
    pageData: ContactData;
    userData: UserData;
}> = ({ pageData, userData }) => {
    const animationProps = useSpring({
        from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
        delay: 100,
    });

    return (
        <main>
            <div className="container mx-auto my-20 max-w-screen-lg px-5">
                <div className="wrapper items-center gap-10 md:flex">
                    <animated.div
                        style={animationProps}
                        className="content mx-auto max-w-lg md:mx-0"
                    >
                        <h2
                            className="  text-center text-5xl font-bold transition-all md:text-left md:text-6xl"                         >
                            {pageData.headerOne}
                        </h2>
                        <p className=" transition-all md:text-left">
                            {pageData.descriptionOne}
                        </p>
                        <div className="mb-5">
                            <div className="card contact-card rounded-lg border-2 border-black p-5">
                                <div className="mb-8 inline-block w-full">
                                    <div className="flex items-center justify-center gap-4">
                                        <img
                                            src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                                            loading="eager"
                                            alt="envelope icon"
                                        />
                                        <a href={`mailto:${userData.email}`} className="w-full transition-all">
                                            <p className={'transition-all hover:opacity-80 hover:text-blue-500'}>{userData.email}</p>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                                        loading="eager"
                                        alt="phone icon"
                                    />
                                    <a href={`tel:${userData.phone}`} className="w-full transition-all">
                                        <p className={'transition-all hover:opacity-80 hover:text-blue-500'}>{userData.phone}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                    <FormP />
                </div>
            </div>
        </main>
    );
};

export default ContactMain;
