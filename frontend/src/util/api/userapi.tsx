import Work from "Type/Work.tsx";

const userDetails = async () => {
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status === "OK") {
      return responseJson.data;
    } else {
      console.log(responseJson);
      return responseJson.data;
    }
  } catch (e) {
    console.log(e);
  }
};

const setupAccount = async (
  name: string,
  company: string,
  location: string,
  skills: string[],
  work: Work[],
  projects: {
    name: string;
    description: string;
    languages: string[];
    updatedAt: string;
    link?: string;
  }[],
  profession: string,
  about: string,
  services: string[]
) => {
  const model = {
    name: name,
    profession: profession,
    company: company,
    location: location,
    about: about,
    skills: skills,
    work: work,
    projects: projects,
    services: services,
  };
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/setup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify(model),
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
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

const getHome = async () => {
  try {
    const homeData = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/home",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    const responseJson = await homeData.json();
    if (responseJson.status === "OK") {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};

const getAbout = async () => {
  try {
    const aboutData = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/about",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    const responseJson = await aboutData.json();
    if (responseJson.status === "OK") {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};

const getContact = async () => {
  try {
    const contactData = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/contact",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    const responseJson = await contactData.json();
    if (responseJson.status === "OK") {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};

const getProjectsPage = async () => {
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/projects-page",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status === "OK") {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};

const removeJob = async (id: string) => {
  try {
    const response = await fetch("http://localhost:8080/remove-job", {
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

const addJob = async (
  company: string,
  position: string,
  description: string,
  startDate: string,
  endDate: string,
  orderId: number
) => {
  const model = {
    company: company,
    position: position,
    description: description,
    startDate: startDate,
    endDate: endDate,
    orderId: orderId,
  };
  try {
    const response = await fetch("http://localhost:8080/add-job", {
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

const updateJobCompany = async (id: string, company: string) => {
  const model = {
    id: id,
    company: company,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/company", {
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

const updateJobDescription = async (id: string, description: string) => {
  const model = {
    id: id,
    description: description,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/description", {
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

const updateJobRole = async (id: string, position: string) => {
  const model = {
    id: id,
    position: position,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/position", {
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

const updateJobStartDate = async (id: string, startDate: string) => {
  const model = {
    id: id,
    startDate: startDate,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/start-date", {
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

const updateJobEndDate = async (id: string, endDate: string) => {
  const model = {
    id: id,
    endDate: endDate,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/end-date", {
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

const jobOrderChange = async (from: number, to: number) => {
  const model = {
    from: from,
    to: to,
  };
  try {
    const updateFetch = await fetch("http://localhost:8080/job/change-order", {
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

export {
  userDetails,
  setupAccount,
  getHome,
  getAbout,
  getContact,
  getProjectsPage,
  removeJob,
  addJob,
  updateJobCompany,
  updateJobDescription,
  updateJobRole,
  updateJobStartDate,
  updateJobEndDate,
  jobOrderChange,
};
