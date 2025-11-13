import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import OrderInfo from '../../components/order-info/OrderInfo';
import {getOrdersWebSocketUrl} from "../../hooks/useOrdersWebSocketUrl";
import {wsConnect, wsDisconnect} from "../../services/orders/wsTypes";

interface FeedOrderPageProps {
    inModal?: boolean;
}

const FeedOrderPage: React.FC<FeedOrderPageProps> = ({ inModal }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const order = useAppSelector(state => state.allOrders.orders.find(o => o._id === id || o.number === Number(id)));
    const allIngredients = useAppSelector(state => state.ingridients.ingridients);
    const loading = useAppSelector(state => state.allOrders.loading);

    useEffect(() => {
        if (!order) {
            const wsUrl = getOrdersWebSocketUrl('public');
            if (wsUrl) {
                dispatch(wsConnect(wsUrl));

                return () => {
                    dispatch(wsDisconnect());
                };
            }
        }
    }, [dispatch, order]);

    if (order) {
        return <OrderInfo order={order} allIngredients={allIngredients} />;
    }
    if (loading) {
        return <div>Загрузка...</div>;
    }
    return <div>Заказ не найден</div>;
};

export default FeedOrderPage;
