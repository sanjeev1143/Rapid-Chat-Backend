const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next)=>{
    try {
        
        
    const {username, email, password} = req.body;
    const usernameCheck = await userModel.findOne({username});
    if(usernameCheck)
        return res.json({message:"Username already used",status:false});
    const emailCheck = await userModel.findOne({email});
    if(emailCheck)
    return res.json({message:"Email already used",status:false});
    
    const resp = await userModel.create({
        username:username,
        email:email,
        password:password
    })
    delete resp.password;
    res.json({
        staus:true,
        message:"user registered successfully"
    })
} catch (error) {
    console.log(error);
        res.json({
            error:error,
            status:false
        })
}

};


module.exports.login = async (req,res,next)=>{
    
   try {
        const {username,password} = req.body
        
   } catch (error) {
        res.json({
            status:false,
            message:error
        })
   }


}