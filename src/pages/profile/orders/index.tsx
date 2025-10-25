import React from "react";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
    return (
        <div className={styles.page}>
            <h1 className="text text_type_main-large">История заказов</h1>
            <p className="text text_type_main-default text_color_inactive">
                Здесь будет отображаться история ваших заказов.
            </p>
        </div>
    );
}
