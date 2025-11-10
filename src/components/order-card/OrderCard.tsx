import React from "react";
import { Link } from "react-router-dom";
import styles from "./order-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

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

interface OrderCardProps {
    order: Order;
    allIngredients: Ingredient[];
    url: string;
    location?: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, allIngredients, url, location }) => {
    return (
        <li className={styles.orderCard}>
            <Link
                to={url}
                state={location ? { background: location } : undefined}
                className={styles.orderLink}
            >
                <div className={styles.orderHeader}>
                    <span className={styles.orderNumber}>#{order.number}</span>
                    <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <h3 className={styles.orderName}>{order.name}</h3>
                <p className={styles.orderStatus}>{order.status}</p>
                <div className={styles.orderFooter}>
                    <div className={styles.ingredientsPreview} title={order.ingredients.join(", ")}>
                        {order.ingredients.map((id, idx) => {
                            const ingredient = allIngredients.find(item => item._id === id);
                            return ingredient ? (
                                <img
                                    key={id + idx}
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                    className={styles.ingredientIcon}
                                />
                            ) : null;
                        })}
                    </div>
                    <div className={styles.orderPrice}>
                        <span className={styles.priceValue}>{560}</span>
                        <span className={styles.currencyIcon}>  <CurrencyIcon type="primary"/></span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default OrderCard;
