import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../../services/store";
import OrderDetails from '../../../components/order-details/OrderDetails';
import { useAuthRefresh } from '../../../hooks/useAuthRefresh';

interface ProfileOrderDetailsPageProps {
    inModal?: boolean;
}

const ProfileOrderDetailsPage: React.FC<ProfileOrderDetailsPageProps> = ({ inModal }) => {
    useAuthRefresh();
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
    if (!order) {
        return <div>Заказ не найден</div>;
    }

    return <OrderDetails order={order} allIngredients={allIngredients} />;
};

export default ProfileOrderDetailsPage;
