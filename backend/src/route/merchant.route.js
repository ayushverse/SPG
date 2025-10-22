import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { merchantCheck } from "../middleware/auth.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";


import {
    registerStore, updateStore, getStore, getAllStores
} from "../controller/store.controller.js";

import {
    addProduct, deleteProduct, getProduct, getProductsByStore
} from "../controller/product.controller.js";

const router = express.Router();


router.post("/store/register", protectRoute, merchantCheck, registerStore);
router.put("/store/:id", protectRoute, merchantCheck, updateStore);
router.get("/store/:id", protectRoute, merchantCheck, getStore);
router.get("/store/all", protectRoute, merchantCheck, getAllStores);


router.post("/product/add", protectRoute, merchantCheck, uploadImage.single('image'), addProduct);
router.delete("/product/:id", protectRoute, merchantCheck, deleteProduct);
router.get("/product/:id", protectRoute, merchantCheck, getProduct);
router.get("/product/store/:storeId", protectRoute, merchantCheck, getProductsByStore);

export default router;