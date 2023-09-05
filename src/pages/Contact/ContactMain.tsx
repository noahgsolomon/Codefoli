import { animated, useSpring } from "react-spring";
import Form from "./Form/Form.tsx";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import ContactData from "Type/ContactData.tsx";
import UserData from "Type/UserData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { updateText } from "api/updatetext.tsx";

const ContactMain: FC<{
  pageData: ContactData;
  setPageData: Dispatch<SetStateAction<ContactData>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}> = ({ setPageData, pageData, userData, setUserData }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const [emailError, setEmailError] = useState(false);
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.header_one
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.description_one
  );
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [emailEdit, setEmailEdit] = useState(false);
  const [emailEditValue, setEmailEditValue] = useState(userData.email);
  const emailTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [phoneEdit, setPhoneEdit] = useState(false);
  const [phoneEditValue, setPhoneEditValue] = useState(userData.phone);
  const phoneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleHeaderOneSubmit = async () => {
    const updatedText = await updateText(
      "header_one",
      headerOneEditValue,
      "contact"
    );
    if (updatedText.status === "OK") {
      setPageData((prev) => ({ ...prev, header_one: headerOneEditValue }));
    }
    setHeaderOneEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updatedText = await updateText(
      "description_one",
      descriptionOneEditValue,
      "contact"
    );
    if (updatedText.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        description_one: descriptionOneEditValue,
      }));
    }
    setDescriptionOneEdit(false);
  };

  const handleEmailSubmit = async () => {
    const updateEmail = await updateText("email", emailEditValue, "users");
    if (updateEmail.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        email: emailEditValue,
      }));
    } else {
      setEmailEditValue(userData.email);
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    }
    setEmailEdit(false);
  };

  const handlePhoneSubmit = async () => {
    const updatePhone = await updateText("phone", phoneEditValue, "users");
    console.log(updatePhone);
    if (updatePhone.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        phone: phoneEditValue,
      }));
    }
    setPhoneEdit(false);
  };

  return (
    <main>
      <div className="container mx-auto my-20 max-w-screen-lg px-5">
        <div className="wrapper items-center gap-10 md:flex">
          <animated.div
            style={animationProps}
            className="content mx-auto max-w-lg md:mx-0 md:min-w-[25rem]"
          >
            {headerOneEdit ? (
              <textarea
                ref={headerOneTextareaRef}
                value={headerOneEditValue}
                onChange={(e) => setHeaderOneEditValue(e.target.value)}
                onBlur={() => {
                  setHeaderOneEditValue(pageData.header_one);
                  setHeaderOneEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleHeaderOneSubmit();
                  }
                }}
                className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-5xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 md:text-left md:text-6xl"
                autoFocus
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "";
                  target.style.height = `${target.scrollHeight}px`;
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "";
                  target.style.height = `${target.scrollHeight}px`;
                  e.currentTarget.select();
                }}
                maxLength={50}
              />
            ) : (
              <h2
                className="cursor-pointer select-none text-center text-5xl font-bold transition-all hover:opacity-50 md:text-left md:text-6xl"
                onClick={() => setHeaderOneEdit(true)}
              >
                {pageData.header_one}
              </h2>
            )}
            {descriptionOneEdit ? (
              <textarea
                ref={descriptionOneTextareaRef}
                value={descriptionOneEditValue}
                onChange={(e) => setDescriptionOneEditValue(e.target.value)}
                onBlur={() => {
                  setDescriptionOneEditValue(pageData.description_one);
                  setDescriptionOneEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleDescriptionOneSubmit();
                  }
                }}
                className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-xl leading-relaxed outline-none focus:outline-none focus:ring-0 md:text-left"
                autoFocus
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "";
                  target.style.height = `${target.scrollHeight}px`;
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "";
                  target.style.height = `${target.scrollHeight}px`;
                  e.currentTarget.select();
                }}
                maxLength={250}
              />
            ) : (
              <p
                className="cursor-pointer text-center text-xl leading-relaxed transition-all hover:opacity-50 md:text-left"
                onClick={() => setDescriptionOneEdit(true)}
              >
                {pageData.description_one}
              </p>
            )}
            <div className="mb-5">
              <div className="card contact-card rounded-lg border-2 border-black p-5">
                <div className="mb-8 inline-block w-full">
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                      loading="eager"
                      alt="envelope icon"
                    />
                    {emailEdit ? (
                      <textarea
                        ref={emailTextareaRef}
                        value={emailEditValue}
                        onChange={(e) => setEmailEditValue(e.target.value)}
                        onBlur={() => {
                          setEmailEditValue(userData.email);
                          setEmailEdit(false);
                        }}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            await handleEmailSubmit();
                          }
                        }}
                        className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg leading-snug outline-none focus:outline-none focus:ring-0"
                        autoFocus
                        onFocus={(e) => {
                          e.currentTarget.select();
                        }}
                        maxLength={40}
                        rows={1}
                      />
                    ) : (
                      <p
                        className="w-full cursor-pointer select-none transition-all hover:opacity-50"
                        onClick={() => setEmailEdit(true)}
                      >
                        {userData.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                    loading="eager"
                    alt="phone icon"
                  />
                  {phoneEdit ? (
                    <textarea
                      ref={phoneTextareaRef}
                      value={phoneEditValue}
                      onChange={(e) => setPhoneEditValue(e.target.value)}
                      onBlur={() => {
                        setPhoneEditValue(userData.phone);
                        setPhoneEdit(false);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          await handlePhoneSubmit();
                        }
                      }}
                      className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg leading-snug outline-none focus:outline-none focus:ring-0"
                      autoFocus
                      onFocus={(e) => {
                        e.currentTarget.select();
                      }}
                      maxLength={30}
                      rows={1}
                    />
                  ) : (
                    <p
                      className="w-full cursor-pointer select-none transition-all hover:opacity-50"
                      onClick={() => setPhoneEdit(true)}
                    >
                      {userData.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </animated.div>

          <Form userData={userData} />
        </div>
      </div>
      {emailError && (
        <StatusBar message={"Email is already taken"} color={"bg-red-500"} />
      )}
    </main>
  );
};

export default ContactMain;
