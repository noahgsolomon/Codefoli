const updateHeaderOneProjects = async (headerOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/projects-page/header-one",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: headerOne,
        credentials: "include",
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

const updateDescriptionOneProjects = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/projects-page/description-one",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: descriptionOne,
        credentials: "include",
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

export { updateHeaderOneProjects, updateDescriptionOneProjects };
