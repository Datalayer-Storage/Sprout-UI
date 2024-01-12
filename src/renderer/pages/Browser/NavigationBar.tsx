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
  onEnterDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const NavigationBar: React.FC<NavigationBarProps> = ({value, onChange, onEnterDown = noop}) => {
  
  const handleOnEnterKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('##', event.key);
    if (event.key === 'Enter') {
      console.log('@@')
      onEnterDown();
    }
  }, [onEnterDown]);
  
  return (
    <>
      <NavBarBox>
        <input 
          type="text" 
          value={value} 
          onChange={onChange} 
          onKeyDown={handleOnEnterKeyDown}
        />
      </NavBarBox>
    </>
  );
}

export { NavigationBar }