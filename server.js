import express from "express";

const app = express();

app.set("trust proxy", true);

app.use("/api/hello", (req, res) => {
  const client_ip = req.ip;
  const name = req.query.visitor_name;
  if (name)
    return res.status(200).json({ client_ip, greeting: `Hello ${name}` });
  return res.status(200).json({ client_ip, message: "Hello" });
});

app.listen(5000, () => {
  console.log("server is listening on port", 5000);
});
