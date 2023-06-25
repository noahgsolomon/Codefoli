
const updateHeaderOne = async (headerOne: string) => {
    try{
        const updateFetch = await fetch("http://localhost:8080/home/headerOne", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: headerOne,
            credentials: "include",
        });

        if (updateFetch.ok){
            return await updateFetch.text();
        }

    } catch (e){
        console.log(e);
    }
}

const updateDescriptionOne = async (descriptionOne: string) => {
    try{
        const updateFetch = await fetch("http://localhost:8080/home/descriptionOne", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: descriptionOne,
            credentials: "include",
        });

        if (updateFetch.ok){
            return await updateFetch.text();
        }

    } catch (e){
        console.log(e);
    }
}

const updateHeaderTwo = async (headerTwo: string) => {
    try{
        const updateFetch = await fetch("http://localhost:8080/home/headerTwo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: headerTwo,
            credentials: "include",
        });

        if (updateFetch.ok){
            return await updateFetch.text();
        }

    } catch (e){
        console.log(e);
    }
}


export {
    updateHeaderOne,
    updateDescriptionOne,
    updateHeaderTwo
}