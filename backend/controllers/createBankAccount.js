import { BankAccount,validateAccount } from "../models/bankAccount.js";

const createBankController = async (req, res) => {
    const {error} = validateAccount(req.body);
    if(error) return res.status(300).json({"message":"credentials are not valid"});

    const {  IFSCCODE,branchName,bankName,accountNumber } = req.body;
    const user = req.user;
    const accountHolderName = req.accountHolderName;

    try {
        const account = await BankAccount.findOne({ accountNumber });
        if (account) {
            return res.status(400).json({ message: 'Account already in existence' });
        }

        const Account = new BankAccount({
            user:user,
            IFSCCODE,
            branchName,
            bankName,
            accountNumber,
            accountHolderName
        });

        await Account.save();

        return res.status(200).json({ message: 'Created An Account Successfully successful' });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export default createBankController;
