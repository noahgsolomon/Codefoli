import React, { useRef, useState } from "react";
import {
  changeSectionTwoActive,
  updateBulletOneAbout,
  updateBulletThreeAbout,
  updateBulletTwoAbout,
  updateDescriptionTwoAbout,
  updateHeaderThreeAbout,
} from "../../../pages/About/aboutapi.tsx";
import AboutData from "Type/AboutData.tsx";

const StorySection: React.FC<{
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
  pageData: AboutData;
  handleFileUpload: (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof AboutData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}> = ({ setPageData, pageData, handleFileUpload }) => {
  const [imageOneEdit, setImageOneEdit] = useState<boolean>(false);
  const imageOneFileInput = useRef<HTMLInputElement | null>(null);
  const [descriptionTwoEdit, setDescriptionTwoEdit] = useState(false);
  const [descriptionTwoEditValue, setDescriptionTwoEditValue] = useState(
    pageData.descriptionTwo
  );
  const [headerThreeEdit, setHeaderThreeEdit] = useState(false);
  const [headerThreeEditValue, setHeaderThreeEditValue] = useState(
    pageData.headerThree
  );
  const [bulletOneEdit, setBulletOneEdit] = useState(false);
  const [bulletOneEditValue, setBulletOneEditValue] = useState(
    pageData.bulletOne
  );
  const [bulletTwoEdit, setBulletTwoEdit] = useState(false);
  const [bulletTwoEditValue, setBulletTwoEditValue] = useState(
    pageData.bulletTwo
  );
  const [bulletThreeEdit, setBulletThreeEdit] = useState(false);
  const [bulletThreeEditValue, setBulletThreeEditValue] = useState(
    pageData.bulletThree
  );
  const headerThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [sectionTwoHover, setSectionTwoHover] = useState<boolean>(false);
  const [removeSectionTwoHover, setRemoveSectionTwoHover] =
    useState<boolean>(false);

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

  const handleHeaderThreeSubmit = async () => {
    const updateHeader = await updateHeaderThreeAbout(headerThreeEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        headerThree: headerThreeEditValue,
      }));
      setHeaderThreeEditValue(updateHeader);
    }
    setHeaderThreeEdit(false);
  };

  const handleBulletTwoSubmit = async () => {
    const updateHeader = await updateBulletTwoAbout(bulletTwoEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        bulletTwo: bulletTwoEditValue,
      }));
      setBulletTwoEditValue(updateHeader);
    }
    setBulletTwoEdit(false);
  };

  const handleBulletOneSubmit = async () => {
    const updateHeader = await updateBulletOneAbout(bulletOneEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        bulletOne: bulletOneEditValue,
      }));
      setBulletOneEditValue(updateHeader);
    }
    setBulletOneEdit(false);
  };

  const handleBulletThreeSubmit = async () => {
    const updateHeader = await updateBulletThreeAbout(bulletThreeEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        bulletThree: bulletThreeEditValue,
      }));
      setBulletThreeEditValue(updateHeader);
    }
    setBulletThreeEdit(false);
  };

  return (
    <section
      className="story relative mb-20 bg-black transition-all"
      onMouseEnter={() => setSectionTwoHover(true)}
      onMouseLeave={() => setSectionTwoHover(false)}
    >
      {removeSectionTwoHover && (
        <div
          className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          sectionTwoHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveSectionTwoHover(true)}
        onMouseLeave={() => setRemoveSectionTwoHover(false)}
        onClick={async () => {
          const changeSectionTwo = await changeSectionTwoActive("true");
          if (changeSectionTwo) {
            setPageData((prev) => ({
              ...prev,
              sectionTwoActive: false,
            }));
          }
          setRemoveSectionTwoHover(false);
        }}
      >
        -
      </button>
      <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
        <div className="content-left">
          {headerThreeEdit ? (
            <textarea
              ref={headerThreeTextareaRef}
              value={headerThreeEditValue}
              onChange={(e) => setHeaderThreeEditValue(e.target.value)}
              onBlur={() => {
                setHeaderThreeEditValue(pageData.headerThree);
                setHeaderThreeEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleHeaderThreeSubmit();
                }
              }}
              className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-4xl font-bold text-white outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-tight"
              autoFocus
              maxLength={50}
            />
          ) : (
            <h2
              className="mb-8 cursor-pointer select-none text-4xl font-bold text-white transition-all hover:opacity-50 md:text-5xl md:leading-tight"
              onClick={() => setHeaderThreeEdit(true)}
            >
              {pageData.headerThree}
            </h2>
          )}
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
              className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
              style={{ minHeight: "14rem" }}
              autoFocus
              maxLength={250}
            />
          ) : (
            <p
              className="description cursor-pointer select-none text-lg font-semibold text-white transition-all hover:opacity-50"
              onClick={() => setDescriptionTwoEdit(true)}
            >
              {pageData.descriptionTwo}
            </p>
          )}

          <div className="events-wrapper my-5">
            <div className="event flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-indigo-600"></div>
              {bulletOneEdit ? (
                <textarea
                  ref={bulletOneTextareaRef}
                  value={bulletOneEditValue}
                  onChange={(e) => setBulletOneEditValue(e.target.value)}
                  onBlur={() => {
                    setBulletOneEditValue(pageData.bulletOne);
                    setBulletOneEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleBulletOneSubmit();
                    }
                  }}
                  className="w-full flex-1 resize-none appearance-none overflow-hidden border-none bg-transparent pt-0 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
                  autoFocus
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletOneEdit(true)}
                >
                  {pageData.bulletOne}
                </p>
              )}
            </div>
            <div className="event flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-sky-600"></div>
              {bulletTwoEdit ? (
                <textarea
                  ref={bulletTwoTextareaRef}
                  value={bulletTwoEditValue}
                  onChange={(e) => setBulletTwoEditValue(e.target.value)}
                  onBlur={() => {
                    setBulletTwoEditValue(pageData.bulletTwo);
                    setBulletTwoEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleBulletTwoSubmit();
                    }
                  }}
                  className="w-full flex-1 resize-none appearance-none overflow-hidden border-none bg-transparent pt-0 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
                  autoFocus
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletTwoEdit(true)}
                >
                  {pageData.bulletTwo}
                </p>
              )}
            </div>
            <div className="event flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-yellow-500"></div>
              {bulletThreeEdit ? (
                <textarea
                  ref={bulletThreeTextareaRef}
                  value={bulletThreeEditValue}
                  onChange={(e) => setBulletThreeEditValue(e.target.value)}
                  onBlur={() => {
                    setBulletThreeEditValue(pageData.bulletThree);
                    setBulletThreeEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleBulletThreeSubmit();
                    }
                  }}
                  className="w-full flex-1 resize-none appearance-none overflow-hidden border-none bg-transparent pt-0 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
                  autoFocus
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletThreeEdit(true)}
                >
                  {pageData.bulletThree}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="content-right flex items-center justify-center">
          <div
            className={`image-wrapper relative mb-5 max-w-[375px] transition-all ${
              removeSectionTwoHover ? "rounded-3xl bg-red-300 opacity-25" : ""
            }`}
            onMouseEnter={() => setImageOneEdit(true)}
            onMouseLeave={() => setImageOneEdit(false)}
            onClick={() =>
              imageOneFileInput.current && imageOneFileInput.current.click()
            }
          >
            <input
              type="file"
              ref={imageOneFileInput}
              className="hidden"
              accept=".jpg,.png"
              onChange={async (e) => {
                await handleFileUpload(
                  "about-image-one-upload",
                  setImageOneEdit,
                  "imageOne",
                  e
                );
              }}
            />
            <img src={pageData.imageOne} alt="" className="rounded-3xl" />
            <div
              className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border-8 border-dashed border-black bg-white text-3xl font-bold text-black transition-all ${
                imageOneEdit ? "opacity-50" : "opacity-0"
              }`}
            >
              click to upload image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
