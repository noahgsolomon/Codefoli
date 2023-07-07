const updateHeaderOneAbout = async (headerOne: string) => {
    try {
        const updateFetch = await fetch(
            "http://localhost:8080/about/header-one",
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: headerOne,
                credentials: "include",
            }
        );
        const updateFetchJson = await updateFetch.json();
        if (updateFetchJson.status === 'OK') {
            return updateFetchJson.data;
        }
        else {
            console.log(updateFetchJson.message);
            return updateFetchJson.message;
        }
    } catch (e) {
        console.log(e);
    }
};

const updateHeaderTwoAbout = async (headerTwo: string) => {
    try {
        const updateFetch = await fetch(
            "http://localhost:8080/about/header-two",
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: headerTwo,
                credentials: "include",
            }
        );
        const updateFetchJson = await updateFetch.json();
        if (updateFetchJson.status === 'OK') {
            return updateFetchJson.data;
        }
        else {
            console.log(updateFetchJson.message);
            return updateFetchJson.message;
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
                headers: {"Content-Type": "application/json"},
                body: descriptionOne,
                credentials: "include",
            }
        );
        const updateFetchJson = await updateFetch.json();
        if (updateFetchJson.status === 'OK') {
            return updateFetchJson.data;
        }
        else {
            console.log(updateFetchJson.message);
            return updateFetchJson.message;
        }
    } catch (e) {
        console.log(e);
    }
};

export {
  updateHeaderOneAbout,
  updateHeaderTwoAbout,
  updateDescriptionOneAbout,

};
