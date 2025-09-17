import { useMemo } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./confirm-order.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import diamond from "../../images/diamond.svg";
import { useModal } from "../../hooks/useModal";

interface ConfirmOrderProps {
    price: number | string;
}

export default function ConfirmOrder({ price }: ConfirmOrderProps) {
    const { isOpen, open, close } = useModal();

    const numericPrice = useMemo(() => {
        const parsed = typeof price === "string" ? parseFloat(price) : price;
        return Number.isFinite(parsed) ? parsed : null;
    }, [price]);

    const displayPrice = useMemo(
        () => (numericPrice !== null ? numericPrice.toLocaleString("ru-RU") : String(price)),
        [numericPrice, price]
    );

    return (
        <>
            <footer className={styles.bar} aria-label="Подтверждение заказа">
                <p className={`text text_type_digits-medium mr-2 ${styles.value}`}>{displayPrice}</p>
                <img src={diamond} alt="coin" className={`mr-10 ${styles.icon}`} />
                <Button htmlType="button" type="primary" size="large" onClick={open}>
                    Оформить заказ
                </Button>
            </footer>

            {isOpen && (
                <Modal close={close} title="123456" confirm>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}
