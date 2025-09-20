import uniqid from "uniqid";
import { useDrop } from "react-dnd";
import { Ingridient } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addConstructorItem, deleteItem } from "../../services/constructor/constructorItemsSlice";
import ConstructorItem from "../constructor-item/constructor-item";
import ConfirmOrder from "../confirm-order/confirm-order";
import s from "./burger-constructor.module.css";

type DragPayload = { ingridient: Ingridient; index?: number };

export default function BurgerConstructor() {
    const { constructorItems: items, bun } = useAppSelector((st) => st.constructorItems);
    const send = useAppDispatch();

    const removeAt = (idx: number) => {
        send(deleteItem(idx));
    };

    const [{ isHover }, dropRef] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(payload: DragPayload) {
            if (payload.index === undefined) {
                send(
                    addConstructorItem({
                        index: undefined,
                        start: undefined,
                        end: undefined,
                        ingridient: payload.ingridient,
                    })
                );
            }
        },
        collect: (m) => ({
            isHover: m.isOver(),
            handlerId: m.getHandlerId(),
        }),
    });

    const TopBun = bun ? (
        <ConstructorItem
            key={uniqid()}
            name={`${bun.name} (верх)`}
            ingridient={bun}
            position="top"
            isLocked
            index={0}
            handleClose={removeAt}
        />
    ) : null;

    const BottomBun = bun ? (
        <ConstructorItem
            key={uniqid()}
            name={`${bun.name} (низ)`}
            ingridient={bun}
            position="bottom"
            isLocked
            index={-1}
            handleClose={removeAt}
        />
    ) : null;

    const Middle = items.map((it, i) =>
        it.type === "bun" ? null : (
            <ConstructorItem
                key={uniqid()}
                name={it.name}
                ingridient={it}
                position={undefined}
                isLocked={false}
                index={i}
                handleClose={removeAt}
            />
        )
    );

    return (
        <section className={s.main}>
            <div
                ref={dropRef}
                className={`${s.main__container} pt-25 pr-4 pl-4 mb-10 ${isHover ? s.main__container_green : ""}`}
            >
                {TopBun}
                {Middle}
                {BottomBun}
            </div>

            {items.map((it) => (
                <p key={uniqid()}>{it.name}</p>
            ))}

            <ConfirmOrder />
        </section>
    );
}
