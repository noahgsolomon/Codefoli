
const login = async (email: string, password: string) => {
    try{
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            }),
            credentials: 'include'
        });

        if (response.ok){
            return response.text();
        }
        else{
            console.log(response);
        }

    }catch (e) {
        console.log(e);
    }
}

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
    userDetails,
    login
}