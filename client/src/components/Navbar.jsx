import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import Logout from '../routes/Logout';
import {useAuth} from '../context/AuthProvider.jsx';

export default function navbar() {
    const { isLoggedIn } = useAuth();
    const { logout } = useAuth();

    function logOut () {
        window.location.href = '/';
        logout();
    }

    return (
        <>
            <div className="navDiv">
                <span className="navLogo"> <Link to="/" alt="navlogo"><p>Handle</p><b><p style={{ color: "grey" }}>Hub</p></b></Link></span>
                    {
                        isLoggedIn
                            ?<ul className="navIcon">
                                <li>
                                    <Link to="/logout" className="Link" onClick={logOut}><Logout /></Link>
                                </li>
                                <li>
                                    <Link to="/usersubmission" className="Link">UserSubmmision</Link>
                                </li>
                                <li>
                                    <Link to="/submissions" className="Link">Submmisons</Link>
                                </li>
                            </ul>
                            :<ul className="navIcon">
                                <li>
                                    <Link to="/login" className="Link">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="Link">SignUp</Link>\
                                </li>
                            </ul>
                    }
            </div>
        </>
    )
}


