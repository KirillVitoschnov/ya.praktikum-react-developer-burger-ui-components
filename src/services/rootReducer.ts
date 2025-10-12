import {combineReducers} from 'redux';
import ingridientsSlice from "./ingridients/ingridientsSlice";
import constructorItemsSlice from './constructor/constructorItemsSlice';
import orderCostSlice from './constructor/orderCostSlice';

const rootReducer = combineReducers({
    ingridients: ingridientsSlice,
    constructorItems: constructorItemsSlice,
    orderCost: orderCostSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
