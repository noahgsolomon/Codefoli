import { STAGE } from "../../config.ts";

const deploy = async ({ subdomain, custom_domain, distribution }: { subdomain: string | null, custom_domain: string | null, distribution: string | null }) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/deploy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
        },
        body: JSON.stringify({ subdomain: subdomain, custom_domain: custom_domain, distribution: distribution }),
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

const subdomainAvailability = async (subdomain: string) => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/subdomain?subdomain=${subdomain}`,
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
      console.log(responseJson.message);
      return responseJson;
    }
  } catch (e) {
    console.log(e);
  }
};

const checkDeployed = async () => {
  try {
    const response = await fetch(
      `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/deployed`,
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
      console.log(responseJson.message);
      return responseJson;
    }
  } catch (e) {
    console.log(e);
  }
};

const checkCustomDomainDetails = async () => {
    try {
        const response = await fetch(
        `https://f60z27ge89.execute-api.us-east-1.amazonaws.com/${STAGE}/custom-domain`,
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
        console.log(responseJson.message);
        return responseJson;
        }
    } catch (e) {
        console.log(e);
    }
}

export { deploy, checkDeployed, subdomainAvailability, checkCustomDomainDetails };
