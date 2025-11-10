import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../services/store";
import OrderDetails from '../../components/order-details/OrderDetails';

interface FeedOrderPageProps {
    inModal?: boolean;
}

const FeedOrderPage: React.FC<FeedOrderPageProps> = ({ inModal }) => {
    const { id } = useParams<{ id: string }>();
    const order = useSelector((state: RootStore) => state.orders.orders.find(o => o._id === id));
    const allIngredients = useSelector((state: RootStore) => state.ingridients.ingridients);

    if (!order) {
        return <div>Заказ не найден</div>;
    }

    return <OrderDetails order={order} allIngredients={allIngredients} />;
};

export default FeedOrderPage;
