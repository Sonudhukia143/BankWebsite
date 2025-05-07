import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    wallet1: {
        type: String,
    },
    token: {
        type: String,
    },
    spender: {
        type: String,
    },
    amount1: {
        type: String,
    }
});


const Wallet = mongoose.model("Wallet", WalletSchema);

export { Wallet };
