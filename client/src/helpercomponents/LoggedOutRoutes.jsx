import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoggedOutRoute() {
    return (
        <>
            <ul id="navbar-nav" className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to="/login" className="nav-link active" id="navbar" aria-current="page">
                        <Button id="profileButton">
                            Login
                        </Button>
                    </Link>
                </li>
                <li className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/signup" className="nav-link active" id="navbar" aria-current="page">
                            <Button id="profileButton">
                                SignUp
                            </Button>
                        </Link>
                </li>
            </ul>
        </>

    )
}