import {combineReducers} from 'redux';
import ingridientsSlice from "./ingridients/ingridientsSlice";
import constructorItemsSlice from './constructor/constructorItemsSlice';
import orderCostSlice from './constructor/orderCostSlice';
import auth from './auth/authSlice'
import ordersReducer from './orders/ordersSlice';
import userOrdersReducer from './orders/userOrdersSlice';
import { wsReducer } from './orders/wsReducer';

const rootReducer = combineReducers({
    ingridients: ingridientsSlice,
    constructorItems: constructorItemsSlice,
    orderCost: orderCostSlice,
    auth,
    orders: ordersReducer,
    userOrders: userOrdersReducer,
    ws: wsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
