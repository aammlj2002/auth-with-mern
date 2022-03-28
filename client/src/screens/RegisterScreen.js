import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterScreen = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [error, setError] = useState("");
    const naviagte = useNavigate();
    const registerHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (password !== comfirmPassword) {
            setPassword("");
            setComfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("password do no match");
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/register", { username, email, password }, config);
            localStorage.setItem("authToken", data.token);
            naviagte("/");
        } catch (error) {
            setError(error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        <div>
            <form onSubmit={registerHandler}>
                username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                password
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                comfirm password
                <input type="text" value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)} />
                <br />
                {error && <span>{error}</span>}
                <input type="submit" value="register" />
            </form>
        </div>
    );
};

export default RegisterScreen;
