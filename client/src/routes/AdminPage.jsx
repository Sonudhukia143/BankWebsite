import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Loader from '../helpercomponents/Loader';
import FlashMessage from '../helpercomponents/FlashMessage';

export default function AdminPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState([]);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await fetch('https://bank-website-delta-gules.vercel.app/api/admin', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bank accounts');
                }

                const data = await response.json();

                setAccounts(data.bankAccounts);
                setFilteredAccounts(data.bankAccounts);
                setMessage(data.message);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const filtered = accounts.filter(account =>
            account.accountHolderName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredAccounts(filtered);
    };


    return (
        <>
            <div className="container mt-5">
                <h1>Admin Page</h1>
                {message && <FlashMessage message={message} />}
                {loading && <Loader props={"Fetching All Acounts"} />}

                <h1>All Bank Accounts</h1>

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Account Holder Name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{border:'1px solid grey'}}
                    />
                </div>

                <div className="col">
                    {filteredAccounts.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No bank accounts found.
                            </div>
                        </div>
                    ) : (
                        filteredAccounts.map(account => (
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
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>

    )
}