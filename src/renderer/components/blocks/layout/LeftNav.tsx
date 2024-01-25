import { useCallback } from 'react';
import { Sidebar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { 
  HiOutlineArrowLeft, 
  HiOutlineArrowRight, 
  HiChartPie,
  HiGlobeAlt,
  HiArchive
} from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ROUTES from '@/routes/route-constants';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leftNavExpanded, setLeftNavExpanded] = useState<boolean>(true);
  const buttonArrowSize: string = "h-3 w-3";

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location],
  );
  
  const handleToggleLeftNav = useCallback(
    () => {
      if (leftNavExpanded){
        setLeftNavExpanded(() => false);
      }else{
        setLeftNavExpanded(() => true);
      }
    },
    [leftNavExpanded]
  );

  const expandedLeftNav = () => {
    return (
      <div
        className={`bg-white`}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      >
        <Sidebar aria-label="App Navigation">
          <ButtonContainer>
            <Button pill color="light" onClick={handleToggleLeftNav}>
              <HiOutlineArrowLeft className={buttonArrowSize}/>
            </Button>
          </ButtonContainer>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.BROWSER)}
                onClick={() => navigate(ROUTES.BROWSER)}
                icon={HiGlobeAlt}
              >
                <FormattedMessage id="browser"/>
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.SETTINGS)}
                onClick={() => navigate(ROUTES.SETTINGS)}
                icon={IoSettingsOutline}
              >
                <FormattedMessage id="settings"/>
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.MY_STORE)}
                onClick={() => navigate(ROUTES.MY_STORE)}
                icon={HiArchive}
              >
                <FormattedMessage id="my-store"/>
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.APP_DEFAULT)}
                onClick={() => navigate(ROUTES.APP_DEFAULT)}
                icon={HiChartPie}
              >
                <FormattedMessage id="app-default"/>
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.HELLO_2)}
                onClick={() => navigate(ROUTES.HELLO_2)}
                icon={HiChartPie}
              >
                <FormattedMessage id="hello-2"/>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    );
  }
  
  const collapsedLeftNav = () => {
    return (
      <div
        className={`bg-white`}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      >

        <Sidebar style={{width:75}} aria-label="App Navigation">
          <ButtonContainer>
            <Button pill color="light" onClick={handleToggleLeftNav}>
              <HiOutlineArrowRight className={buttonArrowSize}/>
            </Button>
          </ButtonContainer>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.BROWSER)}
                onClick={() => navigate(ROUTES.BROWSER)}
              >
                <HiGlobeAlt />
              </Sidebar.Item>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.SETTINGS)}
                onClick={() => navigate(ROUTES.SETTINGS)}
              >
                <IoSettingsOutline />
              </Sidebar.Item>

              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.MY_STORE)}
                onClick={() => navigate(ROUTES.MY_STORE)}
              >
                <HiArchive/>
              </Sidebar.Item>

              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.APP_DEFAULT)}
                onClick={() => navigate(ROUTES.APP_DEFAULT)}
              >
                <HiChartPie />
              </Sidebar.Item>
              
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.HELLO_2)}
                onClick={() => navigate(ROUTES.HELLO_2)}
              >
                <HiChartPie />
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    );
  }

  if (leftNavExpanded){
    return expandedLeftNav();
  }else{
    return collapsedLeftNav();
  }
};

export { LeftNav };
