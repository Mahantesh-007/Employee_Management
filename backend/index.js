const express = require('express')
const cors = require('cors')

const empRoute = require('./routes/employee')

const connectDB = require('./db/db');

require('dotenv').config();

const port = process.env.PORT || 6000;
const app = express();

connectDB();

const corsOption = {
    origin: ["http://localhost:5173"],
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Employee Management Backend")
})

app.use("/api/employee",empRoute)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}!!`)
})