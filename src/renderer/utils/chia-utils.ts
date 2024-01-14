export const transformToHttpProtocal = (url) => {
  return url.replace(/chia:\/\//, 'http://localhost:41411/');
};

export const transformToChiaProtocol = (url) => {
  return url.replace('http://localhost:41411/', "chia://");
};
