import PageType from "Type/Pages.tsx";
import { SectionType } from "Type/Section.tsx";
import { STAGE } from "../../../../config.ts";
import { LOCALSTORAGE_ID_KEY } from "../../../../util/constants";

const addRemoveSection = async (
  page: PageType,
  section: SectionType,
  page_order: number,
  type: "add" | "remove"
) => {
  const model = {
    page: page,
    section: section,
    page_order: page_order,
    type: type,
  };
  try {
    const updateFetch = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/add-remove-section?request_type=SECTION`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(LOCALSTORAGE_ID_KEY),
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

export { addRemoveSection };
