import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import '../../styles/Submissions.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    const fetchSubmissions = async () => {
        try {
            const response = await fetch("http://localhost:3000/submissions", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data);
            } else {
                console.error('Failed to fetch submissions');
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    },[]);

    return (
            isLoggedIn? (
                    <div className="submissions-container">
            <h1>Your Submissions</h1>
            {loading ? <p>Loading...</p> : (
                <div className="submissions-list">
                    {submissions.length === 0 ? (
                        <p>No submissions found</p>
                    ) : (
                        submissions.map(submission => (
                            <div key={submission._id} className="submission-card">
                                <h3>{submission.username}</h3>
                                <p>Social Media Handle: {submission.SocialMediaHandle}</p>
                                <div className="image-container">
                                    <h4>Uploaded Images:</h4>
                                    {
                                    submission.images.map((image, index) => (
                                        <img key={index} src={`${image.url}`} alt={`Image ${index}`} className="uploaded-image" />
                                    ))
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
            ) : (
                 <h1>You must be Logged In.</h1>
            )
    );
};

export default Submissions;
