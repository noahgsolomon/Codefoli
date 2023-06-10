import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../util/api/userapi.tsx";
import Loader from "../../common/Components/Loader/Loader.tsx";


const Dashboard: React.FC = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userDetails();
            setLoading(false)
            if (user) {
                localStorage.setItem('loggedIn', 'true');
                console.log(user);
            }
            else {
                localStorage.removeItem('loggedIn');
                navigate('/login');
            }
        }
        fetchUser();
    })

    return (
        <>
            {loading && <Loader />}
        </>
    )
}

export default Dashboard;