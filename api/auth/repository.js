
import {User} from "../../models/user.js"

import {comparePassword, getToken, hashPassword} from "./helper.js"



 

export const signIn = async (email, password) => {

  let user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const check_password = await comparePassword(password, user.password);
  if (!check_password) throw new Error('Invalid Email or password');

  const token = await getToken(user);
  if (!token) throw new Error('Token generation failed');

  const userObject = user.toObject(); 

  delete userObject.password; 

  userObject.token = token;


  return userObject;
};

  export const signUp = async(data) => {

      let user= await User.findOne({ email: data.email });
      if (user) throw new Error ( 'Email already exist' );
      const hashedPassword = await hashPassword(data.password)
      user = new User({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPassword
      });
      user = await user.save();
      const userObject = user.toObject();
     
      delete userObject.password
      return userObject;
 
  };




          


