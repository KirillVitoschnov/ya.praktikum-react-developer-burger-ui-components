import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
    Location,
} from "react-router-dom";

import Header from "../header/header";
import MainBurger from "../main-burger/main-burger";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import Ingredient from "../../pages/ingredient";
import ProtectedRouteElement from "../protecred-route/ProtectedRouteElement";
import Modal from "../modal/modal";

function IngredientModalRoute() {
    const navigate = useNavigate();
    const onClose = () => navigate(-1);
    return (
        <Modal close={onClose} title="Детали ингредиента">
            <Ingredient inModal />
        </Modal>
    );
}

function AppRoutes() {
    const location = useLocation();
    const state = location.state as { background?: Location } | undefined;
    const background = state?.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<MainBurger />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route element={<ProtectedRouteElement />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="/ingredients/:id" element={<Ingredient />} />
            </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={<IngredientModalRoute />} />
                </Routes>
            )}
        </>
    );
}

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <AppRoutes />
            </BrowserRouter>
        </div>
    );
}
