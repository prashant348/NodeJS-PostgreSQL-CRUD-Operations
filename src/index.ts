import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// use built in middlware to parse json 
app.use(express.json())

// routes
app.use('/', usersRouter)

// health check
app.get("/", (req, res) => {
    res.json({
        message: "server is running"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
