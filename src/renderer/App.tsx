import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';
import { loadLocaleData } from '@/translations';
import "@/App.css";
import { AppNavigator } from "@/routes";
import { setLocale } from '@/store/slices/app';
import { IndeterminateProgressOverlay } from '@/components/layout/IndeterminateProgressOverlay';
import { taskCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {

  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);
  const [translationTokens, setTranslationTokens] = useState<Object>();

  useEffect(() => {
    if (appStore.locale) {
      const processTranslationTokens = async () => {
        setTranslationTokens(await loadLocaleData(appStore.locale));
      };

      processTranslationTokens();
    } else {
      dispatch(setLocale(navigator.language));
    }
  }, [appStore.locale]);

  if (!translationTokens) {
    return <IndeterminateProgressOverlay />;
  }

  return (
  <div style={{height: '100%'}}> 
    <IntlProvider
      locale="en"
      defaultLocale="en"
      //@ts-ignore
      messages={translationTokens.default}
    >
      <AppNavigator/>
    </IntlProvider>
    
  </div>
  );
}

export default App;
