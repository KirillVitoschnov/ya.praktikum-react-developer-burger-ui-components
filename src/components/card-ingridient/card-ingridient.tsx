import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./card-ingridient.module.css"
import {useEffect, useState} from "react"
import Modal from "../modal/modal"
import IngredientDetails from "../ingredient-details/ingredient-details"
import {Ingridient} from "../../types/types"
import {useDrag} from "react-dnd"
import {useAppSelector} from "../../services/store"

interface Props {
    ingridient: Ingridient
}

export default function Card({ingridient}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [counter, setCounter] = useState(0);

    const {calories, proteins, fat, carbohydrates, type, _id} = ingridient;

    const {constructorItems, bun} = useAppSelector(store => store.constructorItems)

    const [, dragRef] = useDrag({
        type: type,
        item: {ingridient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    useEffect(() => {
        if (type === "bun") {
            bun?._id === _id ? setCounter(2) : setCounter(0)
        } else if (constructorItems.find(item => item._id === _id)) {
            const count = constructorItems.filter(item => item._id === _id)
            count && setCounter(count.length)
        } else setCounter(0)
    }, [constructorItems, _id, type, bun?._id])

    const openPopup = () => {
        setIsOpen(true)
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className={`${s.card}`} onClick={openPopup} ref={dragRef}>
                {counter ? <Counter count={counter} size="default" extraClass="m-1"/> : null}
                <img className={`${s.card__img} mb-1`} src={ingridient.image} alt={ingridient.name}/>
                <div className={`${s.card__price}`}>
                    <span className="text text_type_digits-default mr-2">{ingridient.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-small mt-2 ${s.card__description}`}>
                    {ingridient.name}
                </p>
            </div>
            {isOpen
                &&
                <Modal close={closePopup} title="Детали ингридиента">
                    <IngredientDetails
                        carbohydrates={carbohydrates}
                        calories={calories}
                        proteins={proteins}
                        fat={fat}
                        image={ingridient.image}
                        name={ingridient.name}
                    />
                </Modal>
            }
        </>
    )
}
