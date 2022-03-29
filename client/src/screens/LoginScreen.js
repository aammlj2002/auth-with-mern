import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Error from "../components/Error";
import Button from "../components/Button";
import axios from "axios";
const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const loginHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/login", { email, password }, config);
            localStorage.setItem("authToken", data.token);
            if (data.error) {
                setErrors(data.error);
                return;
            }
            navigate("/");
        } catch (error) {
            setErrors({ message: "something went wrong, please try again" });
        }
        console.log("foo");
    };
    return (
        <div className="min-h-screen bg-gray-100 ralative">
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow w-80">
                    <div className="self-center text-xl font-light text-gray-600">Login Account</div>
                    <div className="mt-4">
                        <form onSubmit={loginHandler} autoComplete="off">
                            {/* email */}
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Email</label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <Error>{errors.email}</Error>}
                            </div>

                            {/* passowrd */}
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Password</label>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <Error>{errors.password}</Error>}
                            </div>
                            {errors.message && <Error>{errors.message}</Error>}
                            <div className="flex w-full mt-6">
                                <Button type="submit">Sign Up</Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700" to="/register">
                            <span className="ml-2">You don&#x27;t have an account?</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
