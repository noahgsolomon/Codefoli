import { STAGE } from "../../config.ts";

const changeProjects = async (
  projects:
    | { text: string; id: string; type: "description" | "title" }
    | {
        operation: "add" | "remove";
        language: string;
        type: "language";
        id: string;
      }
    | { id: string; operation: "remove"; type: "project" }
    | {
        title: string;
        description: string;
        language: string;
        operation: "add";
        type: "project";
      }
) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/projects?request_type=CHANGE_PROJECTS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify(projects),
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

export { changeProjects };
