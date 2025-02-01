import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import Loader from '../helpercomponents/Loader';
import FlashMessage from '../helpercomponents/FlashMessage';

const BankAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch bank accounts data
        const fetchBankAccounts = async () => {
            try {
                const response = await fetch('https://bank-website-delta-gules.vercel.app/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bank accounts');
                }

                const data = await response.json();
                setAccounts(data.accounts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const handleEdit = (accountId) => {
        // Redirect to the edit page (you can create an edit component for this)
        console.log(`Edit account with ID: ${accountId}`);
    };

    const handleDelete = async (accountId) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteaccount/${accountId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.ok) {
                setAccounts(accounts.filter(account => account._id !== accountId));
            } else {
                throw new Error('Failed to delete account');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-5">
            {error && <FlashMessage message={error} />}
            {loading?<Loader props={"Fetching Bank Details"}/>:""}
            <h1>My Bank Accounts</h1>
            <div className="row">
                {accounts.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">
                            No bank accounts found.
                        </div>
                    </div>
                ) : (
                    accounts.map(account => (
                        <div className="col-md-4 mb-4" key={account._id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{account.bankName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Account Number: {account.accountNumber}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        Branch: {account.branchName}
                                    </Card.Text>
                                    <Card.Text>
                                        Account Holder: {account.accountHolderName}
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        className="me-2"
                                        onClick={() => handleEdit(account._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDelete(account._id)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BankAccounts;
