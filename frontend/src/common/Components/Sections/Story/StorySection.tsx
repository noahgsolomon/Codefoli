import React, { SetStateAction, useMemo, useRef, useState } from "react";
import { StoryType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { updateText } from "api/updatetext.tsx";

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
    details.description_one
  );
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.header_one
  );
  const [bulletOneEdit, setBulletOneEdit] = useState(false);
  const [bulletOneEditValue, setBulletOneEditValue] = useState(
    details.bullet_one
  );
  const [bulletTwoEdit, setBulletTwoEdit] = useState(false);
  const [bulletTwoEditValue, setBulletTwoEditValue] = useState(
    details.bullet_two
  );
  const [bulletThreeEdit, setBulletThreeEdit] = useState(false);
  const [bulletThreeEditValue, setBulletThreeEditValue] = useState(
    details.bullet_three
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [StoryHover, setStoryHover] = useState<boolean>(false);
  const [removeStory, setRemoveStory] = useState<boolean>(false);
  const date = useMemo(() => Date.now(), []);
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  const handleDescriptionOneSubmit = async () => {
    if (
      descriptionOneEditValue.length > 500 ||
      descriptionOneEditValue.length < 1
    ) {
      setDescriptionOneEdit(false);
      setDescriptionOneEditValue(details.description_one);
      return;
    }
    const updateDescription = await updateText(
      "description_one",
      descriptionOneEditValue,
      "story_section"
    );
    if (updateDescription.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: {
                  ...section.details,
                  description_one: descriptionOneEditValue,
                },
              }
            : section
        ),
      }));
    }
    setDescriptionOneEdit(false);
  };

  const handleHeaderOneSubmit = async () => {
    if (headerOneEditValue.length > 50 || headerOneEditValue.length < 1) {
      setHeaderOneEdit(false);
      setHeaderOneEditValue(details.header_one);
      return;
    }
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "story_section"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, header_one: headerOneEditValue },
              }
            : section
        ),
      }));
    }
    setHeaderOneEdit(false);
  };

  const handleBulletOneSubmit = async () => {
    if (bulletOneEditValue.length > 250 || bulletOneEditValue.length < 1) {
      setBulletOneEdit(false);
      setBulletOneEditValue(details.bullet_one);
      return;
    }
    const updateBullet = await updateText(
      "bullet_one",
      bulletOneEditValue,
      "story_section"
    );
    if (updateBullet.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, bullet_one: bulletOneEditValue },
              }
            : section
        ),
      }));
    }
    setBulletOneEdit(false);
  };

  const handleBulletTwoSubmit = async () => {
    if (bulletTwoEditValue.length > 250 || bulletTwoEditValue.length < 1) {
      setBulletTwoEdit(false);
      setBulletTwoEditValue(details.bullet_two);
      return;
    }
    const updateBullet = await updateText(
      "bullet_two",
      bulletTwoEditValue,
      "story_section"
    );
    if (updateBullet.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: { ...section.details, bullet_two: bulletTwoEditValue },
              }
            : section
        ),
      }));
    }
    setBulletTwoEdit(false);
  };

  const handleBulletThreeSubmit = async () => {
    if (bulletThreeEditValue.length > 250 || bulletThreeEditValue.length < 1) {
      setBulletThreeEdit(false);
      setBulletThreeEditValue(details.bullet_three);
      return;
    }
    const updateBullet = await updateText(
      "bullet_three",
      bulletThreeEditValue,
      "story_section"
    );
    if (updateBullet.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "STORY"
            ? {
                ...section,
                details: {
                  ...section.details,
                  bullet_three: bulletThreeEditValue,
                },
              }
            : section
        ),
      }));
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
    setImageLoading(true);
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
        setImageLoading(false);
        setEdit(false);
        if (data.status === "ERROR") {
          setImageLoading(false);
          setShowError({ visible: true, message: data.message });
          setTimeout(() => setShowError({ visible: false, message: "" }), 3000);
          return;
        }
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
      setTimeout(() => setImageLoading(false), 500);
    } catch (error) {
      setEdit(false);
      setImageLoading(false);
      console.error("Error uploading file: ", error);
    }
  };

  const handleRemoveStorySection = async () => {
    const remove = await addRemoveSection(page, "STORY", order, "remove");
    if (remove.status === "OK") {
      setPageData((prev) => {
        const removedSection = prev.sections.find(
          (section) => section.type === "STORY"
        );
        if (!removedSection) {
          return prev;
        }
        const removedOrder = removedSection.details.page_order;
        const updatedSections = prev.sections
          .filter((section) => section.type !== "STORY")
          .map((section) => {
            if (section.details.page_order > removedOrder) {
              return {
                ...section,
                details: {
                  ...section.details,
                  page_order: section.details.page_order - 1,
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
  };

  return (
    <section
      className="story relative mb-20 mt-20 bg-black transition-all"
      onMouseEnter={() => setStoryHover(true)}
      onMouseLeave={() => setStoryHover(false)}
    >
      {showError.visible && (
        <StatusBar message={showError.message} color={"bg-red-400"} />
      )}
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
        onClick={async () => await handleRemoveStorySection()}
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
                setHeaderOneEditValue(details.header_one);
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
              {details.header_one}
            </h2>
          )}
          {descriptionOneEdit ? (
            <textarea
              ref={descriptionOneTextareaRef}
              value={descriptionOneEditValue}
              onChange={(e) => setDescriptionOneEditValue(e.target.value)}
              onBlur={() => {
                setDescriptionOneEditValue(details.description_one);
                setDescriptionOneEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleDescriptionOneSubmit();
                }
              }}
              className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              rows={10}
              maxLength={500}
            />
          ) : (
            <p
              className="description cursor-pointer select-none text-lg font-semibold text-white transition-all hover:opacity-50"
              onClick={() => setDescriptionOneEdit(true)}
            >
              {details.description_one}
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
                    setBulletOneEditValue(details.bullet_one);
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
                  {details.bullet_one}
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
                    setBulletTwoEditValue(details.bullet_two);
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
                  {details.bullet_two}
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
                    setBulletThreeEditValue(details.bullet_three);
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
                  {details.bullet_three}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="content-right flex items-center justify-center">
          <div
            className={`image-wrapper relative mb-5 h-[400px] w-[400px] transition-all ${
              imageLoading ? "opacity-0" : "opacity-100"
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
                  "image_one",
                  e
                );
              }}
            />
            <div className="h-full w-full overflow-hidden rounded-3xl">
              <img
                src={details.image_one + "?date=" + date}
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
