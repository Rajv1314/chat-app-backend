import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    const Connect =await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mogodb Connect ${Connect.connection.host}`);
    
  } catch (error) {
    console.log(`Mongodb Error ${error}`);

  }
};
