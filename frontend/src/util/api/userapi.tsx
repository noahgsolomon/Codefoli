import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";
const userDetails = async () => {
  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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

const setupAccount = async (
  name: string,
  email: string,
  profession: string,
  company: string,
  location: string,
  about: string,
  skills: string[],
  work: Work[],
  projects: Project[],
  services: string[]
) => {
  const model = {
    name: name,
    email: email,
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
    const response = await fetch("http://localhost:8080/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
      credentials: "include",
    });

    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.status === "OK") {
      return responseJson.status;
    } else {
      console.log(responseJson.message);
      return responseJson.status;
    }
  } catch (e) {
    console.log(e);
  }
};

const getHome = async () => {
  try {
    const homeData = await fetch("http://localhost:8080/home", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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
    const aboutData = await fetch("http://localhost:8080/about", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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
    const contactData = await fetch("http://localhost:8080/contact", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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

export {
  userDetails,
  setupAccount,
  getHome,
  getAbout,
  getContact,
  updateService,
  removeLanguage,
  addLanguage,
  removeService,
  addService,
  removeJob,
};
