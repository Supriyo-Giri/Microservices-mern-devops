import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './db/connectDb.js';
import taskRouter from './routes/task.route.js'

dotenv.config();
const app = express()

//middleware
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3002;

app.use("/api/task",taskRouter);

app.get("/",(req,res)=>{
    res.send(`Service is up and running...`)
})

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
    connectDb();
})