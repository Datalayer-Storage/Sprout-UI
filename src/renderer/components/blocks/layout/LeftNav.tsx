//import { useCallback } from 'react';
import { Sidebar } from 'flowbite-react';
//import { useLocation } from 'react-router-dom';
import ROUTES from '@/routes/route-constants';
import { useNavigate } from 'react-router-dom';

//@ts-ignore todo: ask michael about this. michael if you see this, lets discuss it
const LeftNav = () => {
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
      className={`bg-white`}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Sidebar aria-label="App Navigation">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.APP_DEFAULT)}
              onClick={() => navigate(ROUTES.APP_DEFAULT)}
            >
              App Default
            </Sidebar.Item>
            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.HELLO_1)}
              onClick={() => navigate(ROUTES.HELLO_1)}
            >
              Hello 1
            </Sidebar.Item>

            <Sidebar.Item
              style={{ cursor: 'pointer' }}
              //active={isActive(ROUTES.HELLO_2)}
              onClick={() => navigate(ROUTES.HELLO_2)}
            >
              Hello 2
            </Sidebar.Item>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export { LeftNav };
