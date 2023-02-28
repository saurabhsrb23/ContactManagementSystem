const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://ContactManagementSystem:ContactManagementSystem@cluster0.vyaqclz.mongodb.net/?retryWrites=true&w=majority')

mongoose.set('strictQuery',true)

mongoose.connection.on('connected',()=>{
    console.log("Database Connected !!!!!")
})
mongoose.connection.on('error',()=>{
    console.log(" Failed to connect Database !!!!!")
})