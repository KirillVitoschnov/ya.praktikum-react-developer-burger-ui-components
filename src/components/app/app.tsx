import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header/header";
import MainBurger from "../main-burger/main-burger";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import Ingredient from "../../pages/ingredient";

import ProtectedRouteElement from "../protecred-route/ProtectedRouteElement";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainBurger />} />

                    {/* публичные */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* защищённые */}
                    <Route element={<ProtectedRouteElement />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        {/* в следующем спринте:
            <Route path="/profile/orders" element={<OrdersPage />} />
            <Route path="/profile/orders/:id" element={<OrderDetailsPage />} /> */}
                    </Route>

          <Route path="/ingredients/:id" element={<Ingredient />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
