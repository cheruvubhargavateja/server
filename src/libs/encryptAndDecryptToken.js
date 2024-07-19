import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  const token = jwt.sign(
    {
      data: data,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

export const verifyToken = (tokenValue) => {
  const decoded = jwt.verify(tokenValue, process.env.TOKEN_SECRET);
  return decoded;
};
