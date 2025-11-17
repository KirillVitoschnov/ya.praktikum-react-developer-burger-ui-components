import constructorReducer, { clearConstructor, addConstructorItem } from './constructorItemsSlice';
import type { InitialStateConstructor, ConstructorItemIgridient } from '../../types/types';

const testIngredient: ConstructorItemIgridient = {
  _id: 'testid',
  name: 'Тестовая булка',
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
  uniqueId: 'unique-test',
};

const testMain: ConstructorItemIgridient = {
  _id: 'mainid',
  name: 'Тестовый ингредиент',
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

describe('constructorItemsSlice', () => {
  const initialState: InitialStateConstructor = {
    bun: null,
    constructorItems: [],
    constructorItemsRequest: false,
    constructorItemsFailed: false,
  };

  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен очищать конструктор', () => {
    const state: InitialStateConstructor = {
      ...initialState,
      bun: testIngredient,
      constructorItems: [testMain],
    };
    expect(constructorReducer(state, clearConstructor())).toEqual(initialState);
  });

  it('должен добавлять ингредиент', () => {
    const action = addConstructorItem({ ingridient: testMain });
    const state = constructorReducer(initialState, action);
    expect(state.constructorItems.length).toBe(1);
    expect(state.constructorItems[0].uniqueId).toBeDefined();
  });
});
