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
      return responseJson;
    } else {
      console.log(responseJson);
      return responseJson;
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

type JobOperation =
  | { type: "remove"; id: number; order_id: number }
  | {
      type: "add";
      company: string;
      position: string;
      description: string;
      start_date: string;
      end_date: string;
      order_id: number;
    }
  | { type: "update"; field: string; id: number; value: string }
  | { type: "orderChange"; from: number; to: number };

const jobOperations = async (operation: JobOperation) => {
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/resume/job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify(operation),
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
  userDetails,
  setupAccount,
  getHome,
  getAbout,
  getContact,
  getProjectsPage,
  jobOperations,
};
