"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
dotenv_1.default.config();
//middleware
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://starlight-un-edu.vercel.app"],
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
// testing endpoint
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Server running" });
});
//routes
app.use("/", (0, router_1.default)());
//server connection
server.listen(PORT, () => console.log(`server running on ${PORT}`));
//# sourceMappingURL=index.js.map