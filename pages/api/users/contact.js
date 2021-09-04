import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Contact = require("@/models/contact");
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
      const contact = new Contact({
        name: name,
        email: email,
        phone: phone,
        messages: message,
      });
      await contact.save();
      return new Promise((resolve) => {
        res.status(200).json({ message: "Thank You! We Will Contact You" });
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
