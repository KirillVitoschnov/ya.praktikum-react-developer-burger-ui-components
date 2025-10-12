import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ConstructorItemIgridient, Ingridient, InitialStateConstructor } from "../../types/types";

const initialState: InitialStateConstructor = {
    bun: null,
    constructorItems: [],
    constructorItemsRequest: false,
    constructorItemsFailed: false
};

type AddPayload = {
    index?: number;
    start?: number;
    end?: number;
    ingridient: ConstructorItemIgridient;
};

const genId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const constructorSlice = createSlice({
    name: "constructorItems",
    initialState,
    reducers: {
        clearConstructor(state) {
            state.constructorItems = [];
            state.bun = null;
        },
        addConstructorItem: {
            reducer: (state, { payload }: PayloadAction<AddPayload>) => {
                const item = payload.ingridient;
                if (item.type === "bun") {
                    state.bun = item;
                } else if (payload.index === undefined) {
                    state.constructorItems.push(item);
                } else {
                    state.constructorItems.splice(payload.index, 0, item);
                }
            },
            prepare: (payload: { index?: number; start?: number; end?: number; ingridient: Ingridient }) => ({
                payload: {
                    ...payload,
                    ingridient: { ...payload.ingridient, uniqueId: genId() }
                }
            })
        },
        setConstructorItem(state, { payload }: PayloadAction<{ start: number; end: number }>) {
            const list = state.constructorItems.slice();
            const a = list.splice(payload.start, 1)[0];
            const b = list.splice(payload.end > payload.start ? payload.end - 1 : payload.end, 1)[0];
            list.splice(payload.end, 0, a);
            list.splice(payload.start, 0, b);
            state.constructorItems = list;
        },
        deleteItem(state, { payload }: PayloadAction<number>) {
            const list = state.constructorItems.slice();
            list.splice(payload, 1);
            state.constructorItems = list;
        }
    }
});

export const { clearConstructor, addConstructorItem, setConstructorItem, deleteItem } = constructorSlice.actions;
export default constructorSlice.reducer;
