import React, {useCallback, useState} from "react";
import {CreateDlStoreButton, OwnedStoresTable} from "@/components";
import {setSelectedStoreId} from "@/store/slices/myDatalayerStore";
import {useDispatch} from "react-redux";


const SelectDlStore: React.FC = () => {

  const dispatch = useDispatch();
  const [storeTableContentsLoaded, setStoreTableContentsLoaded] = useState<boolean>(false);

  const handleStoreSelected = useCallback((storeId: string) => {
    console.log("selected storeId:", storeId);
    dispatch(setSelectedStoreId(storeId));
  }, [dispatch]);

  return (
    <>
      { (storeTableContentsLoaded) ? <CreateDlStoreButton/> : <></> }
      <OwnedStoresTable setTableContentsLoaded={setStoreTableContentsLoaded} handleStoreSelected={handleStoreSelected}/>
    </>
  );
}

export { SelectDlStore }