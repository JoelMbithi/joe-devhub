import mongoose from 'mongoose'


// create user scehema which contains the data user has to provide

const userScehema = new mongoose.Schema({
    _id:{ type:String,required:true},
    name:{ type:String,required:true},
    email:{ type:String,required:true, unique:true},
    imageUrl:{ type:String, required:true},
    cartItems:{ type:Object, default:{}}
}, {minimize: false})

//create user model were we can use it and create multiple uses and store them in db

const User = mongoose.models.user || mongoose.model('user',userScehema)

export default User 