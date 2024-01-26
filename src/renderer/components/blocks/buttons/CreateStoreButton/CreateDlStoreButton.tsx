import React, { useCallback, useState} from "react";
import { Button, Spinner } from "flowbite-react";
import { useCreateDataStoreMutation} from "@/api/ipc/datalayer";
import { FormattedMessage} from "react-intl";
import {  CreatStoreErrorModal, CreatStoreSuccessModal} from "@/components";
//import * as repl from "repl";


const CreateDlStoreButton: React.FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [triggerCreateDataStore, {isLoading}] = useCreateDataStoreMutation();

  const handleCreateDataStore = useCallback(async () => {
    const response: any = await triggerCreateDataStore({})
    console.log(response);

    if (response.success){
      setShowSuccessModal(true);
      setShowSuccessModal(false);
    }else{
      setShowErrorModal(false);
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
        <CreatStoreErrorModal showModal={showErrorModal} setShowModal={setShowErrorModal}/>
      </div>
    </>
  );
}

export { CreateDlStoreButton };