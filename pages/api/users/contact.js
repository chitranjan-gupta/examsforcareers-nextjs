import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    await dbConnect();
    try {
      const { name, email, phone, message } = req.body;
      if (!email || !name || !phone || !message) {
        return new Promise((resolve) => {
          res
            .status(400)
            .json({ message: "Email or Password Should not be empty" });
          res.end();
          return resolve();
        });
      }
      return new Promise((resolve) => {
        res.status(200).json({ message: "In Development" });
        res.end();
        return resolve();
      });
    } catch (err) {
      return new Promise((resolve) => {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      });
    }
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
