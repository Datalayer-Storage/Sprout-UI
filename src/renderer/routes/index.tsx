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

const AppNavigator: React.FC = () => {

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
              path={ROUTES.APP_DEFAULT} 
              element={<Pages.AppDefault />} 
            />
            <Route
              path={ROUTES.MY_STORE}
              element={<Pages.MyStore/>}
            />
            <Route
              path={ROUTES.HELLO_2}
              element={<Pages.Hello2 />}
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.APP_DEFAULT} />}
            />
          </Route>  
        </Routes>
      </Router>
    </>
  );
};

export { AppNavigator };