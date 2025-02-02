import { BankAccount } from "../models/bankAccount.js";

export default async function deleteBankAccount(req, res) {
    try {
        const accountId = req.params.id;
        const user = req.user; 

        const account = await BankAccount.findById(accountId);
        if (!account) res.status(404).json({ message: "Account not found" });

        if (account.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await BankAccount.deleteOne({_id:accountId});
        return res.status(200).json({ message: "Account deleted successfully" });

    } catch (error) {
        console.error("Error deleting bank account:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
