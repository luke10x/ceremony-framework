import type { RootState } from '../../../app/store';

import { createSelector } from '@reduxjs/toolkit';

const selectEnterprizeCount = (state: RootState) => state.enterprizeCounter.value;

export const enterprizeCountSelector = createSelector(selectEnterprizeCount, state => state);