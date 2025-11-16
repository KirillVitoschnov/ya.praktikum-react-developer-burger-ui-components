import { Link, NavLink } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./header.module.css";

export default function Header() {
    return (
        <header className={s.header}>
            <div className={s.burgerConstructor}>
                <ul className={s.icons}>
                    <li className={s.iconBox}>
                        <NavLink to="/" className={({ isActive }) => s.link}>
                            {({ isActive }) => (
                                <>
                                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                    <p className={`${s.text} text text_type_main-small ${isActive ? "" : "text_color_inactive"}`}>
                                        Конструктор
                                    </p>
                                </>
                            )}
                        </NavLink>
                    </li>

                    <li className={s.iconBox}>
                        <NavLink to="/feed" className={({ isActive }) => s.link}>
                            {({ isActive }) => (
                                <>
                                    <ListIcon type={isActive ? "primary" : "secondary"} />
                                    <p className={`${s.text} text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                                        Лента заказов
                                    </p>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>

                <Link to="/" className={s.logoLink}>
                    <Logo />
                </Link>

                <div className={`${s.iconBox} ${s.profile}`}>
                    <NavLink to="/profile" className={({ isActive }) => s.link}>
                        {({ isActive }) => (
                            <>
                                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                                <p className={`${s.text} text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                                    Личный кабинет
                                </p>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
