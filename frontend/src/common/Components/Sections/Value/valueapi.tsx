const updateValueText = async (
  type: "header_one" | "description_one",
  text: string
) => {
  const model = {
    type: type,
    text: text,
  };
  try {
    const updateFetch = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/text",
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

const addValue = async (value: string) => {
  try {
    const response = await fetch("http://localhost:8080/value/add-value", {
      method: "POST",
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

export { updateValueText, removeValue, updateValue, addValue };
