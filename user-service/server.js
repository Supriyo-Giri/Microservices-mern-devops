import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './db/connectDb.js';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001;

//middlwares
app.use(cors());
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Service up and running..."
    })
})

app.use('/api/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at port: ${PORT}`);
    connectDb();
})