import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const _Spacer = styled.div `
  height: ${props => props.size}px;
  width: 100%;
`;
// devide by 2 since itll be be
// doubled for top and bottom margins
const Spacer = ({ children, size }) => (_jsx(_Spacer, { size: size, children: children }));
export { Spacer };
