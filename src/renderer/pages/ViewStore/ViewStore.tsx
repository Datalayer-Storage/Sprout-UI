import React, {useCallback} from "react";
import {DatalayerStoreKeysTable} from "@/components";
import {visitPage} from "@/store/slices/browser";
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ViewStore: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ownedStores } = useGetOwnedStoresQuery({});
  const fallbackStoreProvider = useSelector(
    (state: any) => state.userOptions.fallbackStoreProvider
  );
  const storeID: string = 'todo'

  const handleViewKeyData = useCallback((key: string) => {
    if (storeID) {
      const dataPage: string = 'chia://' + storeID + '/' + key;
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
  }, [ownedStores, fallbackStoreProvider, navigate, dispatch]);

  return (
    <DatalayerStoreKeysTable onViewKeyData={handleViewKeyData}/>
  );
}

export { ViewStore };
