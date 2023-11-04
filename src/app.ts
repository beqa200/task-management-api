import express from "express"
import boardRouter from "./routes/boardRoutes"
import morgan from "morgan"

const app = express();

if(process.env.NODE_ENV == "development") {
    app.use(morgan("dev"))
}

app.use(express.json());
app.use("/api/v1/boards", boardRouter)


export default app;