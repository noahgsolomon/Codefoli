
const userDetails = async () => {
    try{
        const response = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })

        if (response.ok){
            return response.json();
        }
    }
    catch (e) {
        console.log(e);
    }

}

export {
    userDetails
}