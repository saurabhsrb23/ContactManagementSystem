const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    }
})
mongoose.model('CONTACT',ContactSchema)