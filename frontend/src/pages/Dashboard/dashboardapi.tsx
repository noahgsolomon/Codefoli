
const updateHeaderOne = async (headerOne: string) => {
    try {
        const updateFetch = await fetch(
            "http://localhost:8080/home/headerOne",
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

const updateDescriptionOne = async (descriptionOne: string) => {
    try {
        const updateFetch = await fetch(
            "http://localhost:8080/home/descriptionOne",
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
    updateHeaderOne,
    updateDescriptionOne,
}