import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError("Email and password are required");
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                handleError(message || "Login failed");
            }
        } catch (err) {
            handleError("Login Failed :(", err.message);
        }
    };

    return (
        <div className="flex h-screen">

            <div className="bg-red-500 fixed right-0 top-0 w-1/4 h-screen pt-[50px] pl-10">
                <h1 className="text-white text-[120px] font-bold">Scan</h1>
                <h1 className="text-white text-[120px] font-bold">Pay</h1>
                <h1 className="text-white text-[120px] font-bold">Go.</h1>
            </div>


            <div className="pt-[20vh] pl-[50vh]">
                <div className="bg-white shadow-black drop-shadow-2xl rounded-2xl p-10 w-[400px]">
                    <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-medium mb-1">
                                Email
                            </label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-medium mb-1">
                                Password
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Login
                        </button>

                        <p className="text-center text-gray-600 text-sm">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-red-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;
