import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { request } from "../../utils/request";

type ForgotResponse = {
    success: boolean;
    message: string;
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState<string>("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const canSubmit = isEmailValid && !loading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit) return;

        setError(null);
        setLoading(true);
        try {
            const res = await request<ForgotResponse>(
                "https://norma.nomoreparties.space/api/password-reset",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            if (!res?.success) {
                throw new Error(res?.message || "Не удалось отправить письмо");
            }

            navigate("/reset-password", {
                replace: true,
                state: { fromForgot: true, prev: location.pathname, emailUsed: email },
            });
        } catch (err: any) {
            setError(err?.message || "Не удалось отправить письмо для восстановления");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className="text text_type_main-large">Восстановление&nbsp;пароля</h1>
                </div>

                <div className={styles.field}>
                    <EmailInput
                        name="email"
                        placeholder="Укажите e-mail"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        isIcon={false}
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                        autoFocus
                    />
                    {error && (
                        <span className="text text_type_main-default text_color_error">{error}</span>
                    )}
                </div>

                <div className={styles.actions}>
                    <Button htmlType="submit" type="primary" size="large" disabled={!canSubmit}>
                        {loading ? "Отправляем..." : "Восстановить"}
                    </Button>
                </div>

                <div className={styles.links}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?{" "}
                        <Link className={styles.link} to="/login">
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
