import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate, redirect, } from 'react-router-dom';
import ROUTES from './route-constants';
import * as Pages from '@/pages';
import { Template } from '@/components';
const AppNavigator = () => {
    //TODO: copy over src/components/blocks/layout/Template.jsx
    return (_jsx(_Fragment, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route // remove trailing slash
                    , { path: "*(/+)", loader: ({ params }) => redirect(params['*'] || '/') }), _jsxs(Route, { path: "", element: _jsx(Template, {}), children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: ROUTES.BROWSER }) }), _jsx(Route, { path: ROUTES.BROWSER, element: _jsx(Pages.Browser, {}) }), _jsx(Route, { path: ROUTES.APP_DEFAULT, element: _jsx(Pages.AppDefault, {}) }), _jsx(Route, { path: ROUTES.HELLO_1, element: _jsx(Pages.Hello1, {}) }), _jsx(Route, { path: ROUTES.HELLO_2, element: _jsx(Pages.Hello2, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { replace: true, to: ROUTES.APP_DEFAULT }) })] })] }) }) }));
};
export { AppNavigator };
