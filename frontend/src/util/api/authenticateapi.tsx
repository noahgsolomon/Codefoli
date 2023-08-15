const login = async (email: string, password: string) => {
  const model = {
    username: email,
    password: password,
  };
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }
    );

    const responseJson = await response.json();
    const responseBody = responseJson.body;

    if (responseBody.status === "OK") {
      localStorage.setItem("Id", responseBody.data.idToken);
      localStorage.setItem("Refresh", responseBody.data.refreshToken);
      return responseBody;
    } else {
      return responseBody;
    }
  } catch (e) {
    console.log(e);
  }
};

const register = async (name: string, email: string, password: string) => {
  const model = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }
    );

    const responseJson = await response.json();
    const responseBody = responseJson.body;

    if (responseBody.status === "OK") {
      localStorage.setItem("Id", responseBody.data.idToken);
      localStorage.setItem("Refresh", responseBody.data.refreshToken);
      return responseBody;
    } else {
      console.log(response);
      return responseBody;
    }
  } catch (e) {
    console.log(e);
  }
};

const authenticated = async () => {
  try {
    const response = await fetch(
      "https://f60z27ge89.execute-api.us-east-1.amazonaws.com/prod/authenticate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Id"),
          Refresh: localStorage.getItem("Refresh") || "",
        },
      }
    );

    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { login, register, authenticated };
