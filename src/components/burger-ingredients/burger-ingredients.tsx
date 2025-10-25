import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../services/store";
import BurgerHeader from "../burger-header/burger-header";
import ListIngridient from "../list-ingridient/list-ingridient";
import { useInView } from "react-intersection-observer";
import s from "./burger-ingredients.module.css";

export default function BurgerIngredients() {
    const { ingridients } = useAppSelector((state) => state.ingridients);
    const [activeTab, setActiveTab] = useState("Булки");

    const bunRef = useRef<HTMLDivElement | null>(null);
    const sauceRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);

    const [bunInViewRef, bunInView] = useInView({ threshold: 0.3 });
    const [sauceInViewRef, sauceInView] = useInView({ threshold: 0.3 });
    const [mainInViewRef, mainInView] = useInView({ threshold: 0.3 });

    useEffect(() => {
        if (bunInView) setActiveTab("Булки");
        else if (sauceInView) setActiveTab("Соусы");
        else if (mainInView) setActiveTab("Начинки");
    }, [bunInView, sauceInView, mainInView]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === "Булки" && bunRef.current) {
            bunRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (tab === "Соусы" && sauceRef.current) {
            sauceRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (tab === "Начинки" && mainRef.current) {
            mainRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={s.burger}>
            <BurgerHeader activeTab={activeTab} setActiveTab={handleTabClick} />
            <section className={s.burger__left}>
                <div ref={(node) => {
                    bunRef.current = node;
                    bunInViewRef(node);
                }}>
                    <ListIngridient title="Булки" items={ingridients.filter((item) => item.type === "bun")} />
                </div>
                <div ref={(node) => {
                    sauceRef.current = node;
                    sauceInViewRef(node);
                }}>
                    <ListIngridient title="Соусы" items={ingridients.filter((item) => item.type === "sauce")} />
                </div>
                <div ref={(node) => {
                    mainRef.current = node;
                    mainInViewRef(node);
                }}>
                    <ListIngridient title="Начинки" items={ingridients.filter((item) => item.type === "main")} />
                </div>
            </section>
        </section>
    );
}
