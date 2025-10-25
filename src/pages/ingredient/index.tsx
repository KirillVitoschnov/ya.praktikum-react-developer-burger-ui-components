import React from "react";
import {useParams} from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useAppDispatch, useAppSelector} from "../../services/store";
import type {Ingridient} from "../../types/types";
import styles from "./IngredientPage.module.css";

type Props = { inModal?: boolean };

export default function Ingredient({inModal = false}: Props) {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const {ingridients, ingridientsRequest, ingridientsFailed} = useAppSelector(
        (s) => s.ingridients
    );

    const ingredient: Ingridient | undefined = React.useMemo(
        () => ingridients?.find((x) => x._id === id),
        [ingridients, id]
    );

    if (ingridientsFailed) {
        return <div className={styles.status}>Ошибка загрузки ингредиентов.</div>;
    }

    if (ingridientsRequest || !ingridients?.length) {
        return <div className={styles.status}>Загружаем ингредиенты…</div>;
    }

    if (!ingredient) {
        return (
            <main className={styles.container}>
                <h1 className={styles.title}>Ингредиент не найден</h1>
            </main>
        );
    }

    const {name, image, calories, proteins, fat, carbohydrates} = ingredient;

    return (
        <main className={styles.container}>
            {!inModal && <h1 className={styles.title}>Детали ингредиента</h1>}
            <section className={styles.content}>
                <IngredientDetails
                    name={name}
                    image={image}
                    calories={calories}
                    proteins={proteins}
                    fat={fat}
                    carbohydrates={carbohydrates}
                />
            </section>
        </main>
    );
}
