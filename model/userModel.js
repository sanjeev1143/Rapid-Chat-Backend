const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:3,
        max:20,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:""
    }
})

userSchema.pre('save',async function(next){
    const salt  =await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
     next();
 })
 

module.exports= userModel = mongoose.model("userchatapp",userSchema)