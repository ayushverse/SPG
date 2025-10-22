import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

function Inventory() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const currentStoreId = localStorage.getItem("currentStoreId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            if (!currentStoreId || !token) {
                handleError("Authorization or Store ID missing. Please log in.");
                setError("Authorization or Store ID missing. Please log in.");
                return;
            }

            setError(null);

            try {
                const res = await axios.get(
                    `http://localhost:8080/api/merchant/product/store/${currentStoreId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProducts(res.data.products || []);
            } catch (err) {
                console.error(err);
                const errorMessage = err.response?.data?.message || "Failed to load inventory. Check server logs.";
                handleError(errorMessage);
                setError(errorMessage);
                setProducts([]);
            }
        };

        if (currentStoreId) {
            fetchProducts();
        }
    }, [currentStoreId, token]);

    return (
        <div className="inventory-container">
            <ToastContainer />
            <h2>Your Inventory</h2>
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Barcode</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {error ? (
                    <tr>
                        <td colSpan="6" style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
                            Error loading inventory: {error}
                        </td>
                    </tr>
                ) : products.length > 0 ? (
                    products.map((p) => (
                        <tr key={p._id}>
                            <td><img src={p.image} alt={p.name} width="50" /></td>
                            <td>{p.name}</td>
                            <td>{p.barcode}</td>
                            <td>₹{p.price}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="6">No products listed yet</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;
