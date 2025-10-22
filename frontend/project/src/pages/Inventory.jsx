import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

function Inventory() {
    const [products, setProducts] = useState([]);
    const currentStoreId = localStorage.getItem("currentStoreId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            if (!currentStoreId || !token) {
                handleError("Authorization or Store ID missing. Please log in.");
                return;
            }
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/merchant/product/store/${currentStoreId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProducts(res.data.products || []);
            } catch (err) {
                const errorMessage =
                    err.response?.data?.message || "Failed to load inventory. Check server logs.";
                handleError(errorMessage);
                setProducts([]);
            }
        };
        if (currentStoreId) fetchProducts();
    }, [currentStoreId, token]);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await axios.delete(
                `http://localhost:8080/api/merchant/product/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProducts(products.filter((p) => p._id !== productId));
            alert(res.data.message);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to delete product";
            handleError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <ToastContainer />
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Inventory</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                        <thead className="bg-gray-100">
                        <tr className="text-gray-700 text-left">
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Barcode</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Stock</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">
                                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{p.barcode}</td>
                                    <td className="py-3 px-4 text-gray-700">₹{p.price}</td>
                                    <td className="py-3 px-4 text-gray-700">{p.stock}</td>
                                    <td className="py-3 px-4 flex items-center justify-center gap-3">
                                        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-600 py-6 italic">
                                    No products listed yet
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
