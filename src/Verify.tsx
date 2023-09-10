import { FC, useEffect, useState } from "react";
import { LIGHT_THEME_KEY, LOCALSTORAGE_THEME_KEY } from "./util/constants.ts";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { STAGE } from "./config.ts";

const Verify: FC = () => {
  const [verified, setVerified] = useState<boolean | null>(null);

  const verify = async (token: string) => {
    try {
      const response = await fetch(
        `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
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
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        const verifying = await verify(token);

        if (verifying.status === "OK") {
          setVerified(true);
          console.log("verified");
        } else {
          setVerified(false);
          console.log("error");
        }
      } else {
        setVerified(false);
        console.log("error");
      }
    };

    verifyToken();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-30 h-screen w-screen">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <div role="status">
            <svg
              className="mr-2 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 dark:border-gray-300"
              viewBox="0 0 24 24"
            >
              <circle
                className="green-stroke"
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
                fill={"white"}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <span className="text-center font-bold">Verifying...</span>
        </div>
      </div>
      {verified === true ? (
        <StatusBar message={"Email verified!"} color={"bg-green-500"} />
      ) : verified === false ? (
        <StatusBar message={"Error verifying email..."} color={"bg-red-500"} />
      ) : null}
    </>
  );
};

export default Verify;
