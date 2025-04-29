import jwt from "jsonwebtoken";

export const verifyUserToken = async (req, res, next) => {
  try {
    const authHeader = req?.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ error: "Token not found or invalid format", data: "" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt?.verify(token, process.env.JWT_SECRET);
    req.auth = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Invalid token" });
  }
};