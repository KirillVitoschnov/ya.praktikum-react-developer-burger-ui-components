import {createSlice} from "@reduxjs/toolkit";
import {InitialStateIngridients} from "../../types/types";
import {getIngridients} from "../API";

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

export const fetchIngridients = () => async (dispatch: any) => {
    try {
        const ingridients = await getIngridients()
        dispatch(setIngridients(ingridients))
    } catch (err) {
        console.log(err);
    }
}

export default ingridientsSlice.reducer;
