import { useState } from "react";
import FlashMessage from '../helpercomponents/FlashMessage.jsx';
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import validateForm from "../utils/validateForm.js";
import Loader from "../helpercomponents/Loader.jsx";

export default function SignUp() {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        username: " ",
        gmail: " ",
        password: " ",
        images: "",
        Bio: " ",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        username: true,
        gmail: true,
        password: true,
        images: true,
        Bio: true,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if(id === "images") {
            setFormData({
                ...formData,
                images: e.target.files[0],
            })
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }

    };

    const createUser = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm(validation, formData, setValidation)) return;

        setLoading(true);
        try {
            const formDataToSend = new FormData();
            for(const key in formData) {    
                formDataToSend.append(key, formData[key]);
            }

             const response = await fetch('https://bank-website-delta-gules.vercel.app/api/signin', {
                 method: 'POST',
                 credentials: 'include',
                 body: formDataToSend,
             });

            const data = await response.json();
            setMessage(data.message);

            if (response.status === 200 || response.ok) {
                navigate('/');
                dispatch({ type: 'SIGNIN', payload: data.token });
            }
        } catch (error) {
            setMessage("Unexpected Error");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="loginDiv">
            <h1>Sign Up</h1>
            {loading && <Loader props={"Signing In"} />}
            {message && <FlashMessage message={message} />}
            <form className="row g-3 needs-validation loginForm" noValidate onSubmit={createUser}>
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className={`form-control ${!validation.username ? 'is-invalid' : ''}`}
                        id="username"
                        required
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid username.
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="gmail" className="form-label">Gmail</label>
                    <input
                        type="email"
                        className={`form-control ${!validation.gmail ? 'is-invalid' : ''}`}
                        id="gmail"
                        required
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="images" className="form-label">Add Image</label>
                    <input
                        className={`form-control ${!validation.images ? 'is-invalid' : ''}`}
                        type="file"
                        id="images"
                        required
                        onChange={handleChange}
                        name="images"
                    />
                    <div className="invalid-feedback">
                        Please provide a image for your profile.
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="textArea">Bio</label>
                    <textarea
                        className={`form-control ${!validation.Bio ? 'is-invalid' : ''}`}
                        placeholder="Write something about you"
                        id="Bio"
                        style={{ height: "100px" }}
                        onChange={handleChange}
                        required
                    >
                    </textarea>
                    <div className="invalid-feedback">
                        Please write something about you.
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                        <input
                            type="password"
                            className={`form-control ${!validation.password ? 'is-invalid' : ''}`}
                            id="password"
                            required
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            Password must be at least 6 characters long.
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-primary col-3" type="submit">Sign Up</button>
                </div>
                <p><Link to='/login'>Already a user?</Link></p>

            </form>
        </div>
    );
}
