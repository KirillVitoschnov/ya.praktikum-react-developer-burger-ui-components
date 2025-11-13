import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { useLocation } from "react-router-dom";
import OrderCard from '../../components/order-card/OrderCard';
import styles from "./FeedPage.module.css";
import { wsConnect, wsDisconnect, wsMessage } from "../../services/orders/wsTypes";
import { getOrdersWebSocketUrl } from "../../hooks/useOrdersWebSocketUrl";

type Order = {
    _id: string;
    number: number;
    status: string;
    name: string;
    createdAt: string;
    ingredients: string[];
};

const FeedPage: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const orders = useAppSelector(state => state.allOrders.orders); // Изменено на allOrders
    const allIngredients = useAppSelector(state => state.ingridients.ingridients);
    const loading = useAppSelector(state => state.allOrders.loading); // Изменено на allOrders


    const total = useAppSelector(state => state.allOrders.total) || 0; // Изменено на allOrders
    const totalToday = useAppSelector(state => state.allOrders.totalToday) || 0; // Изменено на allOrders

    const doneOrders = orders.filter((order: Order) => order.status === 'done');
    const pendingOrders = orders.filter((order: Order) =>
        order.status === 'pending' || order.status === 'created'
    );

    const wsMessages = useAppSelector(state => state.ws.messages);

    useEffect(() => {
        console.log('WebSocket Messages:', wsMessages);
    }, [wsMessages]);

    useEffect(() => {
        const wsUrl = getOrdersWebSocketUrl("public");
        if (wsUrl) {
            dispatch(wsConnect(wsUrl));

            return () => {
                dispatch(wsDisconnect());
            };
        }
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(wsMessages)) {
            wsMessages.forEach((message) => {
                if (message.orders) {
                    dispatch(wsMessage(message.orders));
                }
            });
        }
    }, [wsMessages, dispatch]);

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.feedTitle}>Лента заказов</h2>
                <div className={styles.feedList}>
                    {loading && <div>Загрузка...</div>}
                    {!loading && orders.length === 0 && <div>Нет заказов</div>}
                    {!loading && orders.map((order: Order) => (
                        <OrderCard
                            key={order._id || order.number}
                            order={order}
                            allIngredients={allIngredients}
                            url={`/feed/${order._id || order.number}`}
                            location={location}
                        />
                    ))}
                </div>
            </div>
            <aside className={styles.stats}>
                <div className={styles.statsTitle}>Статусы заказов</div>
                <div className={styles.statsList}>
                    <div className={styles.statsColumn}>
                        <div className={styles.statsOrders}>Готовы:</div>
                        {doneOrders.slice(0, 10).map((order: Order) => (
                            <div className={styles.statsNumber} key={order._id}>
                                {order.number}
                            </div>
                        ))}
                    </div>
                    <div className={styles.statsColumn}>
                        <div className={styles.statsOrders}>В работе:</div>
                        {pendingOrders.slice(0, 10).map((order: Order) => (
                            <div className={styles.statsNumber} key={order._id}>
                                {order.number}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div>Всего заказов: {total}</div>
                    <div>Заказов сегодня: {totalToday}</div>
                </div>
            </aside>
        </div>
    );
};

export default FeedPage;
