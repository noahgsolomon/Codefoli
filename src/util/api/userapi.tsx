
const userDetails = async () => {
    const response = await fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include'
    })

    if (response.ok){
        return response.json();
    }
    else if (response.status === 401){
        localStorage.removeItem('loggedIn');
    }
}

export {
    userDetails
}