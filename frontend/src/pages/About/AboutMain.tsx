import React, { useMemo, useRef, useState } from "react";
import AboutData from "Type/AboutData.tsx";
import {
  updateDescriptionOneAbout,
  updateDescriptionTwoAbout,
  updateHeaderOneAbout,
  updateHeaderTwoAbout,
} from "./aboutapi.tsx";
import { Link } from "react-router-dom";
import Marquee from "Components/Marquee/Marquee.tsx";
import UserData from "Type/UserData.tsx";
import { useSpring, animated } from "react-spring";
import ErrorStatus from "Components/ErrorStatus/ErrorStatus.tsx";

const AboutMain: React.FC<{
  userData: UserData;
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
}> = ({ userData, pageData, setPageData }) => {
  const [iconOneEdit, setIconOneEdit] = useState<boolean>(false);
  const iconOneFileInput = useRef<HTMLInputElement | null>(null);
  const [iconTwoEdit, setIconTwoEdit] = useState<boolean>(false);
  const iconTwoFileInput = useRef<HTMLInputElement | null>(null);
  const [iconThreeEdit, setIconThreeEdit] = useState<boolean>(false);
  const iconThreeFileInput = useRef<HTMLInputElement | null>(null);

  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.headerOne
  );
  const [headerTwoEdit, setHeaderTwoEdit] = useState(false);
  const [headerTwoEditValue, setHeaderTwoEditValue] = useState(
    pageData.headerTwo
  );
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.descriptionOne
  );
  const [descriptionTwoEdit, setDescriptionTwoEdit] = useState(false);
  const [descriptionTwoEditValue, setDescriptionTwoEditValue] = useState(
    pageData.descriptionTwo
  );
  const descriptionTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const date = useMemo(() => Date.now(), []);
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });
  const [iconOneLoading, setIconOneLoading] = useState<boolean>(false);
  const [iconTwoLoading, setIconTwoLoading] = useState<boolean>(false);
  const [iconThreeLoading, setIconThreeLoading] = useState<boolean>(false);

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

  const handleFileUpload = async (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof AboutData,
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (!e.target.files) return;
    setEdit(true);
    if (type === "iconOne") setIconOneLoading(true);
    if (type === "iconTwo") setIconTwoLoading(true);
    if (type === "iconThree") setIconThreeLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`http://localhost:8080/${path}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.status !== "OK") {
        setEdit(false);
        if (type === "iconOne") setIconOneLoading(false);
        if (type === "iconTwo") setIconTwoLoading(false);
        if (type === "iconThree") setIconThreeLoading(false);
        if (data.status === "ERROR") {
          setShowError({ visible: true, message: data.message });
          setTimeout(() => setShowError({ visible: false, message: "" }), 3000);
          return;
        }
        return;
      }

      setPageData({
        ...pageData,
        [imageKey]: `${data.data.url}?timestamp=${new Date().getTime()}`,
      });
      if (type === "iconOne") setTimeout(() => setIconOneLoading(false), 500);
      if (type === "iconTwo") setTimeout(() => setIconTwoLoading(false), 500);
      if (type === "iconThree")
        setTimeout(() => setIconThreeLoading(false), 500);
      setTimeout(() => setEdit(false), 500);
    } catch (error) {
      setEdit(false);
      if (type === "iconOne") setIconOneLoading(false);
      if (type === "iconTwo") setIconTwoLoading(false);
      if (type === "iconThree") setIconThreeLoading(false);
      console.error("Error uploading file: ", error);
    }
  };

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneAbout(headerOneEditValue);
    if (updateHeader) {
      setPageData((prev) => ({ ...prev, headerOne: headerOneEditValue }));
      setHeaderOneEditValue(updateHeader);
    }
    setHeaderOneEdit(false);
  };
  const handleHeaderTwoSubmit = async () => {
    const updateHeader = await updateHeaderTwoAbout(headerTwoEditValue);
    if (updateHeader) {
      setPageData((prev) => ({ ...prev, headerTwo: headerTwoEditValue }));
      setHeaderTwoEditValue(updateHeader);
    }
    setHeaderTwoEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updateHeader = await updateDescriptionOneAbout(
      descriptionOneEditValue
    );
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        descriptionOne: descriptionOneEditValue,
      }));
      setDescriptionOneEditValue(updateHeader);
    }
    setDescriptionOneEdit(false);
  };

  const handleDescriptionTwoSubmit = async () => {
    const updateHeader = await updateDescriptionTwoAbout(
      descriptionTwoEditValue
    );
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        descriptionTwo: descriptionTwoEditValue,
      }));
      setDescriptionTwoEditValue(updateHeader);
    }
    setDescriptionTwoEdit(false);
  };

  return (
    <>
      <div className="container mx-auto my-20 max-w-screen-lg px-5">
        {showError.visible && <ErrorStatus message={showError.message} />}
        <section className="about mb-20 grid grid-cols-2 justify-center gap-10 md:h-[400px] md:grid-cols-5">
          <animated.div
            style={headerAnimation}
            className="col-span-2 flex flex-col justify-center md:order-2 md:col-span-3"
          >
            <div>
              {headerOneEdit ? (
                <textarea
                  ref={headerOneTextareaRef}
                  value={headerOneEditValue}
                  onChange={(e) => setHeaderOneEditValue(e.target.value)}
                  onBlur={() => {
                    setHeaderOneEditValue(pageData.headerOne);
                    setHeaderOneEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleHeaderOneSubmit();
                    }
                  }}
                  className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-5xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 md:text-7xl"
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={50}
                />
              ) : (
                <h2
                  className="mb-5 cursor-pointer select-none text-center text-5xl font-bold transition-all hover:opacity-50 md:text-7xl"
                  onClick={() => setHeaderOneEdit(true)}
                >
                  {pageData.headerOne}
                </h2>
              )}
            </div>
            <div className="ml-5">
              {descriptionOneEdit ? (
                <textarea
                  ref={descriptionOneTextareaRef}
                  value={descriptionOneEditValue}
                  onChange={(e) => setDescriptionOneEditValue(e.target.value)}
                  onBlur={() => {
                    setDescriptionOneEditValue(pageData.descriptionOne);
                    setDescriptionOneEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleDescriptionOneSubmit();
                    }
                  }}
                  className="mb-5 resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-2xl font-semibold leading-snug outline-none focus:outline-none focus:ring-0"
                  style={{ minHeight: "8em" }}
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={250}
                />
              ) : (
                <p
                  className="mb-5 cursor-pointer select-none text-center text-2xl font-semibold transition-all hover:opacity-50"
                  onClick={() => setDescriptionOneEdit(true)}
                >
                  {pageData.descriptionOne}
                </p>
              )}
            </div>
            <div className="flex justify-center text-center">
              <Link
                to="/contact"
                className="mb-4 inline-block rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500"
              >
                Get in touch
              </Link>
            </div>
          </animated.div>
          <animated.div
            style={imageAnimation}
            className={`image-wrapper relative order-2 h-[150px] w-[150px] text-center md:order-1 md:self-end ${
              iconOneLoading ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={() => setIconOneEdit(true)}
            onMouseLeave={() => setIconOneEdit(false)}
            onClick={() => {
              iconOneFileInput.current && iconOneFileInput.current.click();
            }}
          >
            <input
              type="file"
              ref={iconOneFileInput}
              className="hidden"
              accept=".jpg,.png"
              onChange={async (e) => {
                await handleFileUpload(
                  "about-icon-one-upload",
                  setIconOneEdit,
                  "iconOne",
                  e,
                  "iconOne"
                );
              }}
            />
            <div className="h-full w-full overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={pageData.iconOne + "?date=" + date}
                alt="portfolio"
              />
            </div>

            <div
              className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-8 border-dashed border-black bg-white text-xl font-bold text-black transition-all ${
                iconOneEdit ? "opacity-50" : "opacity-0"
              }`}
            >
              click to upload image
            </div>
          </animated.div>

          <animated.div
            style={imageAnimation}
            className={`image-wrapper relative order-last h-[150px] w-[150px] text-center md:self-start ${
              iconTwoLoading ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={() => setIconTwoEdit(true)}
            onMouseLeave={() => setIconTwoEdit(false)}
            onClick={() =>
              iconTwoFileInput.current && iconTwoFileInput.current.click()
            }
          >
            <input
              type="file"
              ref={iconTwoFileInput}
              className="hidden"
              accept=".jpg,.png"
              onChange={async (e) => {
                await handleFileUpload(
                  "about-icon-two-upload",
                  setIconTwoEdit,
                  "iconTwo",
                  e,
                  "iconTwo"
                );
              }}
            />
            <div className="h-full w-full overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={pageData.iconTwo + "?date=" + date}
                alt="portfolio"
              />
            </div>
            <div
              className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-8 border-dashed border-black bg-white text-xl font-bold text-black transition-all ${
                iconTwoEdit ? "opacity-50" : "opacity-0"
              }`}
            >
              click to upload image
            </div>
          </animated.div>
        </section>
      </div>
      <animated.section style={descriptionAnimation} className="story mb-20">
        <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 md:grid md:grid-cols-2 md:items-start md:justify-between">
          <div className="content-left">
            <div className="flex justify-center md:justify-between">
              {headerTwoEdit ? (
                <textarea
                  ref={headerTwoTextareaRef}
                  value={headerTwoEditValue}
                  onChange={(e) => setHeaderTwoEditValue(e.target.value)}
                  onBlur={() => {
                    setHeaderTwoEditValue(pageData.headerTwo);
                    setHeaderTwoEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleHeaderTwoSubmit();
                    }
                  }}
                  className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-4xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 lg:text-left lg:text-6xl lg:leading-tight"
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={25}
                />
              ) : (
                <h2
                  className="mb-8 cursor-pointer select-none text-center text-4xl font-bold transition-all hover:opacity-50 lg:text-left lg:text-6xl lg:leading-tight"
                  onClick={() => setHeaderTwoEdit(true)}
                >
                  {pageData.headerTwo}
                </h2>
              )}
            </div>
            <div
              className={`image-wrapper relative mb-5 h-60 w-full transition-all sm:mx-auto sm:h-[200px] sm:w-[300px] md:mx-0 md:h-[200px] md:w-[400px] lg:h-72 lg:w-[500px] ${
                iconThreeLoading ? "opacity-0" : "opacity-100"
              }`}
              onMouseEnter={() => setIconThreeEdit(true)}
              onMouseLeave={() => setIconThreeEdit(false)}
              onClick={() =>
                iconThreeFileInput.current && iconThreeFileInput.current.click()
              }
            >
              <input
                type="file"
                ref={iconThreeFileInput}
                className="hidden"
                accept=".jpg,.png"
                onChange={async (e) => {
                  await handleFileUpload(
                    "about-icon-three-upload",
                    setIconThreeEdit,
                    "iconThree",
                    e,
                    "iconThree"
                  );
                }}
              />
              <div className="h-full w-full overflow-hidden rounded-3xl border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={pageData.iconThree + "?date=" + date}
                  alt="portfolio"
                />
              </div>
              <div
                className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border-8 border-dashed border-black bg-white text-3xl font-bold text-black transition-all ${
                  iconThreeEdit ? "opacity-50" : "opacity-0"
                }`}
              >
                click to upload image
              </div>
            </div>
            {descriptionTwoEdit ? (
              <textarea
                ref={descriptionTwoTextareaRef}
                value={descriptionTwoEditValue}
                onChange={(e) => setDescriptionTwoEditValue(e.target.value)}
                onBlur={() => {
                  setDescriptionTwoEditValue(pageData.descriptionTwo);
                  setDescriptionTwoEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleDescriptionTwoSubmit();
                  }
                }}
                className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-2xl font-semibold leading-snug outline-none focus:outline-none focus:ring-0"
                style={{ minHeight: "8em" }}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                maxLength={250}
              />
            ) : (
              <p
                className="mb-5 cursor-pointer select-none text-2xl font-semibold transition-all hover:opacity-50"
                onClick={() => setDescriptionTwoEdit(true)}
              >
                {pageData.descriptionTwo}
              </p>
            )}
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

export default AboutMain;
