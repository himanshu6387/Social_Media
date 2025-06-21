const userModel = require('../models/userModel')
const bcrypt =  require('bcryptjs');

exports.getAllUser = async(req,res) =>{
    try {
        const users = await userModel.find();
        return res.status(200).send({message:'Get all user Successfully',success:true,users,usercount:users.length})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error in getting User',success:false,error})
    }
}

exports.createUser = async (req,res)=>{
        let {username,email,password} = req.body;
    if(!username)
    {
        return res.status(400).send({message:'UserName is Required',success:false});
    }
    if(!email)
    {
         return res.status(400).send({message:'Email is Required',success:false});
     }
    if(!password) 
     {
         return res.status(400).send({message:'Password is Required',success:false});
    }
  

    let hashedPassword;
    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password,salt);
    } catch (error) {
        return res.status(400).send({message:'Error in hashing password',success:false})
    }

    try {
        const existingUser = await userModel.findOne({email});
    if(existingUser)
    {
       return res.status(400).send({message:'User already exists',success:false})
    }
        const users = await userModel.create({
            username,
            email,
            password:hashedPassword,
          
        })
        return res.status(200).send({message:'User registered Successfully..',success:true,users})
    
    } catch (error) {
        console.log(error)
    }
}


exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email)
        {
            return res.status(400).send({message:'Email is required..',success:false})
        }
        if(!password)
        {
           return res.status(400).send({message:'Password is required..',success:false})
        }

        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(400).send({message:'Email is not Found..',success:false})
        }

        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword)
        {
            return res.status(400).send({message:'Invalid password..',success:false})
        }

        return res.status(200).send({message:'User Loggedin Successfully..',success:true,user})


    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error in login user',success:false,error})
    }
}

