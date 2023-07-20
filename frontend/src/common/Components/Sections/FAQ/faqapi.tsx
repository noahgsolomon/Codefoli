const updateHeaderOneFaq = async (headerOne: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/faq/header-one", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: headerOne,
      credentials: "include",
    });
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

const updateDescriptionOneFaq = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/faq/description-one",
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

export { updateHeaderOneFaq, updateDescriptionOneFaq };
