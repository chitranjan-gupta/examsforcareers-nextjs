const authenticate = require("@/middleware/authenticate");
const handler = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    return new Promise((resolve) => {
      try {
        res.status(200).json({ message: req.body.data });
        res.end();
        return resolve();
      } catch (err) {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      }
    });
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
};
export default authenticate(handler, "POST");
