import { FC, useEffect } from "react";
import Loader from "Components/Loader/Loader.tsx";

const Processing: FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Code:", code);

    if (code) {
      (async () => {
        const body = `code=${code}&client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:5173/processing&grant_type=authorization_code`;

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
          "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/google-oauth",
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
          localStorage.setItem("Id", responseBody.data.idToken);
          localStorage.setItem("Refresh", responseBody.data.refreshToken);
          window.location.href = "http://localhost:5173/dashboard";
        }
        console.log(responseBody);
      })();
    }
  }, []);

  return <Loader />;
};

export default Processing;
