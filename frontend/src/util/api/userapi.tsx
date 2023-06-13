import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";

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

const setupAccount = async (name: string, email: string, company: string, location: string, skills: string[], work: Work[], projects: Project[]) => {
    const model = {
        name: name,
        email: email,
        company: company,
        location: location,
        skills: skills,
        work: work,
        projects: projects
    }
    try{
        const response = await fetch('http://localhost:8080/setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model),
            credentials:'include'
        })

        if (response.ok){
            return response.text();
        }
    }
    catch (e) {
        console.log(e);
    }
}

export {
    userDetails,
    setupAccount
}