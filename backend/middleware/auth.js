import jwt from "jsonwebtoken";

const authMiddleware = () => {
  return async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Token is required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.body.userId = decoded.userId;

      next();
    } catch (error) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
  };
};

export default authMiddleware;
