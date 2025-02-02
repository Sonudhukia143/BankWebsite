import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import Loader from '../helpercomponents/Loader';
import LoggedInRoutes from '../helpercomponents/LoggedInRoute.jsx';
import LoggedOutRoute from '../helpercomponents/LoggedOutRoutes.jsx';

export default function navbar() {
    const navigate = useNavigate();
    const { state, dispatch } = useAuthContext();
    const [loading, setLoading] = useState();

    async function logOut() {

        try {
            setLoading(true)
            const response = await fetch('https://bank-website-delta-gules.vercel.app/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            navigate('/');

            if (response.ok) {
                setLoading(false)
                navigate('/');
                dispatch({ type: 'LOGOUT', payload: null });

            } else {
                console.error('Failed to log out', data);
            }
        } catch (error) {
            console.error('Logout request failed:', error);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="navbar">
                {loading && <Loader props={"Safely Logging Out"} />}
                <div className="container-fluid" id="container-fluid">
                    <span className="navbar-brand" id="navbar-brand">
                        <Link to="/" alt="navlogo" id="navbar">
                            <p style={{ color: "grey", padding: "0px", margin: "0px" }}>Handle</p>
                            <b style={{ color: "black", display: "block" }}>Hub</b>
                        </Link>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {
                            state.isLoggedIn ?
                            <LoggedInRoutes props={logOut}/>    
                            : 
                            <LoggedOutRoute />
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}


