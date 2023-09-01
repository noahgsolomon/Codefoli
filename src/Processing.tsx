import { FC, useEffect, useRef } from "react";
import Loader from "Components/Loader/Loader.tsx";
import { STAGE } from "./config.ts";
import { LOCALSTORAGE_ID_KEY, LOCALSTORAGE_REFRESH_KEY } from "./util/constants";

const Processing: FC = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      (async () => {
        const body = `code=${code}&client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&client_secret=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&redirect_uri=${
          STAGE === "prod"
            ? "https://codefoli.com/processing"
            : "http://localhost:5173/processing"
        }&grant_type=authorization_code`;

        const tokenResponse = await fetch(
          "https://www.googleapis.com/oauth2/v4/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,
          }
        );

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        const profileResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const profileData = await profileResponse.json();
        const model = {
          name: profileData.name,
          email: profileData.email,
        };
        const response = await fetch(
          `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/google-oauth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(model),
          }
        );
        const responseBody = await response.json();
        if (responseBody.status === "OK") {
          localStorage.setItem(LOCALSTORAGE_ID_KEY, responseBody.data.idToken);
          localStorage.setItem(LOCALSTORAGE_REFRESH_KEY, responseBody.data.refreshToken);
          window.location.href = "/";
        }
      })();
    }
  }, []);

  return <Loader />;
};

export default Processing;
