import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from '../modules/counter/counterSlice';
import { enterprizeCounterReducer } from '../modules/enterprizeCounter/slice';
import kanyeReducer from '../modules/ye/kanyeSlice';
import practiceReducer from '../modules/practice/practiceSlice';
import catalogReducer from '../modules/catalog/catalogSlice';
import { archiveApi } from '../modules/archive/archiveSlice';

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    counter: counterReducer,
    enterprizeCounter: enterprizeCounterReducer,
    kanyeQuote: kanyeReducer,
    practice: practiceReducer,
    catalog: catalogReducer,
    // archive: archiveReducer,
    [archiveApi.reducerPath]: archiveApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(archiveApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >