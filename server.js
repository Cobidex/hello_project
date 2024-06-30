import express from "express";
import axios from "axios";
import { config } from 'dotenv';
config({ path: "./.env" });


const app = express();

app.set("trust proxy", true);

app.use("/api/hello", async (req, res) => {
  const client_ip = req.ip;
  const name = req.query.visitor_name;
  const token = process.env.TOKEN;
  try {

    const response = await axios.get(`https://ipinfo.io/${client_ip}?token=${token}`);
    const location = response.data.city;
    res.status(200).json({ client_ip, location, greeting: `Hello, ${name}!, the temperature is 11 degrees Celcius in ${location}` });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: "error", message: "lookup api error" })
  }
});

app.listen(8080, () => {
  console.log("server is listening on port", 8080);
});
