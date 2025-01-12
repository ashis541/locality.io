import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http"
import { socketIo } from "./config/socketIo.js";

const app = express()
const server = http.createServer(app);

// Initialize Socket.IO
socketIo(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import organization from "./routes/organization.route.js";
import branches from "./routes/branches.route.js"
app.use("/api/v1/users",organization)
app.use("/api/v1/organization/branch",branches)

export {app};