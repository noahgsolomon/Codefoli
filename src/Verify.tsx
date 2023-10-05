import { FC, useEffect, useState } from "react";
import { DARK_THEME_KEY, LOCALSTORAGE_THEME_KEY } from "./util/constants.ts";
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
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
            <div
              role="status"
              className={`loader ${
                localStorage.getItem(LOCALSTORAGE_THEME_KEY) === DARK_THEME_KEY
                  ? "dark"
                  : ""
              }`}
            ></div>
          </div>
          <span className="mt-20 text-center font-bold">Verifying...</span>
       </div>
      </div>
      {verified === true ? (
        <StatusBar message={"Email verified!"} color={"bg-gradient-to-r dark:text-green-600 from-green-400 to-green-300 text-green-900 dark:from-green-900 dark:to-green-800"} />
      ) : verified === false ? (
        <StatusBar message={"Error verifying email..."} color={"bg-gradient-to-r text-red-100 dark:text-red-600 from-red-400 to-red-300  text-red-900 dark:from-red-900 dark:to-red-800"} />
      ) : null}
    </>
  );
};

export default Verify;
