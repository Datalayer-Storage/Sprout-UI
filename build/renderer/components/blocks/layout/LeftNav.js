import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Sidebar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiChartPie, HiGlobeAlt } from 'react-icons/hi';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ROUTES from '@/routes/route-constants';
import { useNavigate } from 'react-router-dom';
const ButtonContainer = styled('div') `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;
const LeftNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [leftNavExpanded, setLeftNavExpanded] = useState(true);
    const buttonArrowSize = "h-3 w-3";
    const isActive = useCallback((path) => {
        return location.pathname === path;
    }, [location]);
    const handleToggleLeftNav = useCallback(() => {
        if (leftNavExpanded) {
            setLeftNavExpanded(() => false);
        }
        else {
            setLeftNavExpanded(() => true);
        }
    }, [leftNavExpanded]);
    const expandedLeftNav = () => {
        return (_jsx("div", { className: `bg-white`, style: { width: '100%', height: '100%', overflow: 'auto' }, children: _jsxs(Sidebar, { "aria-label": "App Navigation", children: [_jsx(ButtonContainer, { children: _jsx(Button, { pill: true, color: "light", onClick: handleToggleLeftNav, children: _jsx(HiOutlineArrowLeft, { className: buttonArrowSize }) }) }), _jsx(Sidebar.Items, { children: _jsxs(Sidebar.ItemGroup, { children: [_jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.BROWSER), onClick: () => navigate(ROUTES.BROWSER), icon: HiGlobeAlt, children: _jsx(FormattedMessage, { id: "browser" }) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.APP_DEFAULT), onClick: () => navigate(ROUTES.APP_DEFAULT), icon: HiChartPie, children: _jsx(FormattedMessage, { id: "app-default" }) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.HELLO_1), onClick: () => navigate(ROUTES.HELLO_1), icon: HiChartPie, children: _jsx(FormattedMessage, { id: "hello-1" }) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.HELLO_2), onClick: () => navigate(ROUTES.HELLO_2), icon: HiChartPie, children: _jsx(FormattedMessage, { id: "hello-2" }) })] }) })] }) }));
    };
    const collapsedLeftNav = () => {
        return (_jsx("div", { className: `bg-white`, style: { width: '100%', height: '100%', overflow: 'auto' }, children: _jsxs(Sidebar, { style: { width: 75 }, "aria-label": "App Navigation", children: [_jsx(ButtonContainer, { children: _jsx(Button, { pill: true, color: "light", onClick: handleToggleLeftNav, children: _jsx(HiOutlineArrowRight, { className: buttonArrowSize }) }) }), _jsx(Sidebar.Items, { children: _jsxs(Sidebar.ItemGroup, { children: [_jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.BROWSER), onClick: () => navigate(ROUTES.BROWSER), children: _jsx(HiGlobeAlt, {}) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.APP_DEFAULT), onClick: () => navigate(ROUTES.APP_DEFAULT), children: _jsx(HiChartPie, {}) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.HELLO_1), onClick: () => navigate(ROUTES.HELLO_1), children: _jsx(HiChartPie, {}) }), _jsx(Sidebar.Item, { style: { cursor: 'pointer' }, active: isActive(ROUTES.HELLO_2), onClick: () => navigate(ROUTES.HELLO_2), children: _jsx(HiChartPie, {}) })] }) })] }) }));
    };
    if (leftNavExpanded) {
        return expandedLeftNav();
    }
    else {
        return collapsedLeftNav();
    }
};
export { LeftNav };
