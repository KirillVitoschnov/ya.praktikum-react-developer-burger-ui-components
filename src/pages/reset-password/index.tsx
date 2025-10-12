import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput, Input as BurgerInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { request } from "../../utils/request";

type ResetResponse = {
    success: boolean;
    message: string;
};

export default function ResetPasswordPage() {
    const [password, setPassword] = React.useState<string>("");
    const [token, setToken] = React.useState<string>("");

    const [touched, setTouched] = React.useState({ password: false, token: false });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const navigate = useNavigate();

    const isPasswordValid = password.length >= 6;
    const isTokenValid = token.trim().length > 0;
    const canSubmit = isPasswordValid && isTokenValid && !loading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit) return;

        setError(null);
        setLoading(true);
        try {
            const res = await request<ResetResponse>(
                "https://norma.nomoreparties.space/api/password-reset/reset",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password, token: token.trim() }),
                }
            );

            if (!res?.success) {
                throw new Error(res?.message || "Не удалось обновить пароль");
            }

            navigate("/login", { replace: true });
        } catch (err: any) {
            setError(err?.message || "Не удалось обновить пароль. Проверьте код и попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    const noop = () => {};

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className="text text_type_main-large">Восстановление&nbsp;пароля</h1>
                </div>

                <div className={styles.field}>
                    <PasswordInput
                        name="password"
                        value={password}
                        onChange={(e) => setPassword((e as any).target?.value ?? "")}
                        placeholder="Введите новый пароль"
                        autoComplete="new-password"
                    />
                    {!isPasswordValid && touched.password && (
                        <span className="text text_type_main-default text_color_error">Минимум 6 символов</span>
                    )}
                </div>

                <div className={styles.field}>
                    <BurgerInput
                        name="token"
                        type="text"
                        placeholder="Введите код из письма"
                        value={token}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                        onBlur={() => setTouched((s) => ({ ...s, token: true }))}
                        autoComplete="one-time-code"
                        spellCheck={false}
                        onPointerEnterCapture={noop}
                        onPointerLeaveCapture={noop}
                    />
                    {!isTokenValid && touched.token && (
                        <span className="text text_type_main-default text_color_error">Укажите код из письма</span>
                    )}
                </div>

                {error && <span className="text text_type_main-default text_color_error">{error}</span>}

                <div className={styles.actions}>
                    <Button htmlType="submit" type="primary" size="large" disabled={!canSubmit}>
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </Button>
                    <p className="text text_type_main-default text_color_inactive">
                        Код высылается на e-mail, указанный на шаге «Восстановление пароля».
                    </p>
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
