import React, {useCallback, useEffect, useState} from "react";
import {DatalayerStoreKeysTable, InvalidStoreIdError, SelectedStoreIdCard, Spacer} from "@/components";
import {visitPage} from "@/store/slices/browser";
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ROUTES from "@/routes/route-constants";

const ViewStore: React.FC = () => {

  const [showInvalidStoreIdModal, setShowInvalidStoreIdModal] = useState(false);
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
      setShowInvalidStoreIdModal(true);
    }
  }, [storeId]);

  const handleModalClose = useCallback(() => {
    navigate(ROUTES.MY_STORES);
  }, [navigate]);

  const handleViewKeyData = useCallback((key: string) => {
    if (storeId) {
      const dataPage: string = 'chia://' + storeId + '/' + key;
      dispatch(
        visitPage({
          page: { url: dataPage },
          fallbackStoreProvider,
          ownedStores,
        }),
      );
      navigate('/browser');
    }
  }, [storeId, dispatch, fallbackStoreProvider, ownedStores, navigate]);

  return (
    <>
      <SelectedStoreIdCard storeId={storeId} />
      <Spacer size={10} />
      <DatalayerStoreKeysTable onViewKeyData={handleViewKeyData}/>
      <InvalidStoreIdError
        showModal={showInvalidStoreIdModal}
        setShowModal={setShowInvalidStoreIdModal}
        onClose={handleModalClose}
      />
    </>
  );
}

export { ViewStore };
