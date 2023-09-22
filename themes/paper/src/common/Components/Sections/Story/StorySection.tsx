import React, {
  FocusEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { StoryType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { updateText } from "api/updatetext.tsx";
import { handleFileUpload } from "api/uploadimage.tsx";

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
  const [cacheBuster, setCacheBuster] = useState<string>("");
  const [bulletData, setBulletData] = useState({
    one: {
      edit: false,
      value: details.bullet_one,
    },
    two: {
      edit: false,
      value: details.bullet_two,
    },
    three: {
      edit: false,
      value: details.bullet_three,
    },
  });
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bulletTextareaRefs: Record<
    keyof typeof bulletData,
    RefObject<HTMLTextAreaElement>
  > = {
    one: bulletOneTextareaRef,
    two: bulletTwoTextareaRef,
    three: bulletThreeTextareaRef,
  };
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

  const updateBullets = (
    bulletKey: keyof typeof bulletData,
    value: Partial<(typeof bulletData)["one"]>
  ) => {
    setBulletData((prevBulletData) => ({
      ...prevBulletData,
      [bulletKey]: {
        ...prevBulletData[bulletKey],
        ...value,
      },
    }));
  };

  const handleBulletSubmit = async (bulletKey: keyof typeof bulletData) => {
    console.log("bulletData[bulletKey].value", bulletData[bulletKey].value);
    if (
      bulletData[bulletKey].value.length > 250 ||
      bulletData[bulletKey].value.length < 1
    ) {
      updateBullets(bulletKey, {
        edit: false,
        value: details[`bullet_${bulletKey}`],
      });
      return;
    }
    const updateBullet = await updateText(
      `bullet_${bulletKey}`,
      bulletData[bulletKey].value,
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
                  [`bullet_${bulletKey}`]: bulletData[bulletKey].value,
                },
              }
            : section
        ),
      }));
    }

    updateBullets(bulletKey, {
      edit: false,
    });
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

  const resizeTextarea = (target: HTMLTextAreaElement) => {
    target.style.height = "";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleTextareaInput = (e: MouseEvent<HTMLTextAreaElement>) => {
    resizeTextarea(e.target as HTMLTextAreaElement);
  };

  const handleTextareaFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    resizeTextarea(e.target as HTMLTextAreaElement);
    e.currentTarget.select();
  };

  const bullets: {
    key: keyof typeof bulletData;
    color: string;
  }[] = [
    {
      key: "one",
      color: "bg-indigo-600",
    },
    {
      key: "two",
      color: "bg-sky-600",
    },
    {
      key: "three",
      color: "bg-yellow-500",
    },
  ];

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
        <div className="absolute inset-0 z-10 bg-red-300 opacity-25 transition-all"></div>
      )}
      <button
        className={`${
          StoryHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveStory(true)}
        onMouseLeave={() => setRemoveStory(false)}
        onClick={handleRemoveStorySection}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleHeaderOneSubmit();
                }
              }}
              className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-4xl font-bold text-white outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-tight"
              autoFocus
              onInput={handleTextareaInput}
              onFocus={handleTextareaFocus}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleDescriptionOneSubmit();
                }
              }}
              className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
              autoFocus
              onInput={handleTextareaInput}
              onFocus={handleTextareaFocus}
              maxLength={500}
            />
          ) : (
            <p
              className="cursor-pointer select-none text-lg font-semibold text-white transition-all hover:opacity-50"
              onClick={() => setDescriptionOneEdit(true)}
            >
              {details.description_one}
            </p>
          )}
          <div className="events-wrapper my-5">
            {bullets.map((bullet) => (
              <div
                className="event flex items-start justify-between gap-4"
                key={bullet.key}
              >
                <div
                  className={`mt-1 h-4 w-4 rounded border-2 ${bullet.color}`}
                ></div>
                {bulletData[bullet.key].edit ? (
                  <textarea
                    ref={bulletTextareaRefs[bullet.key]}
                    value={bulletData[bullet.key].value}
                    onChange={(e) =>
                      updateBullets(bullet.key, { value: e.target.value })
                    }
                    onBlur={() => {
                      console.log(
                        "blur",
                        bulletTextareaRefs[bullet.key].current
                      );
                      updateBullets(bullet.key, {
                        edit: false,
                        value: details[`bullet_${bullet.key}`],
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleBulletSubmit(bullet.key);
                      }
                    }}
                    className="w-full flex-1 resize-none appearance-none overflow-hidden border-none bg-transparent p-0 pt-0 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-0"
                    autoFocus
                    onInput={handleTextareaInput}
                    onFocus={handleTextareaFocus}
                    maxLength={250}
                  />
                ) : (
                  <p
                    className="event-descripition flex-1 cursor-pointer select-none pt-0 text-lg font-semibold text-white transition-all hover:opacity-50"
                    onClick={() => updateBullets(bullet.key, { edit: true })}
                  >
                    {details[`bullet_${bullet.key}`]}
                  </p>
                )}
              </div>
            ))}
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
              onChange={(e) => {
                handleFileUpload(
                  e,
                  setImageLoading,
                  setPageData,
                  "image_one",
                  setShowError,
                  setCacheBuster,
                  "story_section",
                  "story-image",
                  (prev) => {
                    const sectionToUpdate = prev.sections.find(
                      (section) => section.type === "STORY"
                    );
                    if (sectionToUpdate && sectionToUpdate.details) {
                      (sectionToUpdate.details as StoryType).image_one = (
                        prev as any
                      ).image_one;
                    }
                    return prev;
                  }
                );
              }}
            />
            <div className="h-full w-full overflow-hidden rounded-3xl">
              <img
                src={
                  details.image_one + "?date=" + date + "&cache=" + cacheBuster
                }
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
