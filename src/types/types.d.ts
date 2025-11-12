export interface Ingredient {
    _id: string;
    name: string;
    image: string;
    price: number;
}

export interface Order {
    _id: string;
    number: number;
    name: string;
    status: string;
    createdAt: string;
    ingredients: string[];
}

export type Ingridient = {
    _id: string;
    name: string;
    type: "bun" | "sauce" | "main";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export interface ConstructorItemIgridient extends Ingridient {
    uniqueId: string;
}

export type InitialStateIngridients = {
    ingridients: Ingridient[];
    ingridientsRequest: boolean;
    ingridientsFailed: boolean;
};

export type InitialStateConstructor = {
    bun: ConstructorItemIgridient | null;
    constructorItems: ConstructorItemIgridient[];
    constructorItemsRequest: boolean;
    constructorItemsFailed: boolean;
};

export type InitialStateOrderCost = {
    orderName: string;
    orderNumber: number;
    orderCost: number;
};

export type IngredientsPayload = { data: Ingridient[] };
export type CreateOrderPayload = {
    name: string;
    order: { number: number };
};

export interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  loading: boolean;
}

export interface UserOrdersState extends OrdersState {
  loading: boolean;
}

export interface User {
    email: string;
    name: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export interface LoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RefreshResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface GetUserResponse {
    success: boolean;
    user: User;
}

export interface UpdateUserResponse {
    success: boolean;
    user: User;
}

export interface WsState {
  connected: boolean;
  error: string | null;
  messages: any[];
}

export interface WsConnectAction {
  type: string;
  token?: string;
}
export interface WsOpenAction {
  type: string;
}
export interface WsMessageAction {
  type: string;
  payload: any;
}
export interface WsErrorAction {
  type: string;
  payload: any;
}
export interface WsCloseAction {
  type: string;
}
export interface WsSendAction {
  type: string;
  payload: any;
}
export interface WsDisconnectAction {
  type: string;
}
export type WsActions =
  | WsConnectAction
  | WsOpenAction
  | WsMessageAction
  | WsErrorAction
  | WsCloseAction
  | WsSendAction
  | WsDisconnectAction;
