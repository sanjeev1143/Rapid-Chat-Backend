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

    res.json({
        status:true,
        data:{
            user:resp.username,
            email:resp.email,
            id:resp._id,
            isAvatarImageSet:resp.isAvatarImageSet,
            avatarImage: resp.avatarImage
        }
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

        const resp =  await userModel.findOne({username});
        if(!resp) return res.json({status:false,message:"Invalid Username"})
        const hash= resp.password;
        const verified = await bcrypt.compare(password,hash);
        if(verified)
          return  res.json({
                status:true,
                data:{
                    user:resp.username,
                    email:resp.email,
                    id:resp._id,
                    isAvatarImageSet:resp.isAvatarImageSet,
                    avatarImage: resp.avatarImage
                }
            })
        else    
            return res.json({
                status:true,
                message:"Invalid Password"
            })
            

        
   } catch (error) {
        res.json({
            status:false,
            message:error
        })
   }


}

module.exports.setAvatar = async(req,res,next)=>{

    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userModel.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage:avatarImage
        })

        return res.json({
            isSet:userData.isAvatarImageSet,image:userData.avatarImage
        })
    } catch (error) {
        res.json({
            staus:false,
            error:error
        })
    }

}


module.exports.getAllUsers = async(req,res,next)=>{

    try {
        
        const user  = await userModel.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]) ; 


        return res.json(user);


    } catch (error) {
        res.json({
            status:false,
            error:error
        })
    }

}