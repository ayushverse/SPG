import { useState, useRef, useEffect } from "react";
import { handleError, handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";

function AddProducts() {
    const [productInfo, setProductInfo] = useState({
        storeId: "",
        name: "",
        price: "",
        barcode: "",
        stock: "",
        image: null
    });

    const fileInputRef = useRef();

    useEffect(() => {
        const storedId = localStorage.getItem("storeId");
        if (storedId) {
            setProductInfo((prev) => ({ ...prev, storeId: storedId }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductInfo((prev) => ({ ...prev, image: file }));
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return handleError("Login First");

        const { storeId, name, price, stock, image } = productInfo;
        if (!storeId || !name || !price || !stock || !image) {
            return handleError("All fields are required");
        }

        try {
            const formData = new FormData();
            formData.append("storeId", storeId);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("barcode", productInfo.barcode);
            formData.append("stock", stock);
            formData.append("image", image);

            const response = await fetch("http://localhost:8080/api/merchant/product/add", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const result = await response.json();

            if (response.status === 201) {
                handleSuccess(result.message || "Product Added Successfully");


                setProductInfo({
                    storeId,
                    name: "",
                    price: "",
                    barcode: "",
                    stock: "",
                    image: null
                });
                fileInputRef.current.value = "";
            } else {
                handleError(result.message || "Product addition failed");
            }
        } catch (error) {
            console.error(error);
            handleError("Network Error: Could not connect to server.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="bg-red-500 fixed right-0 top-0 w-1/4 h-screen pt-[50px] pl-10">
                <h1 className="text-white text-[120px] font-bold">Scan</h1>
                <h1 className="text-white text-[120px] font-bold">Pay</h1>
                <h1 className="text-white text-[120px] font-bold">Go.</h1>
            </div>

            <div className="pt-[10vh] pl-[50vh]">
                <div className="bg-white shadow-black drop-shadow-2xl rounded-2xl p-10 w-[400px]">
                    <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>

                    <form onSubmit={handleAddProduct} className="space-y-5">
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Store ID</label>
                            <input
                                type="text"
                                name="storeId"
                                value={productInfo.storeId}
                                disabled
                                className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Product Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                value={productInfo.name}
                                placeholder="Enter Product Name"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Price</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="price"
                                value={productInfo.price}
                                placeholder="Enter Product Price"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Stock</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="stock"
                                value={productInfo.stock}
                                placeholder="Enter Stock Quantity"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Product Image</label>
                            <input
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                type="file"
                                name="image"
                                accept="image/*"
                                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>

                        {productInfo.image && (
                            <img
                                src={URL.createObjectURL(productInfo.image)}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover rounded-lg"
                            />
                        )}

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Add Product
                        </button>
                    </form>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
