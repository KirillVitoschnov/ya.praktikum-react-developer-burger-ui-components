import { request, getAccessTokenFromLocalStorage } from "../utils/request";
import { API_BASE_URL } from "../constants/api";
import { setOrder } from "./constructor/orderCostSlice";
import { clearConstructor } from "./constructor/constructorItemsSlice";
import { AppDispatch } from "./store";
import type { Ingridient, IngredientsPayload, CreateOrderPayload } from "../types/types";

export const getIngredients = async (): Promise<Ingridient[]> => {
    const data = await request(`${API_BASE_URL}ingredients`) as IngredientsPayload;
    return data.data;
};

export const getIngridients = getIngredients;

export const createOrder = async (
    dispatch: AppDispatch,
    ingredients: string[],
    setLoading: (loading: boolean) => void
) => {
    if (!ingredients?.length) {
        throw new Error("Заказ пуст, соберите бургер");
    }
    setLoading(true);
    try {
        const accessToken = getAccessTokenFromLocalStorage();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const data = await request(`${API_BASE_URL}orders`, {
            method: "POST",
            headers,
            body: JSON.stringify({ ingredients }),
        }) as CreateOrderPayload;
        dispatch(setOrder({ number: data.order.number, name: data.name }));
        dispatch(clearConstructor());
        return data.order;
    } finally {
        setLoading(false);
    }
};
