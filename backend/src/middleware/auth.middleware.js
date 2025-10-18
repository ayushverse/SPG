import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const adminCheck = (req, res, next) => {
    if (req.user.email !== process.env.ADMIN_E) {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};


export const merchantCheck = (req, res, next) => {
    const allowedMerchants = process.env.MERCHANT_E.split(",");
    if (!allowedMerchants.includes(req.user.email)) {
        return res.status(403).json({ message: "Merchant access only" });
    }
    next();
};