import { STAGE } from "../../config.ts";

const updateText = async (type: string, text: string, table: string) => {
  const model = {
    type: type,
    text: text,
    table: table,
  };
  try {
    const updateFetch = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/text?request_type=TEXT_UPDATE`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify(model),
      }
    );

    const updateFetchJson = await updateFetch.json();
    if (updateFetchJson.status === "OK") {
      return updateFetchJson;
    } else {
      console.log(updateFetchJson.message);
      return updateFetchJson;
    }
  } catch (e) {
    console.log(e);
  }
};

export { updateText };
