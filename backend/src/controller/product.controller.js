import {Store} from "../models/store.model.js";
import {Product} from "../models/product.model.js";
import mongoose from 'mongoose';


export const addProduct = async (req, res) => {
    try {
        const { storeId, name, price, stock , barcode} = req.body;

        const imageUrl = req.file?.path


        if (!storeId || !name || !price || stock === undefined || stock === null || !imageUrl) {
            return res.status(400).json({ message: "Store ID, name, price, stock, and image are required" });
        }

        const store = await Store.findOne({ _id: storeId, ownerEmail: req.user.email });
        if (!store) return res.status(403).json({ message: "Not authorized for this store" });

        const product = new Product({
            storeId,
            name,
            price: Number(price),
            stock: Number(stock),
            barcode,
            image: imageUrl
        });
        await product.save();

        res.status(201).json({ message: "Product added", product , success:true});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted", success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting product" });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const store = await Store.findOne({ _id: product.storeId, ownerEmail: req.user.email });
        if (!store) return res.status(403).json({ message: "Not authorized" });

        res.json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching product" });
    }
};

export const getProductsByStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findById(storeId);
        if (!store) return res.status(404).json({ message: "Store not found" });

        const products = await Product.find({ storeId });
        res.json({ products });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products" });
    }
};