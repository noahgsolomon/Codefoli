import { STAGE } from "../../config.ts";
import { LOCALSTORAGE_ID_KEY, LOCALSTORAGE_REFRESH_KEY } from "../constants.ts";

const login = async (email: string, password: string) => {
  const model = {
    username: email,
    password: password,
  };
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }
    );

    const responseJson = await response.json();
    const responseBody = responseJson.body;

    if (responseBody.status === "OK") {
      localStorage.setItem(LOCALSTORAGE_ID_KEY, responseBody.data.idToken);
      localStorage.setItem(
        LOCALSTORAGE_REFRESH_KEY,
        responseBody.data.refreshToken
      );
      return responseBody;
    } else {
      return responseBody;
    }
  } catch (e) {
    console.log(e);
  }
};

const register = async (name: string, email: string, password: string) => {
  const model = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }
    );

    const responseJson = await response.json();
    const responseBody = responseJson.body;

    if (responseBody.status === "OK") {
      localStorage.setItem(LOCALSTORAGE_ID_KEY, responseBody.data.idToken);
      localStorage.setItem(
        LOCALSTORAGE_REFRESH_KEY,
        responseBody.data.refreshToken
      );
      return responseBody;
    } else {
      console.log(response);
      return responseBody;
    }
  } catch (e) {
    console.log(e);
  }
};

const authenticated = async () => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/authenticate`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
          Refresh: localStorage.getItem(LOCALSTORAGE_REFRESH_KEY) || "",
        },
      }
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { login, register, authenticated };
