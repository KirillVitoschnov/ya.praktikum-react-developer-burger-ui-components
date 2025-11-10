import React from "react";

interface Ingredient {
    _id: string;
    name: string;
    image: string;
}

interface Order {
    _id: string;
    number: number;
    name: string;
    status: string;
    createdAt: string;
    ingredients: string[];
}

interface OrderDetailsProps {
    order: Order;
    allIngredients?: Ingredient[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, allIngredients }) => {
    return (
        <div>
            <h2>Детали заказа</h2>
            <div>Номер: {order.number}</div>
            <div>Название: {order.name}</div>
            <div>Статус: {order.status}</div>
            <div>Дата: {new Date(order.createdAt).toLocaleString()}</div>
            <div>
                Ингредиенты:
                <ul>
                    {order.ingredients.map((id, idx) => {
                        const ingredient = allIngredients?.find(item => item._id === id);
                        return (
                            <li key={id + idx}>
                                {ingredient ? (
                                    <>
                                        <img src={ingredient.image} alt={ingredient.name} style={{width: 32, height: 32, borderRadius: '50%', marginRight: 8}} />
                                        {ingredient.name}
                                    </>
                                ) : id}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default OrderDetails;

