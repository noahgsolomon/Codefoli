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
    if (responseJson.status === 'OK') {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
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
    if (responseJson.status === 'OK') {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
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
    if (responseJson.status === 'OK') {
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
    if (responseJson.status === 'OK') {
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
    if (responseJson.status === 'OK') {
      return responseJson.data;
    } else {
      console.log(responseJson.message);
      return responseJson.message;
    }
  } catch (e) {
    console.log(e);
  }
};


export { userDetails, setupAccount, getHome, getAbout, getContact };
