import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";

import { useAppDispatch, useAppSelector } from "../../services/store";
import { login, selectAuthStatus, selectAuthError } from "../../services/auth/authSlice";

type SubmitFn = (email: string, password: string) => Promise<void> | void;

interface LoginPageProps {
    onSubmit?: SubmitFn;
    isSubmitting?: boolean;
}

export default function LoginPage({ onSubmit, isSubmitting }: LoginPageProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? "/";

    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);
    const authError = useAppSelector(selectAuthError);

    const loading = typeof isSubmitting === "boolean" ? isSubmitting : authStatus === "loading";
    const canSubmit = /\S+@\S+\.\S+/.test(email) && password.length >= 6 && !loading;

    const defaultSubmit: SubmitFn = async (mail, pass) => {
        await dispatch(login({ email: mail, password: pass })).unwrap();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            const submitFn = onSubmit ?? defaultSubmit;
            await submitFn(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className="text text_type_main-large">Вход</h1>
                </div>

                <div className={styles.field}>
                    <EmailInput
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail((e as any).target?.value ?? "")}
                        isIcon={false}
                    />
                </div>

                <div className={styles.field}>
                    <PasswordInput
                        name="password"
                        value={password}
                        onChange={(e) => setPassword((e as any).target?.value ?? "")}
                    />
                </div>

                {authError && (
                    <p className="text text_type_main-default text_color_error" style={{ marginTop: 8 }}>
                        {authError}
                    </p>
                )}

                <div className={styles.actions}>
                    <Button htmlType="submit" type="primary" size="large" disabled={!canSubmit}>
                        {loading ? "Входим..." : "Войти"}
                    </Button>
                </div>

                <div className={styles.links}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?{" "}
                        <Link className={styles.link} to="/register">
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?{" "}
                        <Link className={styles.link} to="/forgot-password">
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
