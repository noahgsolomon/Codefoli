import { Dispatch, FC, SetStateAction, useMemo, useRef, useState } from "react";
import UserData from "Type/UserData.tsx";
import { jobOperations } from "api/userapi.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { handleFileUpload } from "api/uploadimage.tsx";
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
  const [cacheBuster, setCacheBuster] = useState<string>("");
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
    const jobOrderChangeFetch = await jobOperations({
      type: "orderChange",
      from: from,
      to: to,
    });
    if (jobOrderChangeFetch.status === "OK") {
      setHover(false);
      setUserData((prev) => {
        return {
          ...prev,
          work: prev.work.map((work) => {
            if (work.order_id === from) {
              return { ...work, order_id: to };
            } else if (work.order_id === to) {
              return { ...work, order_id: from };
            } else {
              return work;
            }
          }),
        };
      });
    }
  };

  const handleCompanyTitleSubmit = async () => {
    const updateCompanyTitleFetch = await jobOperations({
      type: "update",
      field: "company",
      id: parseInt(id),
      value: companyTitleEditValue,
    });

    if (updateCompanyTitleFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, company: companyTitleEditValue } : job
        ),
      }));
      setCompanyTitleValue(companyTitleEditValue);
    } else {
      setCompanyTitleEditValue(companyTitleValue);
    }
    setCompanyTitleEdit(false);
  };

  const handleRoleSubmit = async () => {
    const updateRoleFetch = await jobOperations({
      type: "update",
      field: "position",
      id: parseInt(id),
      value: roleEditValue,
    });
    if (updateRoleFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, position: roleEditValue } : job
        ),
      }));
      setRoleValue(roleEditValue);
    } else {
      setRoleEditValue(roleValue);
    }
    setRoleEdit(false);
  };

  const handleDescriptionSubmit = async () => {
    const updateDescriptionFetch = await jobOperations({
      type: "update",
      field: "description",
      id: parseInt(id),
      value: descriptionEditValue,
    });
    if (updateDescriptionFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, description: descriptionEditValue } : job
        ),
      }));
      setDescriptionValue(descriptionEditValue);
    } else {
      setDescriptionEditValue(descriptionValue);
    }
    setDescriptionEdit(false);
  };

  const handleStartDateSubmit = async () => {
    const updateStartDateFetch = await jobOperations({
      type: "update",
      field: "start_date",
      id: parseInt(id),
      value: startDateEditValue,
    });

    if (updateStartDateFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, startDate: startDateEditValue } : job
        ),
      }));
      setStartDateValue(startDateEditValue);
    } else {
      setStartDateEditValue(startDate);
    }
    setStartDateEdit(false);
  };

  const handleEndDateSubmit = async () => {
    const updateEndDateFetch = await jobOperations({
      type: "update",
      field: "end_date",
      id: parseInt(id),
      value: endDateEditValue,
    });
    if (updateEndDateFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work.map((job) =>
          job.id === id ? { ...job, endDate: endDateEditValue } : job
        ),
      }));
      setEndDateValue(endDateEditValue);
    } else {
      setEndDateEditValue(endDate);
    }
    setEndDateEdit(false);
  };

  const handleJobRemove = async () => {
    const removeJobFetch = await jobOperations({
      type: "remove",
      id: parseInt(id),
      order_id: orderId,
    });
    if (removeJobFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: prev.work
          .filter((prevWork) => prevWork.id !== id)
          .map((job) =>
            job.order_id > orderId
              ? { ...job, order_id: job.order_id - 1 }
              : job
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
        <StatusBar message={showError.message} color="bg-red-400" />
      )}
      {removeJobHover && (
        <div className="absolute inset-0 z-10 bg-red-300 opacity-25 transition-all"></div>
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
        onClick={handleJobRemove}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (companyTitleEditValue.length > 0) {
                    handleCompanyTitleSubmit();
                  }
                }
              }}
              className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 px-5 pt-5 text-3xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (roleEditValue.length > 0) {
                      handleRoleSubmit();
                    }
                  }
                }}
                className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (descriptionEditValue.length > 0) {
                      handleDescriptionSubmit();
                    }
                  }
                }}
                className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg leading-loose outline-none focus:outline-none focus:ring-0"
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
                maxLength={100}
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
                e,
                setImageLoading,
                setUserData,
                "image",
                setShowError,
                setCacheBuster,
                "work",
                `job-image-upload-${id}`,
                (prev: any) => {
                  const workToUpdate = prev.work.find(
                    (workItem: any) => workItem.id === id
                  );
                  if (workToUpdate) {
                    workToUpdate.image = prev.image;
                  }
                  return prev;
                },
                id
              );
            }}
          />
          <img
            className="h-full w-full rounded-full object-cover"
            src={image + "?date=" + date + "&cache=" + cacheBuster}
            alt="job photo"
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
        className={`flew-row flex p-5 text-lg ${
          active
            ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 font-bold"
            : "duration rounded-b-lg border-t-2 border-black font-bold"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (startDateEditValue.length > 0) {
                  handleStartDateSubmit();
                }
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            className="resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg outline-none focus:outline-none focus:ring-0"
            rows={1}
            maxLength={20}
          />
        ) : (
          <p
            className="text-lg transition-all hover:cursor-pointer hover:opacity-50"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (endDateEditValue.length > 0) {
                  handleEndDateSubmit();
                }
              }
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            rows={1}
            maxLength={20}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg outline-none focus:outline-none focus:ring-0"
          />
        ) : (
          <p
            className={
              "text-lg transition-all hover:cursor-pointer hover:opacity-50"
            }
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
