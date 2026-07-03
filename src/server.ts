import {app} from "./app.js";
import {
    PORT
} from "./config/env.js";



function startServer(){
    app.listen(PORT, ()=>{
     console.log(`SERVER RUNING ON PORT : ${PORT}`)
    })
}

startServer();


