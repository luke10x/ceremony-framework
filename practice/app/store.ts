import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice';
import { enterprizeCounterReducer } from '../features/enterprizeCounter/slice';
import kanyeReducer from '../features/ye/kanyeSlice';

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    counter: counterReducer,
    enterprizeCounter: enterprizeCounterReducer,
    kanyeQuote: kanyeReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >