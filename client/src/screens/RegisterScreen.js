import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [errors, setErrors] = useState("");
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
                setErrors("");
            }, 5000);
            return setErrors({ comfirmPassword: "password do not match" });
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/auth/register", { username, email, password }, config);
            localStorage.setItem("authToken", data.token);
            if (data.errors) {
                setErrors(JSON.parse(data.errors));
                return;
            }
            naviagte("/");
        } catch (error) {
            setErrors({ message: "something went wrong, please try again" });
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 ralative">
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow w-80">
                    <div className="self-center text-xl font-light text-gray-600">Regitser Account</div>
                    <div className="mt-4">
                        <form onSubmit={registerHandler} autoComplete="off">
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Username</label>
                                <input
                                    type="text"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <span className="text-red-500">{errors.username}</span>}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Email</label>
                                <input
                                    type="text"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Password</label>
                                <input
                                    type="password"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <span className="text-red-500">{errors.password}</span>}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-sm text-gray-900">Comfirm Pasword</label>
                                <input
                                    type="password"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                                    value={comfirmPassword}
                                    onChange={(e) => setComfirmPassword(e.target.value)}
                                />
                                {errors.comfirmPassword && <span className="text-red-500">{errors.comfirmPassword}</span>}
                            </div>
                            {errors.message && <span className="text-red-500">{errors.message}</span>}
                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700" to="/login">
                            <span className="ml-2">You don&#x27;t have an account?</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
