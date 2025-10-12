import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Input as BurgerInput,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";

import { useAppDispatch, useAppSelector } from "../../services/store";
import { registerUser, selectAuthStatus, selectAuthError } from "../../services/auth/authSlice";

type SubmitFn = (name: string, email: string, password: string) => Promise<void> | void;

interface RegisterPageProps {
    onSubmit?: SubmitFn;
    isSubmitting?: boolean;
}

export default function RegisterPage({
                                         onSubmit,
                                         isSubmitting = false,
                                     }: RegisterPageProps) {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [touched, setTouched] = React.useState({
        name: false,
        email: false,
        password: false,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const from =
        (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? "/";

    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);
    const authError = useAppSelector(selectAuthError);

    const loading = typeof isSubmitting === "boolean" ? isSubmitting : authStatus === "loading";

    const isNameValid = name.trim().length >= 2;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 6;
    const canSubmit = isNameValid && isEmailValid && isPasswordValid && !loading;

    const defaultSubmit: SubmitFn = async (n, mail, pass) => {
        await dispatch(registerUser({ name: n.trim(), email: mail, password: pass })).unwrap();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            const submitFn = onSubmit ?? defaultSubmit;
            await submitFn(name, email, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
        }
    };

    const noopPointer = () => {};

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className="text text_type_main-large">Регистрация</h1>
                </div>

                <div className={styles.field}>
                    <BurgerInput
                        name="name"
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        onBlur={() => setTouched((s) => ({ ...s, name: true }))}
                        autoComplete="name"
                        spellCheck={false}
                        onPointerEnterCapture={noopPointer}
                        onPointerLeaveCapture={noopPointer}
                    />
                    {!isNameValid && touched.name && (
                        <span className="text text_type_main-default text_color_error">Минимум 2 символа</span>
                    )}
                </div>

                <div className={styles.field}>
                    <EmailInput
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        isIcon={false}
                        onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                    />
                    {!isEmailValid && touched.email && (
                        <span className="text text_type_main-default text_color_error">Некорректный e-mail</span>
                    )}
                </div>

                <div className={styles.field}>
                    <PasswordInput
                        name="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                        autoComplete="new-password"
                    />
                    {!isPasswordValid && touched.password && (
                        <span className="text text_type_main-default text_color_error">Минимум 6 символов</span>
                    )}
                </div>

                {authError && (
                    <p className="text text_type_main-default text_color_error" style={{ marginTop: 8 }}>
                        {authError}
                    </p>
                )}

                <div className={styles.actions}>
                    <Button htmlType="submit" type="primary" size="large" disabled={!canSubmit || loading}>
                        {loading ? "Регистрируем..." : "Зарегистрироваться"}
                    </Button>
                </div>

                <div className={styles.links}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?{" "}
                        <Link className={styles.link} to="/login">
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
