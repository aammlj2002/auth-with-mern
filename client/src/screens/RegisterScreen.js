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
        <div className="bg-gray-100 min-h-screen ralative">
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="flex flex-col w-80 max-w-md px-4 py-8 bg-white rounded-lg shadow">
                    <div className="self-center mb-6 text-xl font-light text-gray-600">Regitser Account</div>
                    <div className="mt-8">
                        <form onSubmit={registerHandler} autoComplete="off">
                            <div className="mb-5">
                                <label className="mb-1 text-gray-900 text-sm">Username</label>
                                <input
                                    type="text"
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-gray-900 text-sm">Email</label>
                                <input
                                    type="text"
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div><div className="mb-5">
                                <label className="mb-1 text-gray-900 text-sm">Password</label>
                                <input
                                    type="password"
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div><div className="mb-5">
                                <label className="mb-1 text-gray-900 text-sm">Comfirm Pasword</label>
                                <input
                                    type="password"
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    value={comfirmPassword}
                                    onChange={(e) => setComfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        {error && <span calss="text-red-500">{error}</span>}
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button
                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700"
                            type="submit"
                        >
                            <span className="ml-2">You don&#x27;t have an account?</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
