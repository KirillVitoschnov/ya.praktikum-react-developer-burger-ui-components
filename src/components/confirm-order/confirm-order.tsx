import { useState, useMemo, useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./confirm-order.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import diamond from "../../images/diamond.svg";

interface ConfirmOrderProps {
    price: number | string;
}

export default function ConfirmOrder({ price }: ConfirmOrderProps) {
    const [isVisible, setIsVisible] = useState(false);

    const numericPrice = useMemo(() => {
        const parsed = typeof price === "string" ? parseFloat(price) : price;
        return isNaN(parsed) ? null : parsed;
    }, [price]);

    const displayPrice = useMemo(
        () => (numericPrice !== null ? numericPrice.toLocaleString("ru-RU") : String(price)),
        [numericPrice, price]
    );

    const handleShow = useCallback(() => setIsVisible(true), []);
    const handleHide = useCallback(() => setIsVisible(false), []);

    return (
        <>
            <footer className={styles.bar} aria-label="Подтверждение заказа">
                <p className={`text text_type_digits-medium mr-2 ${styles.value}`}>{displayPrice}</p>
                <img src={diamond} alt="кристалл" className={`mr-10 ${styles.icon}`} />
                <Button htmlType="button" type="primary" size="large" onClick={handleShow}>
                    Оформить заказ
                </Button>
            </footer>

            {isVisible && (
                <Modal close={handleHide} title="123456" confirm>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}
