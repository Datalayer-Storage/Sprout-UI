import {Modal} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {SetStoreLabel} from "@/components";

interface SetStoreLabelModalProps {
  storeId: string;
  setStoreId: (storeId: string) => void;
}

const SetStoreLabelModal: React.FC<SetStoreLabelModalProps> = ({storeId, setStoreId }) => {

  const [showModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (storeId) {
      setOpenModal(true);
    }else{
      setOpenModal(false);
    }
  }, [storeId]);

  return (
    <Modal show={showModal} onClose={() => setStoreId('')} size="3xl">
      <Modal.Header>
        <FormattedMessage id="set-store-label"/>
      </Modal.Header>
      <Modal.Body>
        <SetStoreLabel storeId={storeId}/>
      </Modal.Body>
    </Modal>
  );
}

export {SetStoreLabelModal}
