export default async function ApprooveWallet(req, res) {
    console.log("ApprooveWallet called");
    return res.status(200).json({ message: "Wallet approved successfully" });
}