import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { http } from "http";
import { socketConfig } from "./config/socketIo.js";

const app = express()
const server = http.createServer(app);

// Initialize Socket.IO
socketConfig(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.route.js";

app.use("/api/v1/users",userRouter)


export {app};