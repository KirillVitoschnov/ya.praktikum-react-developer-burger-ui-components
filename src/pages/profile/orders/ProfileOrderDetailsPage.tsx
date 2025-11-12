import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../../services/store";
import OrderInfo from '../../../components/order-info/OrderInfo';

interface ProfileOrderDetailsPageProps {
    inModal?: boolean;
}

const ProfileOrderDetailsPage: React.FC<ProfileOrderDetailsPageProps> = ({ inModal }) => {
    const { id } = useParams<{ id: string }>();
    const orders = useSelector((state: RootStore) => state.userOrders.orders);
    const allIngredients = useSelector((state: RootStore) => state.ingridients.ingridients);
    let order = orders.find(o => o._id === id);
    if (!order) {
        const numId = Number(id);
        if (!isNaN(numId)) {
            order = orders.find(o => o.number === numId);
        }
    }
    if (order) {
        return <OrderInfo order={order} allIngredients={allIngredients} />;
    }
    if (orders.length === 0) {
        return <div>Загрузка...</div>;
    }
    return <div>Заказ не найден</div>;
};

export default ProfileOrderDetailsPage;
