import express from "express";

const app = express();

app.use("/health",(_req,res)=>{
    res.json({
        status : "ok",
        date : new Date().toISOString()
    })
})


export {app};

