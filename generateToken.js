// generateToken.js (ESM style)
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Example payload aligned with backend expectations (see server/middleware/auth.js)
// The backend expects: { id, email, role, name }
const payload = {
    id: process.env.TOKEN_USER_ID || "admin",
    email: process.env.TOKEN_EMAIL || "admin@wastems.com",
    role: process.env.TOKEN_ROLE || "admin",
    name: process.env.TOKEN_NAME || "System Administrator",
};

// Secret from .env
const secret = process.env.JWT_SECRET;

// Options (optional expiry)
const options = { expiresIn: "1h" };

// Generate token
const token = jwt.sign(payload, secret, options);

console.log("Generated JWT:");
console.log(token);

console.log("\nUse it in curl like this:");
console.log(`curl -X GET https://waste-management-rho-roan.vercel.app/api/auth/me \
  -H "Authorization: Bearer ${token}"`);
