import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Input as BurgerInput,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfilePage.module.css";

import { useAppDispatch, useAppSelector } from "../../services/store";
import {
    logoutUser,
    fetchCurrentUser,
    updateCurrentUser,
    selectUser,
    selectAuthStatus,
} from "../../services/auth/authSlice";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);
    const status = useAppSelector(selectAuthStatus);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [initial, setInitial] = React.useState<{ name: string; email: string } | null>(null);
    const [touched, setTouched] = React.useState({ name: false, email: false, password: false });
    const [loggingOut, setLoggingOut] = React.useState(false);

    React.useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, user]);

    React.useEffect(() => {
        if (user) {
            setName(user.name ?? "");
            setEmail(user.email ?? "");
            setInitial({ name: user.name ?? "", email: user.email ?? "" });
        }
    }, [user]);

    const isNameValid = name.trim().length >= 2;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length === 0 || password.length >= 6;

    const hasChanges =
        (initial && (initial.name !== name.trim() || initial.email !== email.trim())) ||
        password.length > 0;

    const isSaving = status === "loading";
    const canSave = isNameValid && isEmailValid && isPasswordValid && hasChanges && !isSaving;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSave) return;

        try {
            await dispatch(
                updateCurrentUser({
                    name: name.trim(),
                    email: email.trim(),
                    password: password || undefined,
                })
            ).unwrap();

            setInitial({ name: name.trim(), email: email.trim() });
            setPassword("");
            setTouched({ name: false, email: false, password: false });
        } catch {}
    };

    const handleCancel = () => {
        if (!initial) return;
        setName(initial.name);
        setEmail(initial.email);
        setPassword("");
        setTouched({ name: false, email: false, password: false });
    };

    const handleLogout = async () => {
        if (loggingOut) return;
        try {
            setLoggingOut(true);
            await dispatch(logoutUser()).unwrap();
        } catch {} finally {
            setLoggingOut(false);
            navigate("/login", { replace: true });
        }
    };

    const noop = () => {};

    return (
        <div className={styles.page}>
            <aside className={styles.sidebar}>
                <nav className={styles.nav}>
                    <NavLink
                        to="/profile"
                        end
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                        }
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        end
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                        }
                    >
                        История заказов
                    </NavLink>



                    <button
                        type="button"
                        className={`${styles.navLink} ${styles.navButton}`}
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? "Выходим..." : "Выход"}
                    </button>
                </nav>

                <p className={`${styles.hint} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </aside>

            <section className={styles.content}>
                <form className={styles.card} onSubmit={handleSave} noValidate>
                    <div className={styles.fieldRow}>
                        <BurgerInput
                            name="name"
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            onBlur={() => setTouched((s) => ({ ...s, name: true }))}
                            autoComplete="name"
                            spellCheck={false}
                            onPointerEnterCapture={noop}
                            onPointerLeaveCapture={noop}
                        />
                        {!isNameValid && touched.name && (
                            <span className="text text_type_main-default text_color_error">Минимум 2 символа</span>
                        )}
                    </div>

                    <div className={styles.fieldRow}>
                        <EmailInput
                            name="email"
                            placeholder="Логин"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                            isIcon={false}
                            autoComplete="email"
                            inputMode="email"
                            spellCheck={false}
                        />
                        {!isEmailValid && touched.email && (
                            <span className="text text_type_main-default text_color_error">Некорректный e-mail</span>
                        )}
                    </div>

                    <div className={styles.fieldRow}>
                        <PasswordInput
                            name="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                            placeholder="Пароль"
                            autoComplete="new-password"
                        />
                        {!isPasswordValid && touched.password && (
                            <span className="text text_type_main-default text_color_error">
                Пароль от 6 символов (или оставьте пустым)
              </span>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={handleCancel}
                            disabled={!hasChanges || isSaving}
                        >
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" disabled={!canSave}>
                            {isSaving ? "Сохраняем..." : "Сохранить"}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}
