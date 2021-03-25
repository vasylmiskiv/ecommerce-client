import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import data users, products
import users from './data/users.js'
import products from './data/products.js'
// import Schemes
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
// import connect to mongodb
import connectDB from './config/db.js'

dotenv.config()

 connectDB()

//import all data in DB
 const importData = async () => {
     try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

       //push users on  Schema ib DB
        const createdUser = await User.insertMany(users)
        
        // создали админа 
        const adminUser = createdUser[0]._id

        // создали переменную в которой выгружаем продуктс
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        })

         //push products on  Schema ib DB
        await Product.insertMany(sampleProducts)
        console.log('Data imported')

        // выходит с программы
        process.exit()
     } catch (error) {
        console.error(error)
        process.exit(1)
     }
 }

// Destroy all data in DB
 const destroyData = async () =>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
       console.log('Data destroyed')
       // выходит с программы
       process.exit()
    } catch (error) {
       console.error(error)
       process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}