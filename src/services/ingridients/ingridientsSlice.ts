import {createSlice} from "@reduxjs/toolkit";
import {InitialStateIngridients} from "../../types/types";
import {getIngridients} from "../API";
import { AppDispatch } from "../store";

const initialState: InitialStateIngridients = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
};

const ingridientsSlice = createSlice({
    name: 'ingridients',
    initialState,
    reducers: {
        setIngridients(state, {payload}) {
            state.ingridients = payload
        },
    },
});

export const {setIngridients} = ingridientsSlice.actions;

export const fetchIngridients = () => async (dispatch: AppDispatch) => {
    try {
        const ingridients = await getIngridients();
        dispatch(setIngridients(ingridients));
    } catch (err) {
        console.log(err);
    }
}

export default ingridientsSlice.reducer;
