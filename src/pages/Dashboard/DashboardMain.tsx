import { Link } from "react-router-dom";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSpring, animated } from "react-spring";
import HomeData from "Type/HomeData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { updateText } from "api/updatetext.tsx";
import { handleFileUpload } from "api/uploadimage.tsx";
import AnyPageData from "Type/AnyPageData.tsx";

const DashboardMain: React.FC<{
  pageData: HomeData;
  setPageData: React.Dispatch<React.SetStateAction<HomeData>>;
}> = ({ pageData, setPageData }) => {
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.header_one
  );
  const date = useMemo(() => new Date().toTimeString(), []);
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.description_one
  );
  const [imageOneEdit, setImageOneEdit] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });
  const [cacheBuster, setCacheBuster] = useState<string>("");

  useEffect(() => {
    if (headerOneEdit && headerOneTextareaRef.current) {
      headerOneTextareaRef.current.style.height = "auto";
      headerOneTextareaRef.current.style.height = `${headerOneTextareaRef.current.scrollHeight}px`;
    }

    if (descriptionOneEdit && descriptionOneTextareaRef.current) {
      descriptionOneTextareaRef.current.style.height = "auto";
      descriptionOneTextareaRef.current.style.height = `${descriptionOneTextareaRef.current.scrollHeight}px`;
    }
  }, [
    headerOneEdit,
    headerOneEditValue,
    descriptionOneEdit,
    descriptionOneEditValue,
  ]);

  const handleHeaderOneSubmit = async () => {
    if (headerOneEditValue.length > 50 || headerOneEditValue.length < 1) {
      setHeaderOneEditValue(pageData.header_one);
      return;
    }
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "home"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({ ...prev, header_one: headerOneEditValue }));
      setHeaderOneEdit(false);
      setHeaderOneEditValue(headerOneEditValue);
    }
    setHeaderOneEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    if (
      descriptionOneEditValue.length > 250 ||
      descriptionOneEditValue.length < 1
    ) {
      setDescriptionOneEdit(false);
      setDescriptionOneEditValue(pageData.description_one);
      return;
    }
    const updateDescription = await updateText(
      "description_one",
      descriptionOneEditValue,
      "home"
    );
    if (updateDescription.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        description_one: descriptionOneEditValue,
      }));
      setDescriptionOneEditValue(descriptionOneEditValue);
    }
    setDescriptionOneEdit(false);
  };

  const fileInput = useRef<HTMLInputElement | null>(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const imageAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });
  return (
    <>
      {showError.visible && (
        <StatusBar message={showError.message} color={"bg-red-400"} />
      )}
      {imageLoading && (
        <StatusBar message={"Uploading image!"} color={"bg-green-500"} />
      )}
      <div className="mx-10 flex flex-col justify-center md:flex-row">
        <animated.div style={headerAnimation} className={"md:mr-10"}>
          <div className="mx-auto mt-10 max-w-2xl font-bold xl:mt-32">
            {headerOneEdit ? (
                <div className={'flex justify-center md:justify-normal'}>
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
                    className="p-0 font-extra-bold w-full mx-auto  max-w-[15ch] resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-4xl md:text-left leading-snug outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal"
                    autoFocus
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    maxLength={50}
                />
                </div>

            ) : (
              <h1
                className="font-extra-bold md:flex:mx-0 mx-auto max-w-[15ch] cursor-pointer text-center text-4xl leading-snug transition-all hover:opacity-50 md:text-left md:text-5xl md:leading-relaxed xl:text-6xl xl:leading-normal"
                onClick={() => setHeaderOneEdit(true)}
              >
                {pageData.header_one}
              </h1>
            )}
            {descriptionOneEdit ? (
                <div className={'flex justify-center md:justify-normal'}>
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
                          setDescriptionOneEdit(false);
                        }
                      }}
                      className="w-full mx-auto max-w-[35ch] resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-base opacity-60 md:mx-0 md:text-left outline-none focus:outline-none focus:ring-0 xl:max-w-[50ch]"
                      autoFocus
                      onFocus={(e) => {
                        e.target.select();
                      }}
                      maxLength={250}
                  />
                </div>
            ) : (
                <p
                    className="mx-auto max-w-[35ch] cursor-pointer text-center text-base opacity-60 transition-all hover:opacity-50 md:mx-0 md:text-left xl:max-w-[50ch]"
                    onClick={() => setDescriptionOneEdit(true)}
                >
                  {pageData.description_one}
                </p>
            )}

          </div>
          <div className="mt-5 whitespace-nowrap text-center md:text-left">
            <Link
              to="/contact"
              className="mr-4 rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500"
            >
              Get in touch
            </Link>
            <Link
              to="/projects"
              className="rounded-xl border-2 border-black px-6 py-4 font-bold transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
            >
              View Projects
            </Link>
          </div>
        </animated.div>
        <animated.div style={imageAnimation}>
          <div
            className={`relative mx-auto mt-10 h-[350px] w-[350px] transition-all lg:h-[500px] lg:w-[500px] xl:mt-24 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={() => setImageOneEdit(true)}
            onMouseLeave={() => setImageOneEdit(false)}
            onClick={() => fileInput.current && fileInput.current.click()}
          >
            <input
              type="file"
              ref={fileInput}
              className="hidden"
              accept=".jpg,.png"
              onChange={async (e) => {
                await handleFileUpload(
                  e,
                  setImageLoading,
                  setPageData as Dispatch<SetStateAction<AnyPageData>>,
                  "profile_image",
                  setShowError,
                  setCacheBuster,
                  "home",
                  "profile-image"
                );
              }}
            />
            <div className="h-full w-full overflow-hidden rounded-3xl border-2 border-black shadow-customHover">
              <img
                className={`h-full w-full object-cover`}
                src={
                  pageData.profile_image +
                  "?date=" +
                  date +
                  "&cache=" +
                  cacheBuster
                }
                alt="pfp"
              ></img>
            </div>
            <div
              className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border-8 border-dashed border-black bg-white p-2 text-3xl font-bold text-black transition-all ${
                imageOneEdit ? "opacity-50" : "opacity-0"
              }`}
            >
              Click to upload image
            </div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default DashboardMain;
