import { Link } from "react-router-dom";
import Profile from '../helpercomponents/ProfilePopOver.jsx';
import { Button } from "react-bootstrap";
import Logout from "../routes/Logout.jsx";

export default function LoggedInRoutes(props) {
    return (
        <>
            <ul id="navbar-nav" className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/" className="nav-link active Link" id="navbar" aria-current="page" onClick={props.logOut}>
                        <Logout />
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link active Link" id="navbar" aria-current="page" >
                        <Profile />
                    </span>
                </li>
                <li className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to="/user" className="nav-link active Link" id="navbar" aria-current="page">
                        <Button id="profileButton">
                            Accounts
                        </Button>
                    </Link>
                </li>
                <li className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to="/createaccount" className="nav-link active Link" id="navbar" aria-current="page">
                        <Button id="profileButton">
                            Add Accounts
                        </Button>
                    </Link>
                </li>
                <li className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to="/admin" className="nav-link active" id="navbar" aria-current="page">
                        <Button id="profileButton">
                            Admin
                        </Button>
                    </Link>
                </li>
            </ul>
        </>
    )
}