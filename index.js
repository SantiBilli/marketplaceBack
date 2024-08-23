import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";

const app = express();
const PORT = process.env.PORT || 3550;

app.disable("x-powered-by")
app.use(cors())
app.use(express.json({limit: "10mb"}))

app.use("/api", pingRouter)
app.use("/api", registerRouter)
app.use("/api", loginRouter)

app.listen(PORT, () => {
    console.log(`Server listening on https//localhost:${PORT}`)
})