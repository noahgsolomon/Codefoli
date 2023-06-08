function getCookie(name: string) {
    const cookieArr = document.cookie.split(";");
    console.log(cookieArr);

    for(let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        console.log(cookiePair[0].trim());
        if(name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}

function isAuthenticated() {
    const cookie = getCookie("SESSION_ID");
    console.log(cookie);
    return cookie !== null;
}

export default isAuthenticated;