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
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  value,
  onChange,
  onRefresh,
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