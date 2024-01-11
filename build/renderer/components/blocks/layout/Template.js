import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorBoundary } from '@/pages';
import { LeftNav } from './LeftNav';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
const AppContainer = styled.div `
  width: 100%;
  height: 100%;
`;
const BodyContainer = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
`;
const LeftNavAside = styled('aside') `
  width: 270px;
  height: 100%;
`;
const ContentContainer = styled.div `
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;
const Template = () => {
    return (_jsx(ErrorBoundary, { children: _jsx(_Fragment, { children: _jsx(AppContainer, { id: "app", children: _jsxs(BodyContainer, { id: "body", children: [_jsx(LeftNavAside, { children: _jsx(LeftNav, {}) }), _jsx(ContentContainer, { id: "content", children: _jsx(_Fragment, { children: _jsx("div", { style: { height: '100%', overflowY: 'auto' }, children: _jsx(ErrorBoundary, { children: _jsx(Outlet, {}) }) }) }) })] }) }) }) }));
};
export { Template };
