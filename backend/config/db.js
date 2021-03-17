import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex : true
        })
        console.log('MongoDB connected '.blue + conn.connection.host.cyan.underline)
    } catch (eror){
        console.error('Error ' + error.message.red.underline.bold)
        process.exit(1)
    }
}


export default connectDB