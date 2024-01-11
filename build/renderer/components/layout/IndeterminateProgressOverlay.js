import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { Spinner } from 'flowbite-react';
const Container = styled('div') `
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IndeterminateProgressOverlay = ({ style = {} }) => (_jsx("div", { style: style, children: _jsx(Container, { children: _jsx(Spinner, { "aria-label": "Extra large spinner example", size: "xl" }) }) }));
export { IndeterminateProgressOverlay };
