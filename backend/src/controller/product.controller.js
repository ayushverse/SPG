import {Store} from "../models/store.model.js";
import {Product} from "../models/product.model.js";


export const addProduct = async (req, res) => {
    try {
        const { storeId, name, price, stock } = req.body;

        if (!storeId || !name || !price) {
            return res.status(400).json({ message: "Store, name, and price are required" });
        }


        const store = await Store.findOne({ _id: storeId, ownerEmail: req.user.email });
        if (!store) return res.status(403).json({ message: "Not authorized for this store" });

        const product = new Product({ storeId, name, price, stock });
        await product.save();

        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });


        const store = await Store.findOne({ _id: product.storeId, ownerEmail: req.user.email });
        if (!store) return res.status(403).json({ message: "Not authorized for this product" });

        Object.assign(product, updates);
        await product.save();

        res.json({ message: "Product updated", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product" });
    }
};

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

        const store = await Store.findOne({ _id: storeId, ownerEmail: req.user.email });
        if (!store) return res.status(403).json({ message: "Not authorized for this store" });

        const products = await Product.find({ storeId });
        res.json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products" });
    }
};
