import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from 'react-router-dom';
import ROUTES from './route-constants'
import * as Pages from '@/pages'
import { Template } from '@/components';
//import { Spinner } from 'flowbite-react';
//import { useIsLicenseValidQuery } from '@/api/ipc/license';
//import { useSelector } from 'react-redux';

const AppNavigator: React.FC = () => {
 /* const userOptions = useSelector((state: any) => state.userOptions);
  const { data: isLicensed, isLoading } = useIsLicenseValidQuery(
    {
      accessKey: userOptions.accessKey,
      accessSecret: userOptions.accessSecret,
    },
    {
      pollingInterval: 1000 * 60 * 60, // 1 hour
    },
  );

  console.log('isLicensed', isLicensed, 'isLoading', isLoading)

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLicensed.valid) {
    return (
      <Router>
        <Routes>
          <Route // remove trailing slash
            path="*(/+)"
            loader={({ params }) => redirect(params['*'] || '/')}
          />
          <Route path={ROUTES.LICENSE} element={<Pages.License />} />
          <Route path="*" element={<Navigate replace to={ROUTES.LICENSE} />} />
        </Routes>
      </Router>
    );
  }*/

  return (
    <>
      <Router>
        <Routes>
          <Route // remove trailing slash
            path="*(/+)"
            loader={({ params }) => redirect(params['*'] || '/')}
          />
          <Route path="" element={<Template/>}>
            <Route
              path="/"
              element={<Navigate to={ROUTES.BROWSER} />}
            />
            <Route
              path={ROUTES.BROWSER}
              element={<Pages.Browser/>}
            />
            <Route
              path={ROUTES.SETTINGS}
              element={<Pages.Settings/>}
            />
            <Route
              path={ROUTES.MY_STORES}
              element={<Pages.MyStores/>}
            />
            <Route
              path={ROUTES.EDIT_STORE}
              element={<Pages.EditStore/>}
            />
            <Route
              path={ROUTES.VIEW_STORE}
              element={<Pages.ViewStore/>}
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.BROWSER} />}
            />
          </Route>  
        </Routes>
      </Router>
    </>
  );
};

export { AppNavigator };