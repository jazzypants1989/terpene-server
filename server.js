import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import connectDB from './config/database.js'
import terpRoutes from './routes/terps.js'

const PORT = process.env.PORT || 2121
const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/terps', terpRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    }
)