import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
                    <Route path="/resetpassword/:resetToken" element={<ResetPasswordScreen />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
