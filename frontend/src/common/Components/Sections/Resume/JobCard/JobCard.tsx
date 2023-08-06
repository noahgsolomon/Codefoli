import React, {
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import UserData from "Type/UserData.tsx";
import {
  jobOrderChange,
  removeJob,
  updateJobCompany,
  updateJobDescription,
  updateJobEndDate,
  updateJobRole,
  updateJobStartDate,
} from "api/userapi.tsx";
import Work from "Type/Work.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
const JobCard: FC<{
  companyTitle: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  active?: boolean;
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
  id: string;
  orderId: number;
  image: string;
}> = ({
  id,
  companyTitle,
  role,
  description,
  startDate,
  endDate,
  active,
  setUserData,
  userData,
  orderId,
  image,
}) => {
  const [companyTitleValue, setCompanyTitleValue] =
    useState<string>(companyTitle);
  const [roleValue, setRoleValue] = useState<string>(role);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);
  const [hover, setHover] = useState<boolean>(false);
  const [removeJobHover, setRemoveJobHover] = useState<boolean>(false);
  const [companyTitleEdit, setCompanyTitleEdit] = useState<boolean>(false);
  const [roleEdit, setRoleEdit] = useState<boolean>(false);
  const [descriptionEdit, setDescriptionEdit] = useState<boolean>(false);
  const [companyTitleEditValue, setCompanyTitleEditValue] =
    useState<string>(companyTitle);
  const [roleEditValue, setRoleEditValue] = useState<string>(role);
  const [descriptionEditValue, setDescriptionEditValue] =
    useState<string>(description);
  const companyTitleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const roleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [startDateEdit, setStartDateEdit] = useState<boolean>(false);
  const [endDateEdit, setEndDateEdit] = useState<boolean>(false);
  const [startDateEditValue, setStartDateEditValue] =
    useState<string>(startDate);
  const [endDateEditValue, setEndDateEditValue] = useState<string>(endDate);
  const [startDateValue, setStartDateValue] = useState<string>(startDate);
  const [endDateValue, setEndDateValue] = useState<string>(endDate);
  const startDateTextareaRef = useRef<HTMLTextAreaElement>(null);
  const endDateTextareaRef = useRef<HTMLTextAreaElement>(null);
  const imageFileInput = useRef<HTMLInputElement | null>(null);
  const [imageEdit, setImageEdit] = useState<boolean>(false);
  const date = useMemo(() => Date.now(), []);
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleJobOrderChange = async (from: number, to: number) => {
    const jobOrderChangeFetch = await jobOrderChange(from, to);
    console.log("Before update:", userData.work);
    if (jobOrderChangeFetch.status === "OK") {
      setHover(false);
      console.log(jobOrderChangeFetch.data);
      setUserData((prev) => {
        console.log("Updating state...");
        return {
          ...prev,
          work: prev.work.map((work) => {
            if (work.orderId === from) {
              return { ...work, orderId: to };
            } else if (work.orderId === to) {
              return { ...work, orderId: from };
            } else {
              return work;
            }
          }),
        };
      });
    }
  };

  const handleFileUpload = async (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof Work,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setImageLoading(true);
    setEdit(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    try {
      const response = await fetch(`http://localhost:8080/${path}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.status !== "OK") {
        setEdit(false);
        setImageLoading(false);
        if (data.status === "ERROR") {
          setImageLoading(false);
          setShowError({ visible: true, message: data.message });
          setTimeout(() => setShowError({ visible: false, message: "" }), 3000);
          return;
        }
        return;
      }

      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id
            ? { ...job, [imageKey]: data.data.url + `?date=${new Date()}` }
            : job
        ),
      }));
      setTimeout(() => setImageLoading(false), 500);
    } catch (error) {
      setEdit(false);
      setImageLoading(false);
      console.error("Error uploading file: ", error);
    }
  };

  const handleCompanyTitleSubmit = async () => {
    const updateCompanyTitleFetch = await updateJobCompany(
      id,
      companyTitleEditValue
    );
    if (updateCompanyTitleFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id
            ? { ...job, companyTitle: updateCompanyTitleFetch.data }
            : job
        ),
      }));
      setCompanyTitleValue(updateCompanyTitleFetch.data);
    } else {
      setCompanyTitleEditValue(companyTitleValue);
    }
    setCompanyTitleEdit(false);
  };

  const handleRoleSubmit = async () => {
    const updateRoleFetch = await updateJobRole(id, roleEditValue);
    if (updateRoleFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, role: updateRoleFetch.data } : job
        ),
      }));
      setRoleValue(updateRoleFetch.data);
    } else {
      setRoleEditValue(roleValue);
    }
    setRoleEdit(false);
  };

  const handleDescriptionSubmit = async () => {
    const updateDescriptionFetch = await updateJobDescription(
      id,
      descriptionEditValue
    );
    if (updateDescriptionFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id
            ? { ...job, description: updateDescriptionFetch.data }
            : job
        ),
      }));
      setDescriptionValue(updateDescriptionFetch.data);
    } else {
      setDescriptionEditValue(descriptionValue);
    }
    setDescriptionEdit(false);
  };

  const handleStartDateSubmit = async () => {
    const updateStartDateFetch = await updateJobStartDate(
      id,
      startDateEditValue
    );
    if (updateStartDateFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, startDate: updateStartDateFetch.data } : job
        ),
      }));
      setStartDateValue(startDateEditValue);
    } else {
      setStartDateEditValue(startDate);
    }
    setStartDateEdit(false);
  };

  const handleEndDateSubmit = async () => {
    const updateEndDateFetch = await updateJobEndDate(id, endDateEditValue);
    if (updateEndDateFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, endDate: updateEndDateFetch.data } : job
        ),
      }));
      setEndDateValue(endDateEditValue);
    } else {
      setEndDateEditValue(endDate);
    }
    setEndDateEdit(false);
  };

  const handleJobRemove = async () => {
    const removeJobFetch = await removeJob(id);
    if (removeJobFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work
          .filter((prevWork) => prevWork.id !== id)
          .map((job) =>
            job.orderId > orderId ? { ...job, orderId: job.orderId - 1 } : job
          ),
      }));
    }
  };

  return (
    <div
      className={`relative transition-all hover:-translate-y-0.5 ${
        active
          ? "card mb-8 rounded-lg border-2 border-black shadow-custom"
          : "card mb-8 rounded-lg border-2 border-black"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {showError.visible && (
        <StatusBar message={showError.message} color={"bg-red-400"} />
      )}
      {removeJobHover && (
        <div
          className={`absolute inset-0 z-10 bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <div
        className={` ${
          orderId > 1 ? (hover ? "opacity-100" : "opacity-0") : "hidden"
        } absolute -top-3 left-0 right-0 z-30 mx-auto w-8 cursor-pointer rounded-full border-2 border-black bg-green-300 px-2 text-center text-xl shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover`}
        onClick={async () => await handleJobOrderChange(orderId, orderId - 1)}
      >
        ↑
      </div>
      <div
        className={` ${
          orderId < userData.work.length
            ? hover
              ? "opacity-100"
              : "opacity-0"
            : "hidden"
        } absolute -bottom-3 left-0 right-0 z-30 mx-auto w-8 cursor-pointer rounded-full border-2 border-black bg-red-400 px-2 text-center text-xl shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover`}
        onClick={async () => await handleJobOrderChange(orderId, orderId + 1)}
      >
        ↓
      </div>
      <button
        className={`${
          hover ? "opacity-100" : "hidden"
        } absolute -right-3 -top-3 z-20 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveJobHover(true)}
        onMouseLeave={() => setRemoveJobHover(false)}
        onClick={async () => await handleJobRemove()}
      >
        -
      </button>
      <div className="flex justify-between">
        <div>
          {companyTitleEdit ? (
            <textarea
              ref={companyTitleTextareaRef}
              value={companyTitleEditValue}
              onChange={(e) => setCompanyTitleEditValue(e.target.value)}
              onBlur={() => {
                setCompanyTitleEditValue(companyTitleValue);
                setCompanyTitleEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (companyTitleEditValue.length > 0) {
                    await handleCompanyTitleSubmit();
                  }
                }
              }}
              className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent px-5 pt-5 text-3xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
              autoFocus
              onFocus={(e) => e.target.select()}
              rows={1}
              maxLength={25}
            />
          ) : (
            <h2
              className="px-5 pt-5 text-3xl font-bold transition-all hover:cursor-pointer hover:opacity-50"
              onClick={() => setCompanyTitleEdit(true)}
            >
              {companyTitleValue}
            </h2>
          )}
          <div className="about p-5">
            {roleEdit ? (
              <textarea
                ref={roleTextareaRef}
                value={roleEditValue}
                onChange={(e) => setRoleEditValue(e.target.value)}
                onBlur={() => {
                  setRoleEditValue(roleValue);
                  setRoleEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (roleEditValue.length > 0) {
                      await handleRoleSubmit();
                    }
                  }
                }}
                className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
                autoFocus
                onFocus={(e) => e.target.select()}
                rows={1}
                maxLength={25}
              />
            ) : (
              <h2
                className="font-bold transition-all hover:cursor-pointer hover:opacity-50"
                onClick={() => setRoleEdit(true)}
              >
                {roleValue}
              </h2>
            )}
            {descriptionEdit ? (
              <textarea
                ref={descriptionTextareaRef}
                value={descriptionEditValue}
                onChange={(e) => setDescriptionEditValue(e.target.value)}
                onBlur={() => {
                  setDescriptionEditValue(descriptionValue);
                  setDescriptionEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (descriptionEditValue.length > 0) {
                      await handleDescriptionSubmit();
                    }
                  }
                }}
                className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg leading-loose outline-none focus:outline-none focus:ring-0"
                autoFocus
                onFocus={(e) => e.target.select()}
                rows={4}
                maxLength={255}
              />
            ) : (
              <p
                className="transition-all hover:cursor-pointer hover:opacity-50"
                onClick={() => setDescriptionEdit(true)}
              >
                {descriptionValue}
              </p>
            )}
          </div>
        </div>
        <div
          className={`relative mr-5 mt-5 h-[100px] w-[100px] rounded-full border-2 border-black transition-all ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onMouseEnter={() => setImageEdit(true)}
          onMouseLeave={() => setImageEdit(false)}
          onClick={() =>
            imageFileInput.current && imageFileInput.current.click()
          }
        >
          <input
            type="file"
            ref={imageFileInput}
            className="hidden"
            accept=".jpg,.png"
            onChange={async (e) => {
              await handleFileUpload(
                "job-image-upload",
                setImageEdit,
                "image",
                e
              );
            }}
          />
          <img
            className={"h-full w-full rounded-full object-cover"}
            src={image + "?date=" + date}
            alt={"job photo"}
          />
          <div
            className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-4 border-dashed border-black bg-white text-center text-base font-bold text-black transition-all ${
              imageEdit ? "opacity-50" : "opacity-0"
            }`}
          >
            click to upload image
          </div>
        </div>
      </div>

      <div
        className={`flew-row flex ${
          active
            ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 p-5 font-bold"
            : "duration rounded-b-lg border-t-2 border-black p-5 font-bold"
        }`}
      >
        {startDateEdit ? (
          <textarea
            ref={startDateTextareaRef}
            value={startDateEditValue}
            onChange={(e) => setStartDateEditValue(e.target.value)}
            onBlur={() => {
              setStartDateEditValue(startDate);
              setStartDateEdit(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (startDateEditValue.length > 0) {
                  await handleStartDateSubmit();
                }
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            className="resize-none appearance-none overflow-hidden border-none bg-transparent outline-none focus:outline-none focus:ring-0"
          />
        ) : (
          <p
            className={"transition-all hover:cursor-pointer hover:opacity-50"}
            onClick={() => setStartDateEdit(true)}
          >
            {startDateValue}
          </p>
        )}
        &nbsp;-&nbsp;
        {endDateEdit ? (
          <textarea
            ref={endDateTextareaRef}
            value={endDateEditValue}
            onChange={(e) => setEndDateEditValue(e.target.value)}
            onBlur={() => {
              setEndDateEditValue(endDate);
              setEndDateEdit(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (endDateEditValue.length > 0) {
                  await handleEndDateSubmit();
                }
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent outline-none focus:outline-none focus:ring-0"
          />
        ) : (
          <p
            className={"transition-all hover:cursor-pointer hover:opacity-50"}
            onClick={() => setEndDateEdit(true)}
          >
            {endDateValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobCard;
