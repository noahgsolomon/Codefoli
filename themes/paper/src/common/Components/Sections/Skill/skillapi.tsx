import { STAGE } from "../../../../config.ts";
import { LOCALSTORAGE_ID_KEY } from "../../../../util/constants";

const changeSkill = async (skill: {
  type: "service" | "language";
  operation: "add" | "remove" | "update";
  value: string;
  before?: string;
}) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/skill?request_type=CHANGE_SKILLS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
        },
        body: JSON.stringify(skill),
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

export { changeSkill };
