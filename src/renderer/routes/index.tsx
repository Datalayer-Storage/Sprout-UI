import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from 'react-router-dom';
import ROUTES from './route-constants'
import * as Pages from '../pages'
import { Template } from '../components/blocks/layout/Template';

const AppNavigator: React.FC = () => {
  
  //TODO: copy over src/components/blocks/layout/Template.jsx

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
              path={ROUTES.APP_DEFAULT} 
              element={<Pages.AppDefault />} 
            />
            <Route
              path={ROUTES.HELLO_1}
              element={<Pages.Hello1 />}
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