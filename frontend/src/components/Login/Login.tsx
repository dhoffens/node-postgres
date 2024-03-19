import React from "react";
import PropTypes from "prop-types";
import "./Login.css";

interface LoginProps {
    setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = 'sample-token';
        setToken(token);
    }
    
    return (
        <div className="login-wrapper">
            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;