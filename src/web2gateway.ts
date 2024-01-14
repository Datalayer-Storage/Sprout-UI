import gateway from 'chia-web2-gateway';

export const startWeb2Gateway = () => {
  // set from user settings
  //gateway.configure({...});
  gateway.start();
};