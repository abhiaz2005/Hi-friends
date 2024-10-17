import express from "express" ;
import dotenv from "dotenv" ;
import mongoose from "mongoose" ;
import cors from "cors" ;
import productRouter from "./routes/product.routes.js"
import userRouter from "./routes/user.routes.js"

dotenv.config() ;


const app = express() ;
const port = process.env.PORT || 3000 ;
const mongoURL = process.env.MONGO_ATLAS_URL ;

await main() .then(()=>{
    console.log("DB is connected")
}).catch((err)=>{
    console.log("Error: "+err) ;
})

async function main() {
    mongoose.connect(mongoURL) ;
}


//middlewares
app.use(cors()) ;
app.use(express.json({
    limit:"100mb",
}));


app.use("/product",productRouter ) ;
app.use("/user",userRouter ) ;



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
