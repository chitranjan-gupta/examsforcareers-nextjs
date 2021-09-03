import auth from "@/middleware/adminauth";
const handler = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    return new Promise((resolve) => {
      try {
        res.status(200).json(req.admin);
      } catch (err) {
        res.status(500).json({ message: "Error In The Server" });
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

export default auth(handler, "POST");
