import {Res} from "../types/types"
import {BASE_PATH, ORDER_PATH} from "../utils/constants"
import {setOrder} from "./constructor/orderCostSlice"
import {AppDispatch} from "./store"

export const getIngridients = async () => {
    try {
        const res: any = await fetch(BASE_PATH)
        const data: Res = await res.json()
        if (data && data.success) return data.data
    } catch (err) {
        console.log(err)
    }
    ;
}

export const createOrder = async (dispatch: AppDispatch, ingredients: string[]) => {
    try {
        const response = await fetch(ORDER_PATH, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ingredients})
        });
        if (ingredients.length === 0) {
            throw new Error("Заказ пуст, соберите бургер");
        }

        if (!response.ok) {
            throw new Error("Ошибка при создании заказа");
        }

        const data = await response.json();
        if (data.success) {
            dispatch(setOrder({number: data.order.number, name: data.name}));
        } else {
            throw new Error("Ошибка при создании заказа", data);
        }

    } catch (error) {
        alert(error);
    }
}
