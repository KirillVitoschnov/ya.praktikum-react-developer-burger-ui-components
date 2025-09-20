import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import type {XYCoord} from 'dnd-core'
import s from "./constructor-item.module.css"
import {ConstructorItemIgridient, Ingridient} from "../../types/types"
import {useDrag, useDrop} from "react-dnd"
import {useRef} from "react"
import {useAppDispatch} from "../../services/store";
import {setConstructorItem} from "../../services/constructor/constructorItemsSlice"

interface Props {
    ingridient: ConstructorItemIgridient
    name: string
    position?: "top" | "bottom" | undefined
    isLocked?: boolean
    index: number
    handleClose: (index: number) => void
}

export default function ConstructorItem({
                                            ingridient,
                                            name,
                                            position,
                                            isLocked,
                                            index,
                                            handleClose,
                                        }: Props) {
    const {price, image, uuid} = ingridient;

    const ref = useRef(null)
    const dispatch = useAppDispatch()


    const [{isHover}, dropTarget] = useDrop({
        accept: ['sauce', 'main'],
        drop(item: { ingridient: Ingridient, index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = (ref.current as any).getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(setConstructorItem({
                index: index,
                start: dragIndex,
                end: hoverIndex,
                ingridient: item.ingridient
            }))

            item.index = hoverIndex
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            handlerId: monitor.getHandlerId()
        })
    });

    const [{isDragging}, dragRef] = useDrag({
        type: ingridient?.type ?? "none",
        item: {ingridient, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1
    !position && dragRef(dropTarget(ref))

    return (
        <div
            className={s.container}
            style={{opacity}}
            ref={position ? dropTarget : ref}>
            {position === undefined
                &&
                <button className={s.container__btn}>
                    <DragIcon type="primary"/>
                </button>}
            <ConstructorElement
                type={position}
                isLocked={isLocked}
                text={name}
                price={price}
                thumbnail={image}
                extraClass={s.container__item}
                handleClose={() => handleClose(index)}
            />
        </div>
    )
}
