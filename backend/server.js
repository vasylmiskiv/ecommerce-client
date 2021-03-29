import express from'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import  {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import path from 'path'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = new express()

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/upload', uploadRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res)=>res.send(process.env.PAYPAL_CLIENT_ID))

//static folder
const __dirname = path.resolve()

//for img
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

//for production
process.env.NODE_ENV === 'production' && app.use(express.static(path.join(__dirname, '/mern/build'))) && app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'mern', 'build', 'index.html')))

//errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started! :${PORT}`.yellow.italic))



