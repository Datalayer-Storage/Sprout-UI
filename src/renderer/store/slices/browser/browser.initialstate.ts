import { HistoryEntry } from ".";

export default {
  history: [] as HistoryEntry[],
  historyIndex: -1,
  defaultPage: {
    url: 'http://google.com',
    title: '',
    pageState: {},
    timeStamp: '',
  },
};
