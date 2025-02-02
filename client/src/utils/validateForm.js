export default function validateForm(validation, formData, setValidation) {
    let isValid = true;
    const newValidation = { ...validation };
    let hasChanges = false;

    if (newValidation.gmail !== undefined) {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gmail);
        if (newValidation.gmail !== isEmailValid) {
            newValidation.gmail = isEmailValid;
            hasChanges = true;
        }
        if (!isEmailValid) isValid = false;
    }

    if (newValidation.password !== undefined) {
        const isPasswordValid = formData.password.trim().length >= 6;
        if (newValidation.password !== isPasswordValid) {
            newValidation.password = isPasswordValid;
            hasChanges = true;
        }
        if (!isPasswordValid) isValid = false;
    }

    if (newValidation.username !== undefined) {
        const isUsernameValid = formData.username.trim() !== "";
        if (newValidation.username !== isUsernameValid) {
            newValidation.username = isUsernameValid;
            hasChanges = true;
        }
        if (!isUsernameValid) isValid = false;
    }

    if (newValidation.Bio !== undefined) {
        const isBioValid = formData.Bio.trim() !== "";
        if (newValidation.Bio !== isBioValid) {
            newValidation.Bio = isBioValid;
            hasChanges = true;
        }
        if (!isBioValid) isValid = false;
    }

    if (newValidation.images !== undefined) {
        const isimagesValid = formData.images !== "" && formData.images != undefined;
        if (newValidation.images !== isimagesValid) {
            newValidation.images = isimagesValid;
            hasChanges = true;
        }
        if (!isimagesValid) isValid = false;
    }

    if (newValidation.accountNumber !== undefined) {
        const isAccountNumberValid = /^[0-9]{9,18}$/.test(formData.accountNumber);
        if (newValidation.accountNumber !== isAccountNumberValid) {
            newValidation.accountNumber = isAccountNumberValid;
            hasChanges = true;
        }
        if (!isAccountNumberValid) isValid = false;
    }

    if (newValidation.IFSCCODE !== undefined) {
        const isIFSCCODEValid = /^[A-Z]{4}[0-9]{7}$/.test(formData.IFSCCODE);
        if (newValidation.IFSCCODE !== isIFSCCODEValid) {
            newValidation.IFSCCODE = isIFSCCODEValid;
            hasChanges = true;
        }
        if (!isIFSCCODEValid) isValid = false;
    }

    if (newValidation.branchName !== undefined) {
        const isBranchNameValid = formData.branchName.trim() !== "";
        if (newValidation.branchName !== isBranchNameValid) {
            newValidation.branchName = isBranchNameValid;
            hasChanges = true;
        }
        if (!isBranchNameValid) isValid = false;
    }

    if (newValidation.bankName !== undefined) {
        const isBankNameValid = formData.bankName.trim() !== "";
        if (newValidation.bankName !== isBankNameValid) {
            newValidation.bankName = isBankNameValid;
            hasChanges = true;
        }
        if (!isBankNameValid) isValid = false;
    }

    if (newValidation.accountHolderName !== undefined) {
        const isAccountHolderValid = formData.accountHolderName.trim() !== "";
        if (newValidation.accountHolderName !== isAccountHolderValid) {
            newValidation.accountHolderName = isAccountHolderValid;
            hasChanges = true;
        }
        if (!isAccountHolderValid) isValid = false;
    }

    if (hasChanges) {
        setValidation(newValidation);
    }

    return isValid;
}
