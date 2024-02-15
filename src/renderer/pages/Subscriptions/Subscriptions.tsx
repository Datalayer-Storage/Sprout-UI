import React, {useMemo} from "react";
// import {FormattedMessage} from "react-intl";
//import {useDispatch, useSelector} from "react-redux";
//import {useLocation, useNavigate} from "react-router-dom";
//import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
//import {visitPage} from "@/store/slices/browser";
import {DataTable} from "@/components";

const Subscriptions: React.FC = () => {
  /*
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ownedStores } = useGetOwnedStoresQuery({});
  const fallbackStoreProvider = useSelector(
    (state: any) => state.userOptions.fallbackStoreProvider
  );
  const location = useLocation();
  const storeId = location.state?.storeId;

  const handleViewKeyData = useCallback((key: string) => {
    if (storeId) {
      const dataPage: string = 'chia://' + storeId + '/' + key;
      console.log('chia url: ', dataPage);
      dispatch(
        visitPage({
          page: { url: dataPage },
          fallbackStoreProvider,
          ownedStores,
        }),
      );
      navigate('/browser');
      console.log('viewing store in browser');
    }
  }, [storeId, dispatch, fallbackStoreProvider, ownedStores, navigate]);

   */

  /*
  const { data, isLoading, error, refetch } = useGetSubscriptionsQuery({});

  if (error) {
    console.error('Error fetching subscriptions:', error);
  }

   */

  const columns = useMemo(() => [
    {
      title: 'test column',
      key: 'test',
    }
  ], []);

  const data = [{test: "foobar"}]

  return (
    <>
      <DataTable columns={columns} data={data} isLoading={false}/>
    </>
  );
}

export {Subscriptions}