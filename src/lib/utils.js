import jwt from 'jsonwebtoken'
export const generateToken = (userId,res) => {
    const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"});
    return token
};
