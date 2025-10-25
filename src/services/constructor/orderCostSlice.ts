import {createSlice} from "@reduxjs/toolkit";
import {ConstructorItemIgridient, InitialStateOrderCost} from "../../types/types";

const initialState: InitialStateOrderCost = {
    orderName: "Идентификатор заказа",
    orderNumber: 123456,
    orderCost: 0
}

const orderCostSlice = createSlice({
    name: "orderCost",
    initialState,
    reducers: {
        setCost: (state, {payload}) => {
            state.orderCost = payload.constructorItems.reduce((acc: number, item: ConstructorItemIgridient) => {
                return acc += item.price
            }, 0) + (payload.bun ? 2 * payload.bun.price : 0)
        },
        setOrder: (state, action) => {
            state.orderName = action.payload.name
            state.orderNumber = action.payload.number
        }
    }
})

export const {setCost, setOrder} = orderCostSlice.actions

export default orderCostSlice.reducer
