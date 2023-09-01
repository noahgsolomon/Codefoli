import { STAGE } from "../../config.ts";
import { LOCALSTORAGE_ID_KEY } from "../../util/constants";

const changeProject = async (project: {
  text: string;
  id: string;
  type: "link" | "platforms" | "description" | "overview" | "about" | "header";
}) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/project?request_type=PROJECT`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
        },
        body: JSON.stringify(project),
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

export { changeProject };
