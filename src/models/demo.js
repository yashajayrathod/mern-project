import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company:{
        type:String,
        required:true,
    },
    expiryDate:{
        type: Date,
        required:true,
    },
    generatePassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
export default Client;
