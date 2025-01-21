import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';

  export const comparePassword = async  (enteredPassword,dbPassword)=>{

    const isPasswordCorrect = await bcrypt.compare(enteredPassword,dbPassword);

    return isPasswordCorrect
}




  export const  hashPassword = async (dbPassword)=>{

    const hashedPassword = await bcrypt.hash(dbPassword, 10);
    
    return hashedPassword

}


export const getToken = async(user)=>{


 let token = await jwt.sign(
  {userId: user._id, email :user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' } 
);

return token
}
