import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./header.module.css";

export default function Header() {
    const menuItems = [
        {
            id: 1,
            icon: <BurgerIcon type="primary" />,
            text: "Конструктор",
            textClass: "text text_type_main-small",
            isActive: true,
        },
        {
            id: 2,
            icon: <ListIcon type="secondary" />,
            text: "Лента заказов",
            textClass: "text text_type_main-default text_color_inactive",
            isActive: false,
        },
    ];

    const profileItem = {
        icon: <ProfileIcon type="secondary" />,
        text: "Личный кабинет",
        textClass: "text text_type_main-default text_color_inactive",
    };

    return (
        <header className={s.header}>
            <div className={s.burgerConstructor}>
                <ul className={s.icons}>
                    {menuItems.map(({ id, icon, text, textClass }) => (
                        <li key={id} className={s.iconBox}>
                            {icon}
                            <p className={`${s.text} ${textClass}`}>{text}</p>
                        </li>
                    ))}
                </ul>
                <Logo />
                <div className={`${s.iconBox} ${s.profile}`}>
                    {profileItem.icon}
                    <p className={`${s.text} ${profileItem.textClass}`}>{profileItem.text}</p>
                </div>
            </div>
        </header>
    );
}
