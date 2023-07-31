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

const updateProjectTitle = async (id: string, title: string) => {
  const model = {
    title: title,
    id: id,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/project/title", {
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

const updateProjectDescription = async (id: string, description: string) => {
  const model = {
    description: description,
    id: id,
  };
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/project/description",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
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

const removeProject = async (id: string) => {
  try {
    const response = await fetch("http://localhost:8080/project/remove", {
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

const addProject = async (
  title: string,
  description: string,
  language: string
) => {
  const model = {
    title: title,
    description: description,
    language: language,
  };
  try {
    const response = await fetch("http://localhost:8080/project/add", {
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

const removeProjectLanguage = async (id: string, language: string) => {
  const model = {
    id: id,
    language: language,
  };
  try {
    const response = await fetch(
      "http://localhost:8080/project/remove-language",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
        credentials: "include",
      }
    );

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

const addProjectLanguage = async (id: string, language: string) => {
  const model = {
    id: id,
    language: language,
  };
  try {
    const response = await fetch("http://localhost:8080/project/add-language", {
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
  updateHeaderOneProjects,
  updateDescriptionOneProjects,
  removeProject,
  addProject,
  updateProjectTitle,
  updateProjectDescription,
  removeProjectLanguage,
  addProjectLanguage,
};
