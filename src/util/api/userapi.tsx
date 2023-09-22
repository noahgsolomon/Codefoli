import { STAGE } from "../../config.ts";
import { LOCALSTORAGE_ID_KEY } from "../../util/constants";

const userDetails = async () => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/user?request_type=USER`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
        },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status === "OK") {
      return responseJson;
    } else {
      console.log(responseJson);
      return responseJson;
    }
  } catch (e) {
    console.log(e);
  }
};

type JobOperation =
  | { type: "remove"; id: number; order_id: number }
  | {
      type: "add";
      company: string;
      position: string;
      description: string;
      start_date: string;
      end_date: string;
      order_id: number;
    }
  | { type: "update"; field: string; id: number; value: string }
  | { type: "orderChange"; from: number; to: number };

const jobOperations = async (operation: JobOperation) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/resume/job?request_type=CHANGE_JOB`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
        },
        body: JSON.stringify(operation),
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

export {
  userDetails,
  jobOperations,
};
