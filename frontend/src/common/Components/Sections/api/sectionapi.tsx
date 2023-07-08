import PageType from "Type/Pages.tsx";
import { SectionType } from "Type/Section.tsx";

const removeSection = async (page: PageType, section: SectionType) => {
  const model = {
    page: page,
    section: section,
  };
  try {
    const updateFetch = await fetch(`http://localhost:8080/remove-section`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
      credentials: "include",
    });

    const updateFetchJson = await updateFetch.json();

    if (updateFetchJson.status === "OK") {
      return updateFetchJson.data;
    } else {
      console.log(updateFetchJson.message);
      return updateFetchJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};


export { removeSection };
