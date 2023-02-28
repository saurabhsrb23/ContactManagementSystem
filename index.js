const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 3000

require('./connectiondb')
require('./modelContact')

app.use(express.json())

const CONTACT=mongoose.model('CONTACT')

// Json data for testing

// {
//     "firstName": "saurabh",
//     "lastName": "srivastava",
//     "email": "saurabhsrb23@gmail.com",
//     "phone": 6204058598
// }

//link for checking

//http://localhost:3000/v1/contacts

app.post('/v1/contacts',async(req,res)=>{
    const {firstName,lastName,email,phone}=req.body

    if(!firstName){
        return res.status(404).json({
            message:"Missing required field(s): firstname  !!!"
        })
    }else if(!lastName){
        return res.status(404).json({
            message:"Missing required field(s): lastName  !!!"
        })
    }else if(!email){
        return res.status(404).json({
            message:"Missing required field(s): email !!!"
        })
    }else if(!phone){
        return res.status(404).json({
            message:"Missing required field(s): phone  !!!"
        })
    }

        const persentContact= await CONTACT.findOne({email:req.body.email})

        if(persentContact){
             return res.status(400).json({
            message:"User Email already persent  !!!"
        })

        }
            const contact=new CONTACT(req.body);
            await contact.save();
            res.status(200).json({
                message: "contact created"
            })   

})

app.get('/v1/contacts', async(req, res) => {

    const contacts=await CONTACT.find();
    res.json(contacts).status(200)

})
app.get('/v1/contacts/:id', async(req, res) => {
    const {id}=req.query
    const contacts=await CONTACT.findOne(id);
   

    if(contacts){
        res.json(contacts).status(200)
    }else{
        res.status(404).json({
            message: " There is no contact with that id"
        })
    }

    res.json(contacts).status(200)

})

app.delete('/v1/contacts/:id', async(req, res) => {


const {id}=req.params
const contact= await CONTACT.findByIdAndDelete(id)

if(contact){

    res.json({
        message:"deleted sucessful"
    })
}else{
    res.status(404).json({
        message: "not Contact found"
    })
}

})



app.put('/v1/contacts/:id',async (req, res) => {
    const {id}=req.params;
    const contact=await CONTACT.findByIdAndUpdate(id,req.body,{new:true})
    if(contact){

        res.status(204).json(contact)

    }else{
        res.status(404).json({
            message: "There is no contact with that id"
        })
    }
})

app.patch('/v1/contacts/:id',async (req, res) => {
    const {id}=req.params;
    const contact=await CONTACT.findByIdAndUpdate(id,req.body,{new:true})
    if(contact){
        res.status(204).json({
            message:"Contact updated !!"
        })
    }else{
        res.status(404).json({
            message: "There is no contact with that id !!"
        })
    }
})


app.listen(port, () => console.log(`app listening on port ${port}!`))