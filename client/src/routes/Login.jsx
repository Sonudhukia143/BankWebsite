import { useState } from 'react';
import FlashMessage from '../helpercomponents/FlashMessage.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider.jsx';
import validateForm from '../utils/validateForm.js';
import Loader from '../helpercomponents/Loader.jsx';

export default function Login() {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        gmail: " ",
        password: " ",
    });
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState({
        gmail: true,
        password: true,
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) return;

        setLoading(true);
        try {

            const response = await fetch('https://handle-hub.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setLoading(false);
            setMessage(data.message);

            if (response.status === 200 || response.ok) {
                dispatch({ type: 'LOGIN', payload: data.token });
                navigate('/');
            }
        } catch (error) {
            setMessage("Unexpected Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginDiv">
            <h1>Login</h1>
            {message && <FlashMessage message={message} />}
            {loading && <Loader props={"Logging In"}/>}
            <form className="row g-3 needs-validation loginForm" noValidate onSubmit={loginUser}>
                <div className="col-md-6">
                    <label htmlFor="gmail" className="form-label">Gmail</label>
                    <input
                        type="email"
                        className={`form-control ${!formData.gmail ? 'is-invalid' : ''}`}
                        id="gmail"
                        required
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                        <input
                            type="password"
                            className={`form-control ${!formData.password ? 'is-invalid' : ''}`}
                            id="password"
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            Password must be at least 6 characters long.
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-primary col-3" type="submit">Login</button>
                </div>
                <p><Link to='/signup'>Not a user?</Link></p>
            </form>
        </div>
    );
}
