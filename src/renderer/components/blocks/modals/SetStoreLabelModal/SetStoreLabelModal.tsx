import {Modal} from "flowbite-react";
import React from "react";
import {FormattedMessage} from "react-intl";
import {SetStoreLabel} from "@/components";

interface SetStoreLabelModalProps {
  showModal: boolean;
  storeId: string;
  onClose: () => void;
}

const SetStoreLabelModal: React.FC<SetStoreLabelModalProps> =
  ({showModal, storeId, onClose }) => {

  return (
    <Modal show={showModal} onClose={onClose} size="3xl">
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
