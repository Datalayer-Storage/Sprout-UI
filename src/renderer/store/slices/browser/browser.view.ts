import { HistoryEntry } from './browser.types';

export const selectDefaultPage = (state): HistoryEntry => {
  return {
    url: state.browser.defaultPage,
    title: '',
    pageState: {},
    timeStamp: new Date().toString(),
  };
};

export const selectCurrentPage = (state): HistoryEntry => {
  const history = state.browser.history;
  const historyIndex = state.browser.historyIndex;
  return history[historyIndex];
};
