import { BankAccount,validateAccount } from "../models/bankAccount.js";

export default async function editBankAccount(req, res) {
    try {
        const {error} = validateAccount(req.body);
        if(error) return res.status(404).json({message:"Invalid credentials"});

        const accountId = req.params.id;
        const { IFSCCODE, branchName, bankName, accountNumber, accountHolderName } = req.body;
        
        if(!IFSCCODE || !branchName || !accountHolderName || !bankName) return res.status(400).json({message:"Form Input Cannot be Empty"});

        const user = req.user; 
        if (!user) return res.status(401).json({ message: 'User not authenticated' });
        
        const account = await BankAccount.findById(accountId);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        if(account.accountHolderName != accountHolderName) return res.status(400).json({message: 'Cannot re-initiazlize account name'});
        if(account.accountNumber != accountNumber) return res.status(400).json({message: 'Cannot re-initiazlize account number'});

        if (account.user.toString() !== user._id.toString()) return res.status(403).json({ message: 'Unauthorized to edit this account' });

        account.IFSCCODE = IFSCCODE || account.IFSCCODE;
        account.branchName = branchName || account.branchName;
        account.bankName = bankName || account.bankName;
        account.accountNumber = accountNumber || account.accountNumber;
        account.accountHolderName = account.accountHolderName;

        await account.save();

        return res.status(200).json({ message: 'Account updated successfully', account });
    } catch (error) {
        console.error("Error updating bank account:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}
