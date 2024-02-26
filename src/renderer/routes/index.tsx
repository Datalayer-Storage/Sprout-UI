import React, {useCallback} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from 'react-router-dom';
import ROUTES from './route-constants'
import * as Pages from '@/pages'
import {ChiaNotAccessibleOnStartModal, IndeterminateProgressOverlay, Template} from '@/components';
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {useGetConfigQuery} from "@/api/ipc/wallet";
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

  const {
    data: datalayerResponse,
    isLoading: datalayerQueryLoading,
    error: datalayerQueryError,
    refetch: refetchDatalayerQuery,
  } = useGetOwnedStoresQuery({});
  const {
    isLoading: walletQueryLoading,
    error: walletQueryError,
    refetch: refetchWalletQuery
  } = useGetConfigQuery({wallet_id: 1});

  const loading: boolean = walletQueryLoading || datalayerQueryLoading;
  const chiaInaccessible = !datalayerResponse?.success || datalayerQueryError || walletQueryError;

  const handleRetry = useCallback(() => {
    refetchDatalayerQuery();
    refetchWalletQuery();
  }, [refetchDatalayerQuery, refetchWalletQuery])

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
              element={(loading) ? <IndeterminateProgressOverlay/> : <Navigate to={ROUTES.BROWSER}/>}
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
              path={ROUTES.SUBSCRIPTIONS}
              element={<Pages.Subscriptions/>}
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.BROWSER} />}
            />
          </Route>  
        </Routes>
        {chiaInaccessible && <ChiaNotAccessibleOnStartModal onRetry={handleRetry}/>}
      </Router>
    </>
  );
};

export { AppNavigator };