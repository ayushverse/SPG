import { useState } from "react";
import { handleError, handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterStore() {
    const navigate = useNavigate();

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copystoreInfo = { ...storeInfo };
        copystoreInfo[name] = value;
        setStoreInfo(copystoreInfo);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            return handleError("Login First!");
        }

        if (!storeInfo.name || !storeInfo.address) {
            return handleError("Store name and address are required.");
        }

        try {
            const url = "http://localhost:8080/api/merchant/store/register";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(storeInfo),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem("currentStoreId", result.store._id);
                setTimeout(() => navigate("/add-product"), 1000);
                setStoreInfo({ name: "", address: "" });
            } else {
                handleError(message || "Store registration failed");
            }
        } catch (Err) {
            console.error(Err);
            handleError("Network Error: Could not connect to server.");
        }
    };

    return (
        <div className="fixed flex h-screen">
            <div className="bg-red-500 fixed right-0 top-0 w-1/4 h-screen pt-[50px] pl-10">
                <h1 className="text-white text-[120px] font-bold">Scan</h1>
                <h1 className="text-white text-[120px] font-bold">Pay</h1>
                <h1 className="text-white text-[120px] font-bold">Go.</h1>
            </div>

            <div className="pt-[20vh] pl-[50vh]">
                <div className="bg-white shadow-black drop-shadow-2xl rounded-2xl p-10 w-[400px]">
                    <h1 className="text-3xl font-bold text-center mb-6">Register Store</h1>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="flex flex-col">
                            <label htmlFor="Name" className="font-medium mb-1">
                                Name Of Store
                            </label>
                            <input
                                onChange={handleChange}
                                type="string"
                                name="name"
                                placeholder="Enter your store name"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-medium mb-1">
                                Address
                            </label>
                            <input
                                onChange={handleChange}
                                type="string"
                                name="address"
                                placeholder="Enter Store Address"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Register
                        </button>
                    </form>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default RegisterStore;
