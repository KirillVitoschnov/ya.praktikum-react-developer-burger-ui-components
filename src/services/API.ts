import { request } from "../utils/request";
import { API_BASE_URL } from "../constants/api";
import { AppDispatch } from "./store";
import type { Ingridient, IngredientsPayload, CreateOrderPayload } from "../types/types";

export const getIngredients = async (): Promise<Ingridient[]> => {
    const data = await request(`${API_BASE_URL}ingredients`) as IngredientsPayload;
    return data.data;
};

export const getIngridients = getIngredients;
