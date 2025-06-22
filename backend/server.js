const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute')

connectDB()

//Middleware
app.use(cors({
  origin: 'https://social-media-vert-nine.vercel.app', // replace with your real frontend URL
  credentials: true
}));
app.use(express.json());

//Route
app.use('/user',userRouter)
app.use('/post',postRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})