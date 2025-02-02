import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import Loader from '../helpercomponents/Loader';
import FlashMessage from '../helpercomponents/FlashMessage';

const BankAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    
    useEffect(() => {
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
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const handleEdit = (accountId) => {
        const account = accounts.find(acc => acc._id === accountId);
        setCurrentAccount(account);
        setShowEditModal(true);
    };

    const handleDelete = async (accountId) => {
        try {
            setLoading(true);

            const response = await fetch(`https://bank-website-delta-gules.vercel.app/api/deleteaccount/${accountId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                }
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setAccounts(accounts.filter(acc => acc._id !== accountId)); // Remove the deleted account from state
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://bank-website-delta-gules.vercel.app/api/editaccount/${currentAccount._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(currentAccount)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setAccounts(accounts.map(acc => acc._id === currentAccount._id ? data.account : acc));
                setShowEditModal(false);
            } else {
                setMessage(data.message);
                setShowEditModal(false);
            }
        } catch (error) {
            setMessage(error.message ? error.message : data.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            {message && <FlashMessage message={message} />}
            {loading && <Loader props={"Fetching Bank Details"} />}
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

            {/* Edit Account Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Bank Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentAccount && (
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
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BankAccounts;
