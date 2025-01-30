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

    if (hasChanges) {
        setValidation(newValidation);
    }

    return isValid;
}
