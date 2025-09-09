import { useState, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-header.module.css";

type TabOption = "Булки" | "Соусы" | "Начинки";

export default function BurgerHeader() {
    const [activeTab, setActiveTab] = useState<TabOption>("Булки");

    const handleTabChange = useCallback((value: TabOption) => {
        setActiveTab(value);
    }, []);

    const tabs: TabOption[] = ["Булки", "Соусы", "Начинки"];

    return (
        <header className={s.container}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

            <nav className="mb-10" aria-label="Навигация по категориям ингредиентов">
                <ul className={s.menu} role="tablist">
                    {tabs.map((tab) => (
                        <li key={tab} className={s.menuItem}>
                            <Tab
                                value={tab}
                                active={activeTab === tab}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab}
                            </Tab>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
