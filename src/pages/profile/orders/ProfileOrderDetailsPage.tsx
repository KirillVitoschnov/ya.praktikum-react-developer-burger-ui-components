import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import OrderInfo from '../../../components/order-info/OrderInfo';
import { wsConnect, wsDisconnect } from "../../../services/orders/wsTypes";
import { getOrdersWebSocketUrl } from "../../../hooks/useOrdersWebSocketUrl";
import styles from "./ProfileOrderDetailsPage.module.css";

interface ProfileOrderDetailsPageProps {
    inModal?: boolean;
}

const ProfileOrderDetailsPage: React.FC<ProfileOrderDetailsPageProps> = ({ inModal }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const orders = useAppSelector(state => state.userOrders.orders);
    const allIngredients = useAppSelector(state => state.ingridients.ingridients);

    useEffect(() => {
        console.log("ProfileOrderDetailsPage mounted. Orders length:", orders.length);
        if (orders.length === 0) {
            const accessToken = localStorage.getItem("accessToken");
            const wsUrl = getOrdersWebSocketUrl("user", accessToken);
            console.log("WebSocket URL:", wsUrl);
            if (wsUrl) {
                dispatch(wsConnect(wsUrl));
                console.log("WebSocket connection initiated.");

                return () => {
                    console.log("ProfileOrderDetailsPage unmounted. Disconnecting WebSocket.");
                    dispatch(wsDisconnect());
                };
            }
        }
    }, [dispatch, orders.length]);

    let order = orders.find(o => o._id === id);
    if (!order) {
        const numId = Number(id);
        if (!isNaN(numId)) {
            order = orders.find(o => o.number === numId);
        }
    }

    return (
        <div className={styles.container}>
            {order ? (
                <OrderInfo order={order} allIngredients={allIngredients} />
            ) : orders.length === 0 ? (
                <div>Загрузка...</div>
            ) : (
                <div>Заказ не найден</div>
            )}
        </div>
    );
};

export default ProfileOrderDetailsPage;
