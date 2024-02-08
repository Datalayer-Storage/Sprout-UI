import React, {useCallback, useEffect} from "react";
import {DatalayerStoreKeysTable, SelectedStoreIdCard, Spacer} from "@/components";
import {visitPage} from "@/store/slices/browser";
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

const ViewStore: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ownedStores } = useGetOwnedStoresQuery({});
  const fallbackStoreProvider = useSelector(
    (state: any) => state.userOptions.fallbackStoreProvider
  );
  const location = useLocation();
  const storeId = location.state?.storeId;

  useEffect(() => {
    if (!storeId){
      console.error('ViewStore received invalid storeId:', storeId);
    }
  }, [storeId]);

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

  return (
    <>
      <SelectedStoreIdCard storeId={storeId} />
      <Spacer size={10} />
      <DatalayerStoreKeysTable onViewKeyData={handleViewKeyData}/>
    </>

  );
}

export { ViewStore };
