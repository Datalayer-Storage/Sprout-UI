import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';
import { loadLocaleData } from '@/translations';
import "@/App.css";
import { AppNavigator } from "@/routes";
import { setLocale } from '@/store/slices/app';
import { IndeterminateProgressOverlay } from '@/components/layout/IndeterminateProgressOverlay';
/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {
    const dispatch = useDispatch();
    const appStore = useSelector((state) => state.app);
    const [translationTokens, setTranslationTokens] = useState();
    useEffect(() => {
        if (appStore.locale) {
            const processTranslationTokens = async () => {
                setTranslationTokens(await loadLocaleData(appStore.locale));
            };
            processTranslationTokens();
        }
        else {
            dispatch(setLocale(navigator.language));
        }
    }, [appStore.locale]);
    if (!translationTokens) {
        return _jsx(IndeterminateProgressOverlay, {});
    }
    return (_jsx("div", { style: { height: '100%' }, children: _jsx(IntlProvider, { locale: appStore.locale, defaultLocale: "en", 
            //@ts-ignore
            messages: translationTokens.default, children: _jsx(AppNavigator, {}) }) }));
}
export default App;
