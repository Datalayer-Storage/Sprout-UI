import React, {useCallback, useState} from "react";
import { Button, Spinner } from "flowbite-react";
import { useCreateDataStoreMutation} from "@/api/ipc/datalayer";
import { FormattedMessage} from "react-intl";
import {WalletNotSyncedErrorModal, CreatStoreSuccessModal, CreateStoreErrorModal} from "@/components";
//import {useGetSyncStatusMutation, useGetWalletBalanceMutation} from "@/api/ipc/wallet";

const CreateDlStoreButton: React.FC = () => {
  const [showNotSyncedModal, setShowNotSyncedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [triggerCreateDataStore, {isLoading}] = useCreateDataStoreMutation();

  const handleCreateDataStore = useCallback(async () => {
    const response: any = await triggerCreateDataStore({})
    console.log(response);

    if (response.success){
      setShowSuccessModal(true);
      setShowErrorModal(false)
    }else{
      setShowSuccessModal(false)
      setShowErrorModal(true);
    }
  }, [triggerCreateDataStore]);

  return (
    <>
      <div>
        <Button onClick={handleCreateDataStore}>
          {isLoading ? <Spinner/> : <span><FormattedMessage id="create-new-store"/></span>}
        </Button>
        <CreatStoreSuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal}/>
        <CreateStoreErrorModal showModal={showErrorModal} setShowModal={setShowErrorModal}/>
        <WalletNotSyncedErrorModal showModal={showNotSyncedModal} setShowModal={setShowNotSyncedModal}/>
      </div>
    </>
  );
}

export { CreateDlStoreButton };