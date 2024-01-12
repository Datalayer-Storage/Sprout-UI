import { createSlice } from '@reduxjs/toolkit';
import initialState from './browser.initialstate';

interface PageState {
  scrollPosition: {x: number, y: number};
  formData: {};
}

interface VisitPagePayload {
  url: string;
  title: string;
  pageState: PageState;
}

interface HistoryEntry{
  url: string;
  title: string;
  pageState: PageState;
  timeStamp: string;
}

export const browserSlice = createSlice({
  
  name: 'browser',
  initialState,
  reducers: {

    visitPage: (state, { payload }) => {
      const timestamp:string = new Date().toDateString();
      const newEntry: HistoryEntry = { 
        url: payload.url, 
        title: payload.title, 
        pageState: payload.pageState, 
        timeStamp: timestamp 
      };
      state.history.push(newEntry);
      state.historyIndex++;
      // Remove future history if new page is visited
      state.history = state.history.slice(0, state.historyIndex + 1);
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

    getCurrentPage: (state) => {
      state.history[state.historyIndex];
    }
  }
});

export const {
  visitPage,
  goBack,
  goForward,
  getCurrentPage
} = browserSlice.actions;

export const selectCurrentPage = (state => state.browser.currentPage);

export type { VisitPagePayload, PageState, HistoryEntry }
export default browserSlice.reducer;
