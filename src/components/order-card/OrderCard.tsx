import React from "react";
import { Link } from "react-router-dom";
import styles from "./order-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, Order } from "../../types/types";

interface OrderCardProps {
    order: Order;
    allIngredients: Ingredient[];
    url: string;
    location?: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, allIngredients, url, location }) => {
    const uniqueIngredientIds = Array.from(new Set(order.ingredients));

    const grouped = React.useMemo(() => {
        const map = new Map<string, { ing?: Ingredient; count: number }>();
        order.ingredients.forEach((id) => {
            const ing = allIngredients.find((i) => i._id === id);
            const prev = map.get(id);
            map.set(id, { ing, count: (prev?.count || 0) + 1 });
        });
        return Array.from(map.entries());
    }, [order.ingredients, allIngredients]);

    const totalPrice = React.useMemo(() => {
        return grouped.reduce((sum, [_, { ing, count }]) => {
            return sum + (ing?.price || 0) * count;
        }, 0);
    }, [grouped]);

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
                    <div className={styles.ingredientsPreview} title={uniqueIngredientIds.join(", ")}>
                        {uniqueIngredientIds.map((id, idx) => {
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
                        <span className={styles.priceValue}>{totalPrice}</span>
                        <span className={styles.currencyIcon}>  <CurrencyIcon type="primary"/></span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default OrderCard;
