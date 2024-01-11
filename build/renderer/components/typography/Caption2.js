import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const Content = styled('span') `
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  color: ${(props) => props.color || props.theme.surface.slot1.text.hex};
`;
const Caption2 = ({ children, style, color }) => _jsx(Content, { color: color, style: style, children: children });
export { Caption2 };
