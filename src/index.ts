import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotEnv from "dotenv";
import router from "./router";

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
dotEnv.config();

//middleware
app.use(
  cors({
    origin: ["https://starlight-un-edu.vercel.app","https://crispy-space-trout-v66774p7gqrqcpxrj-3000.app.github.dev", "http://localhost:3000","http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    credentials: true,
  })
);
app.options("/auth/protected", cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// testing endpoint
app.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "Server running" });
});

//routes

app.use("/", router());

//server connection
server.listen(PORT, () => console.log(`server running on ${PORT}`));
