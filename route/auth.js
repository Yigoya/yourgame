import express from 'express';
import User from '../model/user.js';
const router = express.Router();

router.post('/register',async (req, res)=>{
    try{
        const {username,email,password} = req.body;
        console.log(req.body)
        const user = await User.findOne({email:email});
        console.log(user)
        if(!user){
            const newUser = new User({
                username:username,
                email:email,
                password:password
            })
            const userdata=await newUser.save();
            res.json({status:200,message:"register success",user:userdata})
        }else{
            res.json({status:400,message:"email already exist"})
        }
    }catch(err){
        console.log(err);
    }
})

router.post('/login',async (req, res)=>{
    try{
        const {email,password} = req.body;
        console.log(req.body)
        const user = await User.findOne({email:email});
        console.log(user)
        if(user){
            if(user.password === password){
                res.json({status:200,message:"login success",user:user});

            }else{
                res.json({status:400,message:"password is wrong"})
            }
        }else{
            res.json({status:400,message:"user does not exist"})
        }
    }catch(err){
        console.log(err);
    }
})

export default router;