const addService = async (service: string) => {
  try {
    const response = await fetch("http://localhost:8080/add-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: service,
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
const updateService = async (before: string, after: string) => {
  const model = {
    before: before,
    after: after,
  };
  try {
    const response = await fetch("http://localhost:8080/update-service", {
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
const removeService = async (service: string) => {
  try {
    const response = await fetch("http://localhost:8080/remove-service", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: service,
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
const removeLanguage = async (skill: string) => {
  try {
    const response = await fetch("http://localhost:8080/remove-language", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: skill,
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
const addLanguage = async (skill: string) => {
  try {
    const response = await fetch("http://localhost:8080/add-language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: skill,
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

const changeSkill = async (skill: {
  type: "service" | "language";
  operation: "add" | "remove" | "update";
  value: string;
  before?: string;
}) => {
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/skill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify(skill),
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

export {
  addLanguage,
  removeLanguage,
  removeService,
  updateService,
  addService,
  changeSkill,
};
