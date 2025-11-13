import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../services/store";
import ProfileSidebar from "../../../components/profile-sidebar/ProfileSidebar";
import OrderCard from '../../../components/order-card/OrderCard';
import styles from "./OrdersPage.module.css";
import { useLocation } from "react-router-dom";
import { useAuthRefresh } from '../../../hooks/useAuthRefresh';
import { wsConnect, wsDisconnect } from "../../../services/orders/wsTypes";
import { getOrdersWebSocketUrl } from "../../../hooks/useOrdersWebSocketUrl";

const ProfileOrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.userOrders.orders);
    const allIngredients = useAppSelector(state => state.ingridients.ingridients);
    const loading = useAppSelector(state => state.userOrders.loading);
    const location = useLocation();
    const wsUrl = getOrdersWebSocketUrl('user', localStorage.getItem('accessToken'));
console.log(wsUrl)
    useAuthRefresh();

    useEffect(() => {
        if (wsUrl) {
            dispatch(wsConnect(wsUrl));

            return () => {
                dispatch(wsDisconnect());
            };
        }
    }, [dispatch, wsUrl]);

    return (
        <div className={styles.page}>
            <ProfileSidebar />
            <div className={styles.ordersContent}>
                <h2 className={styles.ordersTitle}>История заказов</h2>
                <ul className={styles.ordersList}>
                    {loading && <li>Загрузка...</li>}
                    {!loading && orders.length === 0 && <li>Нет заказов</li>}
                    {!loading && orders.map(order => (
                        <OrderCard
                            key={order._id || order.number}
                            order={order}
                            allIngredients={allIngredients}
                            url={`/profile/orders/${order._id || order.number}`}
                            location={location}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileOrdersPage;