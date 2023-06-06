const express = require("express");
const connection  = require("./config/db");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/posts",postRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at the port ${process.env.port}`);
    } catch (error) {
        console.log("Something went wrong " + error);
    }
})