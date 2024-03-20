import React, { useState } from "react";
import "./Login.css";

interface LoginProps {
    setToken: (token: string) => void;
}

interface Credentials {
    username: string;
    password: string;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit', username, password);

        const token = await loginUser({
            username,
            password
        });

        setToken(token);
    }

    async function loginUser(credentials: Credentials): Promise<any> {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        if (!response.ok) {
            throw new Error('Network response was not ok!')
        }

        return response.json();
    }
    
    return (
        <div className="login-wrapper">
            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input 
                        type="text"
                        onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        type="password"
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;