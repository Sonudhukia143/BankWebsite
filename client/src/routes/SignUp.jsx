import { useState } from "react";
import { useAuth } from '../context/AuthProvider.jsx';

export default function SignUp() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [status,setStatus] = useState("");

    const createUser = async (e) => {
        e.preventDefault();

        const response = await fetch('https://handle-hub.vercel.app/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, gmail, password }),
        });

        const data = await response.json();
        setStatus(data.message);
        const userData = { gmail , password};
        login(userData);

        if (response.status === 200) {
            window.location.href = '/';
        }
    }

    return (
        <>
         <h2 style={{color:"red" , backgroundColor:"orange"}}>{ status }</h2> 
            <div className="loginDiv">
                <h1>User Submission Form</h1>
                <form onSubmit={createUser} className="loginForm">
                    <span className="loginInput">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="designForForm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </span>

                    <span className="loginInput">
                        <label htmlFor="gmail">Gmail</label>
                        <input
                            id="gmail"
                            type="gmail"
                            className="designForForm"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            required
                        />
                    </span>

                    <span className="loginInput">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="designForForm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </span>

                    <span className="loginSpan">
                        <button type="submit" id="loginButton">Sign In</button>
                    </span>
                </form>
            </div>
        </>
    )
}
