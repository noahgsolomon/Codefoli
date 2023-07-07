const updateHeaderOneStory = async (headerOne: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/story/header-one", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: headerOne,
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
const updateDescriptionOneStory = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/story/description-one",
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

const updateBulletOneStory = async (bulletOne: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/story/bullet-one", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: bulletOne,
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

const updateBulletTwoStory = async (bulletTwo: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/story/bullet-two", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: bulletTwo,
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

const updateBulletThreeStory = async (bulletThree: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/story/bullet-three",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: bulletThree,
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

export {
  updateBulletThreeStory,
  updateBulletTwoStory,
  updateBulletOneStory,
  updateDescriptionOneStory,
  updateHeaderOneStory,
};
