import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import Logout from '../routes/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import Profile from '../helpercomponents/ProfilePopOver';

export default function navbar() {
    const navigate = useNavigate();
    const {state,dispatch} = useAuthContext();

    async function logOut() {

        try {
            const response = await fetch('https://bank-website-895e1iz3u-sonudhukia143s-projects.vercel.app/api/logout', {
                method: 'POST',
                credentials:'include',
            });

            const data = await response.json();

            navigate('/');

            if (response.ok) {
                navigate('/');
                dispatch({type: 'LOGOUT', payload: null});

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
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <Link to="/" alt="navlogo" id="navbar">
                            Handle
                            <b style={{ color: "grey" , display:"block" }}>Hub</b>
                        </Link>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {
                            state.isLoggedIn ?
                                <ul id="navbar-nav" className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active" id="navbar" aria-current="page" onClick={logOut}>
                                            <Logout />
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" id="navbar" aria-current="page" >
                                            <Profile />
                                        </Link>
                                    </li>
                                </ul>
                            :   
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link active"  id="navbar" aria-current="page">Login</Link>
                                    </li>
                                    <li className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <Link to="/signup" className="nav-link active"  id="navbar" aria-current="page">SignUp</Link>
                                    </li>
                                </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}


