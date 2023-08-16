const updateContactText = async (
  type: "header_one" | "description_one" | "phone" | "email",
  text: string
) => {
  const model = {
    type: type,
    text: text,
  };
  try {
    const updateFetch = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/contact",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Id")}`,
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

export { updateContactText };
