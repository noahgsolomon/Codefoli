import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "./util/toggleTheme.ts";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "./util/constants.ts";
import Footer from "Components/Footer/Footer.tsx";
import { STAGE } from "./config.ts";
const Analytics: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const currentDate = useMemo(() => new Date(), []);
  const currentFormattedDate = useMemo(
    () =>
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`,
    [currentDate]
  );
  const [deployments, setDeployments] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [registers, setRegisters] = useState(0);
  const [dailyActiveUsers, setDailyActiveUsers] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [date, setDate] = useState(currentFormattedDate);
  const [newsLetterCount, setNewsLetterCount] = useState(0);
  const [newsLetterToday, setNewsLetterToday] = useState(0);
  const analytics = async (date: string) => {
    try {
      const response = await fetch(
        `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/analytics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: date }),
        }
      );

      const responseJson = await response.json();
      if (responseJson.status === "OK") {
        return responseJson;
      } else {
        console.log(responseJson.message);
        return responseJson;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const analyticsFetch = async () => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const analyticsData = await analytics(formattedDate);

      if (analyticsData.status === "OK") {
        setDeployments(analyticsData.data.deployments);
        setDownloads(analyticsData.data.downloads);
        setRegisters(analyticsData.data.registers);
        setDailyActiveUsers(analyticsData.data.daily_active_users);
        setUserCount(analyticsData.data.user_count);
        setNewsLetterCount(analyticsData.data.newsletter_count);
        setNewsLetterToday(analyticsData.data.newsletter_today);
      }
      setLoading(false);
    };

    analyticsFetch();
  }, []);

  const handleAnalyticsFetch = async (date: string) => {
    setLoading(true);
    const analyticsData = await analytics(date);

    if (analyticsData.status === "OK") {
      setDeployments(analyticsData.data.deployments);
      setDownloads(analyticsData.data.downloads);
      setRegisters(analyticsData.data.registers);
      setDailyActiveUsers(analyticsData.data.daily_active_users);
      setUserCount(analyticsData.data.user_count);
      setNewsLetterCount(analyticsData.data.newsletter_count);
      setNewsLetterToday(analyticsData.data.newsletter_today);
    }

    setLoading(false);
  };

  const changeDate = async (offset: number) => {
    const [year, month, day] = date.split("-").map(Number);
    const newDate = new Date(year, month - 1, day + offset);
    const formattedDate = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);
    await handleAnalyticsFetch(formattedDate);
  };

  return (
    <>
      <header
        className={`relative z-40 mx-5 mb-10 flex items-center py-5 font-bold transition-all`}
      >
        <div className="mx-auto flex w-full max-w-[50rem] flex-row flex-wrap items-center justify-center rounded-xl border-2 border-black px-4 py-3 shadow-custom transition-all dark:bg-[#1a1a1a] sm:justify-between">
          <Link
            to="/"
            className="cursor-pointer select-none px-1 text-4xl text-gray-800 transition-all hover:-translate-y-0.5 dark:text-gray-50"
          >
            Codefoli
          </Link>
          <div
            onClick={() => {
              toggleTheme();
              setTheme(
                (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
                  | typeof LIGHT_THEME_KEY
                  | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
              );
            }}
          >
            {theme === LIGHT_THEME_KEY ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 cursor-pointer fill-yellow-500 transition-all hover:opacity-80"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.844a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 cursor-pointer fill-yellow-200 transition-all hover:opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </header>
      <div>
        <h1 className="text-center text-6xl font-bold">Analytics</h1>
        {loading ? (
          <div className={"mt-20 flex justify-center"}>
            <svg
              className="mr-2 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 dark:border-gray-300"
              viewBox="0 0 24 24"
            >
              <circle
                className="rainbow-stroke"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
                fill={
                  localStorage.getItem(LOCALSTORAGE_THEME_KEY) ===
                  LIGHT_THEME_KEY
                    ? "white"
                    : "#1a1a1a"
                }
              ></circle>
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <p className={"mt-4 text-center text-2xl opacity-60"}>{date}</p>
            <div className={"mb-20 flex justify-center gap-10"}>
              <button
                className={"text-2xl font-bold transition-all hover:opacity-60"}
                onClick={() => changeDate(-1)}
              >
                {"<"}
              </button>
              <button
                className={"text-2xl font-bold transition-all hover:opacity-60"}
                onClick={() => changeDate(+1)}
              >
                {">"}
              </button>
            </div>
            <div className="mx-10 mb-48 flex flex-wrap justify-center gap-10">
              <div className="rounded-xl border-2 border-blue-500 bg-blue-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-blue-300 dark:bg-blue-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  👥{" "}
                  <span className="text-blue-500 underline dark:text-blue-300">
                    Total
                  </span>{" "}
                  # of users:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-blue-500 dark:text-blue-300">
                  {userCount}
                </p>
              </div>
              <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-yellow-300 dark:bg-yellow-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  🗓 Users registered{" "}
                  <span className="text-yellow-500 underline dark:text-yellow-300">
                    today
                  </span>
                  :
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-yellow-500 dark:text-yellow-300">
                  {registers}
                </p>
              </div>
              <div className="rounded-xl border-2 border-green-500 bg-green-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-green-300 dark:bg-green-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  🚀 Deployments today:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-green-500 dark:text-green-300">
                  {deployments}
                </p>
              </div>
              <div className="rounded-xl border-2 border-purple-500 bg-purple-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-purple-300 dark:bg-purple-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  📥 Downloads today:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-purple-500 dark:text-purple-300">
                  {downloads}
                </p>
              </div>
              <div className="rounded-xl border-2 border-red-500 bg-red-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-red-300 dark:bg-red-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  📈 Daily active users:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-red-500 dark:text-red-300">
                  {dailyActiveUsers}
                </p>
              </div>
              <div className="rounded-xl border-2 border-orange-500 bg-orange-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-orange-300 dark:bg-orange-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  📰 Newsletter sub count:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-orange-500 dark:text-orange-300">
                  {newsLetterCount}
                </p>
              </div>
              <div className="rounded-xl border-2 border-indigo-500 bg-indigo-50 px-6 py-6 shadow-custom transition-all hover:shadow-customHover dark:border-indigo-300 dark:bg-indigo-900">
                <h2 className="text-2xl font-bold dark:text-white">
                  📅 Newsletter count today:
                </h2>
                <p className="mt-4 text-center text-3xl font-bold text-indigo-500 dark:text-indigo-300">
                  {newsLetterToday}
                </p>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Analytics;
