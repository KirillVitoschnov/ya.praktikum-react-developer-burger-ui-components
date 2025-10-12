import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIngridients } from "../../services/ingridients/ingridientsSlice";
import BurgerHeader from "../burger-header/burger-header";
import ListIngridient from "../list-ingridient/list-ingridient";
import s from "./burger-ingredients.module.css";

export default function BurgerIngredients() {
    const dispatch = useAppDispatch();
    const { ingridients } = useAppSelector((state) => state.ingridients);

    useEffect(() => {
        dispatch(fetchIngridients());
    }, [dispatch]);

    const sections = useMemo(
        () => [
            { key: "bun", title: "Булки" },
            { key: "sauce", title: "Соусы" },
            { key: "main", title: "Начинки" },
        ],
        []
    );

    return (
        <section className={s.burger}>
            <BurgerHeader />

            <section className={s.burger__left}>
                {sections.map((section) => {
                    const filtered = ingridients.filter((item) => item.type === section.key);
                    return <ListIngridient key={section.key} title={section.title} items={filtered} />;
                })}
            </section>
        </section>
    );
}
