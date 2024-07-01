import express from "express";
import axios from "axios";
import { config } from 'dotenv';
config({ path: "./.env" });


const app = express();

app.set("trust proxy", true);

app.use("/api/hello", async (req, res) => {
  const client_ip = req.ip;
  const name = req.query.visitor_name;
  const { TOKEN, API_KEY } = process.env;
  try {

    const response = await axios.get(`https://ipinfo.io/${client_ip}?token=${TOKEN}`);
    const location = response.data.city;
    const weather = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${response.data.loc}`);
    const temp = weather.data.current.temp_c;
    res.status(200).json({ client_ip, location, greeting: `Hello, ${name}!, the temperature is ${temp} degrees Celcius in ${location}` });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: "error", message: "lookup api error" })
  }
});

app.listen(5000, () => {
  console.log("server is listening on port", 5000);
});
