import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-header.module.css";

export default function BurgerHeader() {
    const [activeTab, setActiveTab] = useState("Булки");

    const tabs = [
        { value: "Булки", label: "Булки" },
        { value: "Соусы", label: "Соусы" },
        { value: "Начинки", label: "Начинки" },
    ];

    return (
        <div className={s.header}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>

            <ul className={`${s.header__menu} mb-10`}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        active={activeTab === tab.value}
                        onClick={setActiveTab}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </ul>
        </div>
    );
}
