import { useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./confirm-order.module.css";
import Modal from "../modal/modal";
import diamond from "../../images/diamond.svg";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { clearConstructor } from "../../services/constructor/constructorItemsSlice";
import { setCost } from "../../services/constructor/orderCostSlice";
import { createOrder } from "../../services/API";
import { selectIsAuthenticated } from "../../services/auth/authSlice";

export default function ConfirmOrder() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const { constructorItems, bun } = useAppSelector((store) => store.constructorItems);
    const { orderCost, orderNumber } = useAppSelector((store) => store.orderCost);
    const isAuthed = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        dispatch(setCost({ constructorItems, bun }));
    }, [bun, constructorItems, dispatch]);

    const openPopup = async () => {
        if (!isAuthed) {
            navigate("/login", { replace: false, state: { from: location } });
            return;
        }

        await createOrder(
            dispatch,
            [(bun?._id as string), ...constructorItems.map((item) => item._id)].filter(Boolean)
        );
        setIsOpen(true);
    };

    const closePopup = () => setIsOpen(false);

    const clearCart = () => {
        dispatch(clearConstructor());
    };

    return (
        <>
            <footer className={s.confirm}>
                <p className={`${s.confirm__price} text text_type_digits-medium mr-2`}>{orderCost}</p>
                <img src={diamond} alt="coin" className={`${s.confirm__img} mr-10`} />
                <Button htmlType="button" type="primary" size="large" onClick={openPopup}>
                    Оформить заказ
                </Button>
                <Button htmlType="button" type="secondary" size="medium" onClick={clearCart}>
                    Очистить корзину
                </Button>
            </footer>

            {isOpen && (
                <Modal close={closePopup} title={orderNumber.toString()} confirm>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}
