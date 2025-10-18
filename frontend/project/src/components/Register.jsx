import React from 'react';
import {useNavigate} from "react-router-dom";


function Register() {

    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=>navigate("/register-store")} className="cursor-pointer bg-red-500 rounded-xl p-3 m-2 text-white hover:bg-red-600">Register Store</button>
        </div>
    );
}

export default Register;