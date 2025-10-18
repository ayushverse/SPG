import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils.js";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copysignupInfo = { ...signupInfo };
        copysignupInfo[name] = value;
        setSignupInfo(copysignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError("All fields are required");
        }


        try {
            const url = "http://localhost:8080/api/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate("/login"), 1000);
            } else {
                handleError(message || "Signup failed");
            }
        } catch (err) {
            handleError("Signup Failed :(", err.message);
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
                    <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={signupInfo.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={signupInfo.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={signupInfo.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Sign Up
                        </button>

                        <p className="text-center text-gray-600 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-red-500 hover:underline">
                                Login In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
