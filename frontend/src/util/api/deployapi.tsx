

const deploy = async () => {
    try {
        const response = await fetch("http://localhost:8080/deploy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

export {
    deploy,
}