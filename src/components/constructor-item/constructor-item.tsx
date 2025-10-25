import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { XYCoord } from "dnd-core";
import s from "./constructor-item.module.css";
import { ConstructorItemIgridient } from "../../types/types";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useAppDispatch } from "../../services/store";
import { setConstructorItem } from "../../services/constructor/constructorItemsSlice";

interface Props {
    ingridient: ConstructorItemIgridient;
    name: string;
    position?: "top" | "bottom";
    isLocked?: boolean;
    index: number;
    handleClose: (index: number) => void;
}

type DndItem = { ingridient: ConstructorItemIgridient; index: number };

export default function ConstructorItem({
                                            ingridient,
                                            name,
                                            position,
                                            isLocked,
                                            index,
                                            handleClose
                                        }: Props) {
    const { price, image } = ingridient;
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    const [{ isHover }, drop] = useDrop<DndItem, void, { isHover: boolean }>({
        accept: "constructor-item",
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const rect = ref.current.getBoundingClientRect();
            const middleY = (rect.bottom - rect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;
            const hoverClientY = (clientOffset as XYCoord).y - rect.top;
            if (dragIndex < hoverIndex && hoverClientY < middleY) return;
            if (dragIndex > hoverIndex && hoverClientY > middleY) return;
            dispatch(setConstructorItem({ start: dragIndex, end: hoverIndex }));
            item.index = hoverIndex;
        },
        collect: (m) => ({ isHover: m.isOver() })
    });

    const [{ isDragging }, drag] = useDrag({
        type: "constructor-item",
        item: { ingridient, index },
        collect: (monitor) => ({ isDragging: monitor.isDragging() })
    });

    if (!position) drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    return (
        <div
            className={s.container}
            style={{ opacity }}
            ref={position ? ref : ref}
        >
            {position === undefined && (
                <button className={s.container__btn}>
                    <DragIcon type="primary" />
                </button>
            )}
            <ConstructorElement
                type={position}
                isLocked={Boolean(isLocked)}
                text={name}
                price={price}
                thumbnail={image}
                extraClass={s.container__item}
                handleClose={() => handleClose(index)}
            />
            <div className={isHover ? s.hover : ""} />
        </div>
    );
}
