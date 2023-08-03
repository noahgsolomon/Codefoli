const updateProjectHeader = async (slug: string, header: string) => {
  const model = {
    slug: slug,
    content: header,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/project-content/header`,
      {
        method: "PUT",
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

const updateProjectAbout = async (slug: string, about: string) => {
  const model = {
    slug: slug,
    content: about,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/project-content/about`,
      {
        method: "PUT",
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

const updateProjectOverview = async (slug: string, overview: string) => {
  const model = {
    slug: slug,
    content: overview,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/project-content/overview`,
      {
        method: "PUT",
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

const updateProjectDescription = async (slug: string, description: string) => {
  const model = {
    slug: slug,
    content: description,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/project-content/description`,
      {
        method: "PUT",
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

const updateProjectPlatforms = async (slug: string, platforms: string) => {
  const model = {
    slug: slug,
    content: platforms,
  };
  try {
    const response = await fetch(
      `http://localhost:8080/project-content/platforms`,
      {
        method: "PUT",
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

const updateProjectLink = async (slug: string, link: string) => {
  const model = {
    slug: slug,
    content: link,
  };
  try {
    const response = await fetch(`http://localhost:8080/project-content/link`, {
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
  updateProjectHeader,
  updateProjectAbout,
  updateProjectOverview,
  updateProjectDescription,
  updateProjectPlatforms,
  updateProjectLink,
};
