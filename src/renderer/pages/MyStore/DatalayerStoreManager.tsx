import React, {useCallback, useState} from "react";
import {CreateDlStoreButton, OwnedStoresTable, Spacer} from "@/components";
import {setStoreIdToEdit, setStoreIdToView} from "@/store/slices/myDatalayerStore";
import {useDispatch} from "react-redux";

const DatalayerStoreManager: React.FC = () => {
  const dispatch = useDispatch();
  const [storeTableContentsLoaded, setStoreTableContentsLoaded] = useState<boolean>(false);

  const handleEditStore = useCallback((storeId: string) => {
    dispatch(setStoreIdToEdit(storeId));
  }, [dispatch]);

  const handleViewStore = useCallback((storeId: string) => {
    console.log("handle view store");
    dispatch(setStoreIdToView(storeId));
  }, [dispatch]);

  return (
    <>
      { storeTableContentsLoaded &&
        <>
          <CreateDlStoreButton/>
          <Spacer size={10}/>
        </>
      }
      <OwnedStoresTable
        setTableContentsLoaded={setStoreTableContentsLoaded}
        handleEditStore={handleEditStore}
        handleViewStore={handleViewStore}
      />
    </>
  );
}

export { DatalayerStoreManager };