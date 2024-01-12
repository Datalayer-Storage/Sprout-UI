import { noop } from 'lodash';
import React, { useCallback } from 'react';
import Styled from 'styled-components';
import { Button, Navbar } from 'flowbite-react';
import { 
  HiHome,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiRefresh
} from 'react-icons/hi';

/*
const NavButtonBox = Styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;
*/

interface BackButton {
  onClick: () => void;
}

const BackButton: React.FC<BackButton> = ({onClick}) => { 
  return (
    <Button onClick={onClick}>
      <HiChevronDoubleLeft/>
    </Button>
  );
}

interface ForwardButton {
  onClick: () => void;
}

const ForwardButton: React.FC<ForwardButton> = ({onClick}) => { 
  return (
    <Button onClick={onClick}>
      <HiChevronDoubleRight/>
    </Button>
  );
}

interface NavigationBarProps {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  onEnterDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  value,
  onChange,
  onRefresh,
  onBack,
  onForward,
  onHome,
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
      <Navbar>
        <Button onClick={onHome}>
          <HiHome/>
        </Button>
        <Button.Group>
          <BackButton onClick={onBack}/>
        <ForwardButton onClick={onForward}/>
        </Button.Group>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleOnEnterKeyDown}
        />
        <Button onClick={onRefresh}>
          <HiRefresh/>
        </Button>
      </Navbar>
    </>
  );
};

export { NavigationBar }