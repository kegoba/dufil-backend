import { response } from "express";
import { signIn, signUp } from "./repository.js";




  export const  sign_up_user =  async(req, res)=>  {
    try {
      const data = req.body;
      
      const response = await signUp(data); 
      
        res.status(201).json({
           msg: "signup Succussful" ,
           data : response,
           responseCode :201


          });
    
    } catch (error) {

      res.status(400).json({
         msg: "faile to sign up user", 
         error: error.message,
         responseCode : 400
        });
    }
  };
 

  export const sign_in_user= async (req, res)=>{
    const { email, password } = req.body;
    try {
      const user = await signIn(email, password);
      return res.json({ 
         msg: "signin Succussful" ,
           data : user,
           responseCode :200
      });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
    
  };








