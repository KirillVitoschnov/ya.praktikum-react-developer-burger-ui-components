import React, { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
    Location,
    Navigate,
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
import { useAppDispatch } from "../../services/store";
import { fetchIngridients } from "../../services/ingridients/ingridientsSlice";
import FeedPage from "../../pages/feed/FeedPage";
import FeedOrderPage from "../../pages/feed/FeedOrderPage";
import ProfileOrdersPage from "../../pages/profile/orders/ProfileOrdersPage";
import ProfileOrderDetailsPage from "../../pages/profile/orders/ProfileOrderDetailsPage";

function IngredientModalRoute() {
    const navigate = useNavigate();
    const onClose = () => navigate(-1);
    return (
        <Modal close={onClose} title="Детали ингредиента">
            <Ingredient inModal />
        </Modal>
    );
}

function FeedOrderModalRoute() {
    const navigate = useNavigate();
    const onClose = () => navigate(-1);
    return (
        <Modal close={onClose} title="">
            <FeedOrderPage inModal />
        </Modal>
    );
}

function ProfileOrderModalRoute() {
    const navigate = useNavigate();
    const onClose = () => navigate(-1);
    return (
        <Modal close={onClose} title="">
            <ProfileOrderDetailsPage inModal />
        </Modal>
    );
}

function AppRoutes() {
    const location = useLocation();
    const state = location.state as { background?: Location; fromForgotPassword?: boolean } | undefined;
    const background = state?.background;

    return (
        <>
                    <Routes location={background || location}>
                        <Route path="/" element={<MainBurger />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route
                            path="/reset-password"
                            element={state?.fromForgotPassword ? <ResetPasswordPage /> : <Navigate to="/forgot-password" replace />}
                        />
                        <Route path="/feed" element={<FeedPage />} />
                        <Route path="/feed/:id" element={<FeedOrderPage />} />
                        <Route element={<ProtectedRouteElement />}>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/profile/orders" element={<ProfileOrdersPage />} />
                            <Route path="/profile/orders/:id" element={<ProfileOrderDetailsPage />} />
                        </Route>
                        <Route path="/ingredients/:id" element={<Ingredient />} />
                    </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={<IngredientModalRoute />} />
                    <Route path="/feed/:id" element={<FeedOrderModalRoute />} />
                    <Route element={<ProtectedRouteElement />}>
                        <Route path="/profile/orders/:id" element={<ProfileOrderModalRoute />} />
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchIngridients());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
        </BrowserRouter>
    );
}