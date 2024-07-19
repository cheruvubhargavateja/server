import { verifyToken } from "../libs/encryptAndDecryptToken.js";

export default async function (req, res, next) {
  const token = req.cookies.token || null;

  if (!token) {
    return res.status(401).json({
      message: "Token is invalid",
      success: false,
    });
  }

  try {
    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
      return res.status(403).json({
        message: "Token is expired.",
        success: false,
      });
    }

    req.user = verifiedToken;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}
