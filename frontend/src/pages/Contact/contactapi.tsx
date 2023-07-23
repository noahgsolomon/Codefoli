const updateHeaderOneContact = async (headerOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/contact/header-one",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: headerOne,
        credentials: "include",
      }
    );
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

const updateDescriptionOneContact = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/contact/description-one",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: descriptionOne,
        credentials: "include",
      }
    );
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

const updateEmailContact = async (email: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/contact/email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: email,
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

const updatePhoneContact = async (phone: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/contact/phone", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: phone,
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

export {
  updateHeaderOneContact,
  updateDescriptionOneContact,
  updateEmailContact,
  updatePhoneContact,
};
