import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import http from "http"
import { scheduler } from "./config/scheduler.js";
import { socketIo } from "./config/socketIo.js";

const app = express()
const server = http.createServer(app);
const API_VERSION = process.env.API_VERSION || '/api/v1';

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
import plans from './routes/plans.routes.js'

app.use(`${API_VERSION}/users`,organization)
app.use(`${API_VERSION}/organization/branch`,branches)
app.use(`${API_VERSION}/mail`,mail)
app.use(`${API_VERSION}/categories`,categories)
app.use(`${API_VERSION}/product`,product)
app.use(`${API_VERSION}/plans`,plans)


export {app};