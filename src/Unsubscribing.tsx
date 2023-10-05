import { FC, useEffect } from "react";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "./util/constants.ts";
import { STAGE } from "./config.ts";

const Unsubscribing: FC = () => {
  const unsubscribe = async (token: string) => {
    try {
      const response = await fetch(
        `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/unsubscribe`,
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
    const unsubscribeToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        await unsubscribe(token);
      }
    };

    unsubscribeToken();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-30 h-screen w-screen">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
              <div
                role="status"
                className={`loader ${
                  localStorage.getItem(LOCALSTORAGE_THEME_KEY) ===
                  DARK_THEME_KEY
                    ? "dark"
                    : ""
                }`}
              ></div>
            </div>
            <span className="mt-20 text-center font-bold">
              Unsubscribing...
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unsubscribing;
