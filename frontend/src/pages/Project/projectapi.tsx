const getProjectFromSlug = async (slug: string) => {
  try {
    const response = await fetch(`http://localhost:8080/project/slug`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: slug,
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

export { getProjectFromSlug };
