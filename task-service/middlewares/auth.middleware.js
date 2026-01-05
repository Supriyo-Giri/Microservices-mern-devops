import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // logger.info(`Authenticated user: ${decoded.id}`);
    next();
  } catch (error) {
    logger.warn(`Auth failed: ${error.message}`);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
