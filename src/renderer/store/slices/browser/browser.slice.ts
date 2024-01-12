import { isEqual } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import initialState from './browser.initialstate';
import { HistoryEntry } from '.';

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    visitPage: (state, { payload }) => {
      const timestamp: string = new Date().toDateString();
      const newEntry: HistoryEntry = {
        url: payload.url,
        title: payload.title,
        pageState: payload.pageState,
        timeStamp: timestamp,
      };

      const currentPage = state.history[state.historyIndex];

      if (!isEqual(currentPage, newEntry)) {

        // Remove future history if new page is visited
        state.history = state.history.slice(0, state.historyIndex);
        
        state.history.push(newEntry);
        state.historyIndex++;
      }
    },

    goBack: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.history[state.historyIndex];
      }
    },

    goForward: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.history[state.historyIndex];
      }
    },
  },
});

export const { visitPage, goBack, goForward } = browserSlice.actions;
export default browserSlice.reducer;
