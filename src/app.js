import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http"
import { scheduler } from "./config/scheduler.js";
import { socketIo } from "./config/socketIo.js";

const app = express()
const server = http.createServer(app);

// Initialize Socket.IO
socketIo(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
scheduler()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import organization from "./routes/organization.routes.js";
import branches from "./routes/branches.routes.js"
import mail from './routes/mail.routes.js'
import categories from './routes/categories.routes.js'
import product from './routes/products.routes.js'

app.use("/api/v1/users",organization)
app.use("/api/v1/organization/branch",branches)
app.use("api/v1/mail",mail)
app.use("api/v1/categories",categories)
app.use("api/v1/product",product)


export {app};