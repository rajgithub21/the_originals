import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default:{} },
},{minimize :false});
// user , userschema --------file will be made by name user in database in which data will be stored as per userschema
const userModel=mongoose.models.user || mongoose.model('user',userSchema);
export default userModel