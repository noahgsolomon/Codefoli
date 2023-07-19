const updateHeaderOneValue = async (headerOne: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/value/header-one", {
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

const updateDescriptionOneValue = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/value/description-one",
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

const removeValue = async (value: string) => {
  try {
    const response = await fetch("http://localhost:8080/value/remove-value", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: value,
      credentials: "include",
    });

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

const updateValue = async (before: string, after: string) => {
  const model = {
    before: before,
    after: after,
  };
  try {
    const response = await fetch("http://localhost:8080/value/update-value", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
      credentials: "include",
    });

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
  updateHeaderOneValue,
  updateDescriptionOneValue,
  removeValue,
  updateValue,
};
