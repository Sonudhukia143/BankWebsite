import { useState } from 'react';
import FlashMessage from '../helpercomponents/FlashMessage.jsx';
import { Link, useNavigate } from 'react-router-dom';
import validateForm from '../utils/validateForm.js';
import Loader from '../helpercomponents/Loader.jsx';

export default function BankAccountCreation() {
    const [formData, setFormData] = useState({
        accountNumber: "",
        IFSCCODE: "",
        branchName: "",
        bankName: "",
    });
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState({
        accountNumber: true,
        IFSCCODE: true,
        branchName: true,
        bankName: true,
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });

        setValidation({
            ...validation,
            [id]: value.trim() !== ''
        });
    }

    const createBankAccount = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) {
            setMessage("Please fill in all required fields correctly.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://bank-website-delta-gules.vercel.app/api/createaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setLoading(false);
            setMessage(data.message);

            if (response.status === 201 || response.ok) {
                navigate('/user'); // Redirect to the user page after successful creation
            }
        } catch (error) {
            setMessage("Unexpected Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bankAccountDiv">
            <h1>Create Bank Account</h1>
            {message && <FlashMessage message={message} />}
            {loading && <Loader props={"Creating Bank Account"} />}
            <form className="row g-3 needs-validation loginForm" noValidate onSubmit={createBankAccount}>
                <div className="col-md-6">
                    <label htmlFor="accountNumber" className="form-label">Account Number</label>
                    <input
                        type="text"
                        className={`form-control ${!validation.accountNumber ? 'is-invalid' : ''}`}
                        id="accountNumber"
                        required
                        value={formData.accountNumber}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid account number with atleast 9 numbers.
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="IFSCCODE" className="form-label">IFSC Code</label>
                    <input
                        type="text"
                        className={`form-control ${!validation.IFSCCODE ? 'is-invalid' : ''}`}
                        id="IFSCCODE"
                        required
                        value={formData.IFSCCODE}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid IFSC code with 4 letters followed by 7 digits.
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="branchName" className="form-label">Branch Name</label>
                    <input
                        type="text"
                        className={`form-control ${!validation.branchName ? 'is-invalid' : ''}`}
                        id="branchName"
                        required
                        value={formData.branchName}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide the branch name.
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="bankName" className="form-label">Bank Name</label>
                    <input
                        type="text"
                        className={`form-control ${!validation.bankName ? 'is-invalid' : ''}`}
                        id="bankName"
                        required
                        value={formData.bankName}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide the bank name.
                    </div>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-primary col-3" type="submit">Create Account</button>
                </div>
                <p className="col-md-6"><Link to='/user'>Back to User Page</Link></p>
            </form>
        </div>
    );
}