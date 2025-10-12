import {useEffect, useState} from "react"
import {Button} from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./confirm-order.module.css"
import Modal from "../modal/modal"
import diamond from "../../images/diamond.svg"
import OrderDetails from "../order-details/order-details"
import {useAppDispatch, useAppSelector} from "../../services/store"
import {clearConstructor} from "../../services/constructor/constructorItemsSlice"
import {setCost} from "../../services/constructor/orderCostSlice"
import {createOrder} from "../../services/API"
import {ConstructorItemIgridient} from "../../types/types"

export default function ConfirmOrder() {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const {constructorItems, bun} = useAppSelector(store => store.constructorItems)
    const {orderCost, orderNumber} = useAppSelector(store => store.orderCost)

    useEffect(() => {
        dispatch(setCost({constructorItems, bun}))
    }, [bun, constructorItems, dispatch])

    const openPopup = () => {
        createOrder(dispatch, [(bun?._id as string), ...constructorItems.map(item => item._id)])
        setIsOpen(true)
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    const clearCart = () => {
        dispatch(clearConstructor())
    }

    return (
        <>
            <footer className={s.confirm}>
                <p className={`${s.confirm__price} text text_type_digits-medium mr-2`}>{orderCost}</p>
                <img src={diamond} alt="coin" className={`${s.confirm__img} mr-10`}/>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={openPopup}
                >
                    Оформить заказ
                </Button>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={clearCart}>
                    Очистить корзину
                </Button>
            </footer>
            {isOpen
                &&
                <Modal close={closePopup} title={orderNumber.toString()} confirm={true}>
                    <OrderDetails/>
                </Modal>
            }
        </>
    )
}
