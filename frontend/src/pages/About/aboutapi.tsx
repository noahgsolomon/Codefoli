const updateHeaderOneAbout = async (headerOne: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/about/header-one", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: headerOne,
      credentials: "include",
    });

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateHeaderTwoAbout = async (headerTwo: string) => {
  try {
    const updateFetch = await fetch("http://localhost:8080/about/header-two", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: headerTwo,
      credentials: "include",
    });

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateDescriptionOneAbout = async (descriptionOne: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/about/description-one",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: descriptionOne,
        credentials: "include",
      }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const changeSectionTwoActive = async (sectionTwoActive: string) => {
  try {
    const response = await fetch(
      "http://localhost:8080/about/change-section-two",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: sectionTwoActive,
        credentials: "include",
      }
    );
    if (response.ok) {
      return await response.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const changeSectionThreeActive = async (sectionThreeActive: string) => {
    try {
        const response = await fetch(
            "http://localhost:8080/about/change-section-three",
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: sectionThreeActive,
                credentials: "include",
            }
        );
        if (response.ok) {
            return await response.text();
        }
    } catch (e) {
        console.log(e);
    }
};

const updateHeaderThreeAbout = async (headerThree: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/about/header-three",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: headerThree,
        credentials: "include",
      }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateDescriptionTwoAbout = async (descriptionTwo: string) => {
  try {
    const updateFetch = await fetch(
      "http://localhost:8080/about/description-two",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: descriptionTwo,
        credentials: "include",
      }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateBulletOneAbout = async (bulletOne: string) => {
  try {
    const updateFetch = await fetch(
        "http://localhost:8080/about/bullet-one",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: bulletOne,
          credentials: "include",
        }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateBulletTwoAbout = async (bulletTwo: string) => {
  try {
    const updateFetch = await fetch(
        "http://localhost:8080/about/bullet-two",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: bulletTwo,
          credentials: "include",
        }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

const updateBulletThreeAbout = async (bulletThree: string) => {
  try {
    const updateFetch = await fetch(
        "http://localhost:8080/about/bullet-three",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: bulletThree,
          credentials: "include",
        }
    );

    if (updateFetch.ok) {
      return await updateFetch.text();
    }
  } catch (e) {
    console.log(e);
  }
};

export {
  updateHeaderOneAbout,
  updateHeaderTwoAbout,
  updateDescriptionOneAbout,
  changeSectionTwoActive,
  changeSectionThreeActive,
  updateHeaderThreeAbout,
  updateDescriptionTwoAbout,
  updateBulletOneAbout,
  updateBulletTwoAbout,
  updateBulletThreeAbout,
};
