import express , {Express} from "express";

const app: Express = express();

import userRouter from "./routes/user.router.js";

app.use("/health",(_req,res)=>{
    res.json({
        status : "ok",
        date : new Date().toISOString()
    })
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);


export {app};

