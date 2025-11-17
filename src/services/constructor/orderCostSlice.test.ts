import orderCostReducer, { setCost, setOrder } from './orderCostSlice';
import type { InitialStateOrderCost, ConstructorItemIgridient } from '../../types/types';

const testBun: ConstructorItemIgridient = {
  _id: 'bunid',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
  uniqueId: 'unique-bun',
};

const testMain: ConstructorItemIgridient = {
  _id: 'mainid',
  name: 'Мясо',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
  uniqueId: 'unique-main',
};

describe('orderCostSlice', () => {
  const initialState: InitialStateOrderCost = {
    orderName: 'Идентификатор заказа',
    orderNumber: 123456,
    orderCost: 0,
  };

  it('должен возвращать начальное состояние', () => {
    expect(orderCostReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен считать стоимость заказа', () => {
    const action = setCost({ constructorItems: [testMain], bun: testBun });
    const state = orderCostReducer(initialState, action);
    expect(state.orderCost).toBe(200); // 100 + 2*50
  });

  it('должен устанавливать номер и имя заказа', () => {
    const action = setOrder({ name: 'Тест', number: 999 });
    const state = orderCostReducer(initialState, action);
    expect(state.orderName).toBe('Тест');
    expect(state.orderNumber).toBe(999);
  });
});
