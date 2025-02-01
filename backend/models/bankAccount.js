import mongoose from "mongoose";
import Joi from "joi";

const BankAccountSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
},
  IFSCCODE: { 
    type: String, 
},
  branchName: { 
    type: String, 
},
  bankName: { 
    type: String, 
},
  accountNumber: { 
    type: String, 
    unique: true 
},
  accountHolderName: { 
    type: String, 
},
});


const BankAccount = mongoose.model("BankAccount", BankAccountSchema);

const validateAccount = (bank) => {
    const schema = Joi.object({
        bankName: Joi.required(),
        IFSCCODE: Joi.required(),
        branchName: Joi.required(),
        accountNumber:Joi.required(),
    });
    return schema.validate(bank);
};

export { BankAccount, validateAccount };
