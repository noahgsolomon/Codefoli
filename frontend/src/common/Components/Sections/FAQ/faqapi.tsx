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

const updateTitleFaq = async (id: string, title: string) => {
  const model = {
    id: id,
    title: title,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/faq/title", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
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

const updateContentFaq = async (id: string, content: string) => {
  const model = {
    id: id,
    content: content,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/faq/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
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

const removeFaq = async (id: string) => {
  try {
    const response = await fetch("http://localhost:8080/faq/remove-faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: id,
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

const addFaqPost = async (title: string, content: string) => {
  const model = {
    title: title,
    content: content,
  };
  try {
    const response = await fetch("http://localhost:8080/faq/add-faq", {
      method: "POST",
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
  updateHeaderOneFaq,
  updateDescriptionOneFaq,
  updateTitleFaq,
  updateContentFaq,
  removeFaq,
  addFaqPost,
};
