import { useMemo } from "react";
import s from "./burger-constructor.module.css";
import ConfirmOrder from "../confirm-order/confirm-order";
import ConstructorItem from "../constructor-item/constructor-item";

import bunBottom from "../../images/bun-bottom.png";
import sauce from "../../images/sauce.png";
import meet from "../../images/meet.png";

interface Props {
    data: never[];
}

type Piece = {
    position?: "top" | "bottom";
    isLocked?: boolean;
    thumbnail?: string;
};

export default function BurgerConstructor({ data }: Props) {
    const items: Piece[] = useMemo(
        () => [
            { position: "top", isLocked: true },
            { thumbnail: sauce },
            { thumbnail: meet },
            { position: "bottom", thumbnail: bunBottom, isLocked: true },
        ],
        []
    );

    return (
        <section className={`${s.root} pt-25 pr-4 pl-4`} aria-label="Burger constructor">
            <ul className={s.stack} role="list">
                {items.map((item, idx) => (
                    <li key={`${item.position ?? "mid"}-${idx}`} className={s.cell}>
                        <ConstructorItem
                            position={item.position as any}
                            isLocked={item.isLocked}
                            thumbnail={item.thumbnail as any}
                        />
                    </li>
                ))}
            </ul>

            <div className={s.footer}>
                <ConfirmOrder price="100" />
            </div>
        </section>
    );
}
