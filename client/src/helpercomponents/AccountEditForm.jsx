export default function EditAccountForm({currentAccount,handleInputChange}) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                    type="text"
                    name="bankName"
                    value={currentAccount.bankName}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBranchName">
                <Form.Label>Branch Name</Form.Label>
                <Form.Control
                    type="text"
                    name="branchName"
                    value={currentAccount.branchName}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAccountHolderName">
                <Form.Label>Account Holder Name</Form.Label>
                <Form.Control
                    type="text"
                    name="accountHolderName"
                    value={currentAccount.accountHolderName}
                    onChange={handleInputChange}
                    readOnly
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAccountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                    type="text"
                    name="accountNumber"
                    value={currentAccount.accountNumber}
                    onChange={handleInputChange}
                    readOnly
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIFSCCODE">
                <Form.Label>IFSCCODE</Form.Label>
                <Form.Control
                    type="text"
                    name="IFSCCODE"
                    value={currentAccount.IFSCCODE}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
        </Form>
    )
}