import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import HomeData from "Type/HomeData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { updateText } from "api/updatetext.tsx";

const DashboardMain: React.FC<{
  pageData: HomeData;
  setPageData: React.Dispatch<React.SetStateAction<HomeData>>;
}> = ({ pageData, setPageData }) => {
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.header_one
  );
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.description_one
  );
  const [imageOneEdit, setImageOneEdit] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const date = useMemo(() => Date.now(), []);
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result as string;

      try {
        const response = await fetch(
            "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/upload-image?table=home&link=profile-image&image_column=profile_image",
            {
              method: "POST",
              body: JSON.stringify({ file: base64File }),
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("Id"),
              },
            }
        );

        const data = await response.json();

        if (data.status !== "OK") {
          setImageLoading(false);
          if (data.status === "ERROR") {
            setShowError({ visible: true, message: data.message });
            setTimeout(() => setShowError({ visible: false, message: "" }), 3000);
            return;
          }
          return;
        }

        setPageData({
          ...pageData,
          profile_image: `${data.data.url}?timestamp=${new Date().getTime()}`,
        });
        setTimeout(() => setImageLoading(false), 500);
      } catch (error) {
        setImageLoading(false);
        console.error("Error uploading file: ", error);
      }
    };
  };


  return (
    <div className="container mx-auto px-6">
      {showError.visible && (
        <StatusBar message={showError.message} color={"bg-red-400"} />
      )}
      {imageLoading && (
          <StatusBar message={'Uploading image!'} color={"bg-green-500"} />
      )}
      <div className="flex flex-col lg:flex-row xl:mx-auto xl:justify-center">
        <animated.div style={headerAnimation}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center font-bold xl:mt-32">
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
                className="font-extra-bold w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-4xl leading-snug outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal"
                autoFocus
                onFocus={(e) => {
                  e.target.select();
                }}
                maxLength={50}
              />
            ) : (
              <h1
                className="font-extra-bold max-w-[15ch] cursor-pointer select-none text-center text-4xl leading-snug transition-all hover:opacity-50 md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal"
                onClick={() => setHeaderOneEdit(true)}
              >
                {pageData.header_one}
              </h1>
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
                    setDescriptionOneEdit(false);
                  }
                }}
                className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-base opacity-60 outline-none focus:outline-none focus:ring-0 xl:max-w-[50ch] xl:text-left"
                autoFocus
                onFocus={(e) => {
                  e.target.select();
                }}
                maxLength={250}
              />
            ) : (
              <p
                className="max-w-[35ch] cursor-pointer select-none text-center text-base opacity-60 transition-all hover:opacity-50 xl:max-w-[50ch] xl:text-left"
                onClick={() => setDescriptionOneEdit(true)}
              >
                {pageData.description_one}
              </p>
            )}
          </div>
          <div className="mx-auto mt-5 flex justify-center xl:justify-start">
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
            className={`relative mx-auto mt-10 h-[300px] w-[300px] transition-all md:h-[500px] md:w-[500px] lg:mx-0 xl:ml-20 xl:mt-32 ${
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
              onChange={handleFileUpload}
            />
            <div className="h-full w-full overflow-hidden rounded-3xl shadow-customHover">
              <img
                className="h-full w-full object-cover"
                src={pageData.profile_image + "?date=" + date}
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
    </div>
  );
};

export default DashboardMain;
