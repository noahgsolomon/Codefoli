import {STAGE} from "../../../../config.ts";


const changeValue = async (value: {
  operation: "add" | "remove" | "update";
  value: string;
  before?: string;
}) => {
  try {
    const response = await fetch(
        `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/value?request_type=CHANGE_VALUES`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Id"),
          },
          body: JSON.stringify(value),
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


export { changeValue };
