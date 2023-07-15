import React, { SetStateAction, useRef, useState } from "react";
import { StoryType } from "Type/Section.tsx";
import {
  updateBulletOneStory,
  updateBulletThreeStory,
  updateBulletTwoStory,
  updateDescriptionOneStory,
  updateHeaderOneStory,
} from "Components/Sections/Story/storyapi.tsx";
import PageType from "Type/Pages.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";

const StorySection: React.FC<{
  page: PageType;
  details: StoryType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
  order: number;
}> = ({ page, details, setPageData, order }) => {
  const [imageOneEdit, setImageOneEdit] = useState<boolean>(false);
  const imageOneFileInput = useRef<HTMLInputElement | null>(null);
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    details.descriptionOne
  );
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.headerOne
  );
  const [bulletOneEdit, setBulletOneEdit] = useState(false);
  const [bulletOneEditValue, setBulletOneEditValue] = useState(
    details.bulletOne
  );
  const [bulletTwoEdit, setBulletTwoEdit] = useState(false);
  const [bulletTwoEditValue, setBulletTwoEditValue] = useState(
    details.bulletTwo
  );
  const [bulletThreeEdit, setBulletThreeEdit] = useState(false);
  const [bulletThreeEditValue, setBulletThreeEditValue] = useState(
    details.bulletThree
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [StoryHover, setStoryHover] = useState<boolean>(false);
  const [removeStory, setRemoveStory] = useState<boolean>(false);

  const handleDescriptionOneSubmit = async () => {
    const updateDescription = await updateDescriptionOneStory(
      descriptionOneEditValue
    );
    if (updateDescription) {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: {
                  ...section.details,
                  descriptionOne: descriptionOneEditValue,
                },
              }
            : section
        ),
      }));
      setDescriptionOneEditValue(updateDescription);
    }
    setDescriptionOneEdit(false);
  };

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneStory(headerOneEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, headerOne: headerOneEditValue },
              }
            : section
        ),
      }));
      setHeaderOneEditValue(updateHeader);
    }
    setHeaderOneEdit(false);
  };

  const handleBulletOneSubmit = async () => {
    const updateBullet = await updateBulletOneStory(bulletOneEditValue);
    if (updateBullet) {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, bulletOne: bulletOneEditValue },
              }
            : section
        ),
      }));
      setBulletOneEditValue(updateBullet);
    }
    setBulletOneEdit(false);
  };

  const handleBulletTwoSubmit = async () => {
    const updateBullet = await updateBulletTwoStory(bulletTwoEditValue);
    if (updateBullet) {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, bulletTwo: bulletTwoEditValue },
              }
            : section
        ),
      }));
      setBulletOneEditValue(updateBullet);
    }
    setBulletTwoEdit(false);
  };

  const handleBulletThreeSubmit = async () => {
    const updateBullet = await updateBulletThreeStory(bulletThreeEditValue);
    if (updateBullet) {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: {
                  ...section.details,
                  bulletThree: bulletThreeEditValue,
                },
              }
            : section
        ),
      }));
      setBulletOneEditValue(updateBullet);
    }
    setBulletThreeEdit(false);
  };

  const handleFileUpload = async (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof StoryType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setEdit(true);
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
        return;
      }

      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: {
                  ...section.details,
                  [imageKey]: data.data.url + `?date=${new Date()}`,
                },
              }
            : section
        ),
      }));
      setTimeout(() => setEdit(false), 500);
    } catch (error) {
      setEdit(false);
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <section
      className="story relative mb-20 mt-20 bg-black transition-all"
      onMouseEnter={() => setStoryHover(true)}
      onMouseLeave={() => setStoryHover(false)}
    >
      {removeStory && (
        <div
          className={` absolute inset-0 z-10 bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          StoryHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveStory(true)}
        onMouseLeave={() => setRemoveStory(false)}
        onClick={async () => {
          const remove = await removeSection(page, "STORY", order);
          if (remove) {
            setPageData((prev) => {
              const removedSection = prev.sections.find(
                (section) => section.type === "STORY"
              );
              if (!removedSection) {
                return prev;
              }
              const removedOrder = removedSection.details.order;
              const updatedSections = prev.sections
                .filter((section) => section.type !== "STORY")
                .map((section) => {
                  if (section.details.order > removedOrder) {
                    return {
                      ...section,
                      details: {
                        ...section.details,
                        order: section.details.order - 1,
                      },
                    };
                  } else {
                    return section;
                  }
                });

              return {
                ...prev,
                sections: updatedSections,
              };
            });
          }
        }}
      >
        -
      </button>
      <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
        <div className="content-left">
          {headerOneEdit ? (
            <textarea
              ref={headerOneTextareaRef}
              value={headerOneEditValue}
              onChange={(e) => setHeaderOneEditValue(e.target.value)}
              onBlur={() => {
                setHeaderOneEditValue(details.headerOne);
                setHeaderOneEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleHeaderOneSubmit();
                }
              }}
              className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-4xl font-bold text-white outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-tight"
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              maxLength={50}
            />
          ) : (
            <h2
              className="mb-8 cursor-pointer select-none text-4xl font-bold text-white transition-all hover:opacity-50 md:text-5xl md:leading-tight"
              onClick={() => setHeaderOneEdit(true)}
            >
              {details.headerOne}
            </h2>
          )}
          {descriptionOneEdit ? (
            <textarea
              ref={descriptionOneTextareaRef}
              value={descriptionOneEditValue}
              onChange={(e) => setDescriptionOneEditValue(e.target.value)}
              onBlur={() => {
                setDescriptionOneEditValue(details.descriptionOne);
                setDescriptionOneEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleDescriptionOneSubmit();
                }
              }}
              className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
              style={{ minHeight: "14rem" }}
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              maxLength={250}
            />
          ) : (
            <p
              className="description cursor-pointer select-none text-lg font-semibold text-white transition-all hover:opacity-50"
              onClick={() => setDescriptionOneEdit(true)}
            >
              {details.descriptionOne}
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
                    setBulletOneEditValue(details.bulletOne);
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
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletOneEdit(true)}
                >
                  {details.bulletOne}
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
                    setBulletTwoEditValue(details.bulletTwo);
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
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletTwoEdit(true)}
                >
                  {details.bulletTwo}
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
                    setBulletThreeEditValue(details.bulletThree);
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
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  maxLength={250}
                />
              ) : (
                <p
                  className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                  onClick={() => setBulletThreeEdit(true)}
                >
                  {details.bulletThree}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="content-right flex items-center justify-center">
          <div
            className={`image-wrapper relative mb-5 h-[400px] w-[400px] transition-all`}
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
            <div className="h-full w-full overflow-hidden rounded-3xl">
              <img
                src={details.imageOne}
                alt=""
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
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
