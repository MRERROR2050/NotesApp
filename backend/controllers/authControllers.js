const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**
 * @description signup user
 * @route /auth/signup
 * @method POST
 * @access public
 */
const signupCtrl = async (req, res) => {
    try{



        const {name, email, password} = req.body
        console.log(name);
        console.log(email);
        console.log(password);
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



      
        

        const isUserFound = await User.findOne({email})
        console.log(isUserFound);
        if(isUserFound){
            return res.status(400).json({error:true, message:"User Already Exist" })
        }
        
        const newUser = await User.create({
            name,email, password: hashedPassword,
        })
        console.log(newUser);
        
        
        res.status(200).json({error:false, message:"Create New User Successfully"})
        
    }catch(error){
        res.status(500).json({ error });
        console.log(error);
    
      
        

    }

}

/**
 * @description login user
 * @route /auth/login
 * @method POST
 * @access public
 */
const loginCtrl =  async (req, res) => {

    try{
      
      const{email,password} = req.body
      console.log(email);
      console.log(password);
   
       const user = await User.findOne({email})
   
       if (!user){
           return res.status(404).json({error:true, message:"User Not Found"})
       }
   
       const passwordMatch = await bcrypt.compare(password, user.password);
       if (!passwordMatch) {
         return res.status(400).json({ message: "password not match" });
       }
   
       const token = jwt.sign({id:user._id},"dsadsadh")
       
       res.status(200).json({
         error:false,  message: "Login success", user: { ...user._doc, token }});
         
   
   
    }catch(error){
       res.status(500).json({ error });
       console.log(error);
       
    }
       
       }


       
module.exports = {
    signupCtrl,
    loginCtrl,
  };
  