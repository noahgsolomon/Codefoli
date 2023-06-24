
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

export {
    updateHeaderOne
}