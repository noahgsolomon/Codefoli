const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });

    if (response.ok) {
      return response.text();
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

const register = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      credentials: "include",
    });

    if (response.ok) {
      return response.text();
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

export { login, register };
