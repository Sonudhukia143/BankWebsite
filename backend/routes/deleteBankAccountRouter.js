import express from "express";
import deleteBankAccount from "../controllers/deleteBankAccount.js";

const router = express.Router();

router.delete('/:id', deleteBankAccount);

export default router;
