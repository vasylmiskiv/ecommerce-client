import express from'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import  {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = new express()

// функции апи
app.get('/', (req,res)=> {
  res.send('API is running')  
})

app.use('/api/products', productRoutes)


//erors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started! :${PORT}`.yellow.bold))



