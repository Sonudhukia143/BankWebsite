import { BankAccount } from "../models/bankAccount.js";

export default async function getUserBankAccounts (req, res) {
    try {
        const user = req.user;
        console.log(user + "user is");

        if(!user) res.status(404).json({message:"User not provided"});

        const accounts = await BankAccount.find({ user });

        if (accounts.length === 0) {
            return res.status(404).json({ message: "No bank accounts found for this user" });
        }

        return res.status(200).json({ accounts });
    } catch (error) {
        console.error("Error fetching bank accounts:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
