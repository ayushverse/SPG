import React from 'react';
import {useNavigate} from "react-router-dom";


function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div>
            <button onClick={handleLogout} className="cursor-pointer bg-red-500 rounded-xl p-3 m-2 text-white hover:bg-red-600">Logout</button>
        </div>
    );
}

export default Logout;