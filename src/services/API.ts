import { request } from "../utils/request";
import { BASE_PATH, ORDER_PATH } from "../utils/constants";
import { setOrder } from "./constructor/orderCostSlice";
import { AppDispatch } from "./store";
import type { Ingridient } from "../types/types";

export const getIngredients = async (): Promise<Ingridient[]> => {
    type Payload = { data: Ingridient[] };
    const data = await request<Payload>(BASE_PATH);
    return data.data;
};

export const getIngridients = getIngredients;

export const createOrder = async (
    dispatch: AppDispatch,
    ingredients: string[]
) => {
    if (!ingredients?.length) {
        throw new Error("Заказ пуст, соберите бургер");
    }
    type Payload = { name: string; order: { number: number } };
    const data = await request<Payload>(ORDER_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
    });
    dispatch(setOrder({ number: data.order.number, name: data.name }));
    return data.order;
};
