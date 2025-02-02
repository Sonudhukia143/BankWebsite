import { BankAccount } from '../models/bankAccount.js';
import { User } from '../models/userModel.js';

export default async function fetchAllBanks(req, res) {
    try {
        const user = req.user;

        const currentUser = await User.findById({_id:user});
        if(!currentUser.isAdmin) return res.json({ message : "You are not a admin",bankAccounts:[]});

        const bankAccounts = await BankAccount.find({}).lean().exec();
        if(!bankAccounts) return res.json({message:"Fetching Unsuccessfull", bankAccounts:[]});
            
        return res.status(200).json({ message:"Fetching was Successfull",bankAccounts:bankAccounts });
    } catch (error) {
        console.error("Error in fetching all bank details", error);
        return res.status(500).json({ message: "Server error" });
    }
}

