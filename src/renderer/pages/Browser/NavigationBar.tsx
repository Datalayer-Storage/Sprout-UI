import { noop } from 'lodash';
import React, { useCallback } from 'react';
import Styled from 'styled-components';
import { Button } from 'flowbite-react';

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
        <Button style={{ margin: 10 }} color="light" onClick={onBack}>
          Back
        </Button>
        <Button style={{ margin: 10 }} color="light" onClick={onForward}>
          Forward
        </Button>
        <Button style={{ margin: 10 }} color="light" onClick={onRefresh}>
          Refresh
        </Button>
        <Button style={{ margin: 10 }} color="light">
          Home
        </Button>
        <input
          type="text"
          style={{ width: '100%', margin: 10, borderRadius: 5 }}
          value={value}
          onChange={onChange}
          onKeyDown={handleOnEnterKeyDown}
        />
      </NavBarBox>
    </>
  );
};

export { NavigationBar }