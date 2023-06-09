import React, {useEffect} from "react";
import {userDetails} from "../../util/api/userapi.tsx";
import {useNavigate} from "react-router-dom";


const Dashboard: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userDetails();
            if (user){
                localStorage.setItem('loggedIn', 'true');
                console.log(user);
            }
            else{
                localStorage.removeItem('loggedIn');
                navigate('/login');
            }
        }
        fetchUser();
    })

    return (
        <>
        </>
    )
}

export default Dashboard;