import { isEqual } from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import initialState from './browser.initialstate';
import { HistoryEntry } from './browser.types';

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    visitPage: (state, { payload }) => {
      console.log('visitPage', payload);
      const timestamp: string = new Date().toDateString();
      const newEntry: HistoryEntry = {
        url: payload.url,
        title: payload.title,
        pageState: payload.pageState,
        timeStamp: timestamp,
      };

      const currentPage = state.history[state.historyIndex];

      if (!isEqual(currentPage, newEntry)) {        
        const history = current(state).history;
        const historyIndex = current(state).historyIndex;

        state.historyIndex++;
        state.history = [history.slice(0, historyIndex + 1), newEntry].flat();
      }
    },

    goBack: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.history[current(state).historyIndex];
      }
    },

    goForward: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.history[current(state).historyIndex];
      }
    },
  },
});

export const { visitPage, goBack, goForward } = browserSlice.actions;

export default browserSlice.reducer;
