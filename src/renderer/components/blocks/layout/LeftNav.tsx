//import { useCallback } from 'react';
import { withTheme } from 'styled-components';
import { Sidebar } from 'flowbite-react';
//import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ROUTES from '../../../routes/route-constants';
import { useNavigate } from 'react-router-dom';

//@ts-ignore todo: ask michael about this. michael if you see this, lets discuss it
const LeftNav = withTheme(({ theme }) => {
  const navigate = useNavigate();
  //const location = useLocation();

  /*
  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location],
  );
  */

  return (
    <div
      className={`bg-${theme.surface.slot1.background.class}`}
      style={{ width: '100%', height: 'calc(100% - 64px)', overflow: 'auto' }}
    >
      <Sidebar aria-label="App Navigation">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.APP_DEFAULT)}
              onClick={() => navigate(ROUTES.APP_DEFAULT)}
            >
              <FormattedMessage id="my-mirrors" />
            </Sidebar.Item>
            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.HELLO_1)}
              onClick={() => navigate(ROUTES.HELLO_1)}
            >
              <FormattedMessage id="private-mirrors" />
            </Sidebar.Item>

            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.HELLO_2)}
              onClick={() => navigate(ROUTES.HELLO_2)}
            >
              <FormattedMessage id="proxy" />
            </Sidebar.Item>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
});

export { LeftNav };
