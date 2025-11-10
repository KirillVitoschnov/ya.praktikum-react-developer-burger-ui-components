import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import { logoutUser } from "../../services/auth/authSlice";
import styles from "./ProfileSidebar.module.css";

export default function ProfileSidebar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.menu}>
                <NavLink to="/profile" className={({ isActive }) => styles.link + (isActive ? ` ${styles.active}` : "")}>Профиль</NavLink>
                <NavLink to="/profile/orders" className={({ isActive }) => styles.link + (isActive ? ` ${styles.active}` : "")}>История заказов</NavLink>
                <button className={styles.link} onClick={handleLogout}>Выход</button>
            </nav>
            <p className={styles.info}>В этом разделе вы можете изменить свои персональные данные</p>
        </aside>
    );
}

