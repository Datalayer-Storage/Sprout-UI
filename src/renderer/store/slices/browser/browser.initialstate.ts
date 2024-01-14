import { HistoryEntry } from ".";

export default {
  history: [] as HistoryEntry[],
  historyIndex: -1,
  defaultPage: {
    url: 'http://duckduckgo.com',
    title: '',
    pageState: {},
    timeStamp: '',
  },
};
