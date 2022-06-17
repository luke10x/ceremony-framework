import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { PracticeConfig, TaskType } from '../practice/types';

export interface CatalogOption {
  title: string,
  config: PracticeConfig
}

export interface CatalogState {
  selected: CatalogOption
};

const initialState: CatalogState = {
  selected: {
    title: "Practice addition for 10 seconds",
    config: {
      timeboxSeconds: 10,
      taskConfigs: [{ type: TaskType.Addition }],
    }
  }
}

// Reducers:

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<CatalogOption>) => {
      state.selected = action.payload
    }
  }, 
});

export default catalogSlice.reducer;

// Actions:

export const {
  select
} = catalogSlice.actions;

// Selectors: 

export const selectSelected = (state: RootState) => state.catalog.selected;
