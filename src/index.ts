import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotEnv from "dotenv";

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
dotEnv.config();

//middleware

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// testing endpoint
app.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "Server running" });
});

//database connection

//server connection
server.listen(PORT, () => console.log(`server running on ${PORT}`));
