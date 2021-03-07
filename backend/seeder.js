import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()

 connectDB()


 const importData = async () =>{
     try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //пушим в БД обьект юзерс с нашими юзерами
        const createdUser = await User.insertMany(users)
        
        // создали админа с 0 айди 
        const adminUser = createdUser[0]._id

        // создали переменную в которой выгружаем продуктс
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        })
        // мы пушим в наш БД всю инфу с переменной продуктс
        await Product.insertMany(sampleProducts)

        console.log('Data imported')
        // выходит с программы
        process.exit()
     } catch (erorr) {
        console.erorr(error)
        process.exit(1)
     }
 }

 const destroyData = async () =>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

       

       console.log('Data destroyed')
       // выходит с программы
       process.exit()
    } catch (erorr) {
       console.erorr(error.red)
       process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}