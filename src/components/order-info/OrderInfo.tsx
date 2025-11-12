import React, {useMemo} from "react";
import styles from "./OrderInfo.module.css";
import {Ingredient, Order} from "../../types/types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderInfoProps {
    order: Order;
    allIngredients?: Ingredient[];
}

const OrderInfo: React.FC<OrderInfoProps> = ({order, allIngredients}) => {
    const grouped = useMemo(() => {
        const map = new Map<string, { ing?: Ingredient; count: number }>();
        order.ingredients.forEach((id) => {
            const ing = allIngredients?.find((i) => i._id === id);
            const prev = map.get(id);
            map.set(id, {ing, count: (prev?.count || 0) + 1});
        });
        return Array.from(map.entries());
    }, [order.ingredients, allIngredients]);

    const totalPrice = useMemo(() => {
        return grouped.reduce((sum, [_, {ing, count}]) => {
            return sum + (ing?.price || 0) * count;
        }, 0);
    }, [grouped]);

    const statusClass =
        order.status === "done"
            ? styles.statusDone
            : order.status === "pending"
                ? styles.statusPending
                : styles.statusDefault;

    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.number}>#{String(order.number).padStart(6, "0")}</div>
                </div>

                <div className={styles.title}>{order.name}</div>
                <div className={`${styles.status} ${statusClass}`}>
                    {order.status === "done" ? "Выполнен" : order.status === "pending" ? "Готовится" : order.status}
                </div>

                <div className={styles.sectionTitle}>Состав:</div>

                <div className={styles.list}>
                    {grouped.map(([id, {ing, count}]) => (
                        <div key={id} className={styles.row}>
                            <div className={styles.left}>
                                {ing?.image ? (
                                    <img className={styles.avatar} src={ing.image} alt={ing?.name || id}/>
                                ) : (
                                    <div className={styles.avatarPlaceholder}/>
                                )}
                                <div className={styles.name}>{ing?.name || id}</div>
                            </div>
                            <div className={styles.right}>
                                <span className={styles.qty}>{count}</span>
                                {ing?.price !== undefined && (
                                    <span className={styles.price}> × {ing.price} <CurrencyIcon type="primary"/></span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <div className={styles.date}>
                        {new Date(order.createdAt).toLocaleString()}
                    </div>
                    <div className={styles.total}>
                        <span className={styles.totalValue}>{totalPrice} <CurrencyIcon type="primary"/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
