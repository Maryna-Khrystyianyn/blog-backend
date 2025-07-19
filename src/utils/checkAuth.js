import jwt from "jsonwebtoken";
export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      req.userId = decoded._id;
      console.log(decoded);
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: "no access" });
    }
  } else {
    return res.status(403).json({ message: "no access" });
  }

};
