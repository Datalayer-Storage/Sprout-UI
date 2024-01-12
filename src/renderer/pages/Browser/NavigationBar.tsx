import { noop } from 'lodash';
import React, { useCallback } from 'react';
import Styled from 'styled-components';

const NavBarBox = Styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;

interface NavigationBarProps {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  onEnterDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  value,
  onChange,
  onRefresh,
  onBack,
  onForward,
  onEnterDown = noop,
}) => {
  const handleOnEnterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnterDown();
      }
    },
    [onEnterDown],
  );

  return (
    <>
      <NavBarBox>
        <button onClick={onBack}>Back</button>
        <button onClick={onForward}>Forward</button>
        <button onClick={onRefresh}>Refresh</button>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleOnEnterKeyDown}
        />
      </NavBarBox>
    </>
  );
};

export { NavigationBar }