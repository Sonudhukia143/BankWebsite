import mongoose from "mongoose";

const TxSchema = new mongoose.Schema({
    wallet1: {
        type: String,
    }
});

const TX = mongoose.model("TX", TxSchema);

export { TX };
