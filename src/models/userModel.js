import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
       default:null
    }
},{
    timestamps:true
});
const userModel = mongoose.model('Users',userSchema);
export default userModel