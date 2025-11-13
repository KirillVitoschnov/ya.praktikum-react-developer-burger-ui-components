import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import OrderInfo from '../../components/order-info/OrderInfo';

interface FeedOrderPageProps {
    inModal?: boolean;
}

const FeedOrderPage: React.FC<FeedOrderPageProps> = ({ inModal }) => {
    const { id } = useParams<{ id: string }>();
    const order = useAppSelector(state => state.allOrders.orders.find(o => o._id === id || o.number === Number(id)));
    const allIngredients = useAppSelector(state => state.ingridients.ingridients);
    const loading = useAppSelector(state => state.allOrders.loading);

    if (order) {
        return <OrderInfo order={order} allIngredients={allIngredients} />;
    }
    if (loading) {
        return <div>Загрузка...</div>;
    }
    return <div>Заказ не найден</div>;
};

export default FeedOrderPage;
