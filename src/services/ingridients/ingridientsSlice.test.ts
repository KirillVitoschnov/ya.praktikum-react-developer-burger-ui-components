import ingridientsReducer, { setIngridients } from './ingridientsSlice';
import type { InitialStateIngridients, Ingridient } from '../../types/types';

const testIngridient: Ingridient = {
  _id: 'ingid',
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
};

describe('ingridientsSlice', () => {
  const initialState: InitialStateIngridients = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
  };

  it('должен возвращать начальное состояние', () => {
    expect(ingridientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать setIngridients', () => {
    const payload = [testIngridient];
    expect(ingridientsReducer(initialState, setIngridients(payload))).toEqual({ ...initialState, ingridients: payload });
  });
});

