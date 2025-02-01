import express from "express";
import getUserBankAccounts from "../controllers/getAccountsController.js";

const router = express.Router();

router.get("/", getUserBankAccounts);

export default router;
