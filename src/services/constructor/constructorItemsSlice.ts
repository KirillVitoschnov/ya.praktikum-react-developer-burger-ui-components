import {createSlice} from "@reduxjs/toolkit";
import {ConstructorItemIgridient, Ingridient, InitialStateConstructor} from "../../types/types";
import uniqid from 'uniqid';

const initialState: InitialStateConstructor = {
    bun: null,
    constructorItems: [],
    constructorItemsRequest: false,
    constructorItemsFailed: false,
};

const addUUID = (ingredient: Ingridient): ConstructorItemIgridient => ({...ingredient, uuid: uniqid()})

const constructorSlice = createSlice({
    name: 'constructorItems',
    initialState,
    reducers: {
        clearConstructor(state) {
            state.constructorItems = []
            state.bun = null
        },
        addConstructorItem(state, {payload}) {
            if (payload.ingridient.type === "bun") {
                state.bun! = {...payload.ingridient}
            } else {
                state.constructorItems.push(payload.ingridient)
            }
        },
        setConstructorItem(state, {payload}) {
            const new_array = state.constructorItems.slice()
            const new_ingridient_start = new_array.splice(payload.start!, 1)[0]
            const new_ingridient_end = new_array.splice(payload.end!, 1)[0]
            new_array.splice(payload.end!, 0, new_ingridient_start)
            new_array.splice(payload.start!, 0, new_ingridient_end)
            state.constructorItems = new_array
        },
        deleteItem(state, {payload}) {
            const new_array = state.constructorItems.slice()
            new_array.splice(payload, 1)
            state.constructorItems = new_array
        },
    },
});

export const {
    clearConstructor,
    addConstructorItem,
    setConstructorItem,
    deleteItem
} = constructorSlice.actions;

export default constructorSlice.reducer;
