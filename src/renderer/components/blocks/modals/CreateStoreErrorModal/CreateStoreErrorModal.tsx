import React from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface CreateStoreErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const CreatStoreErrorModal: React.FC<CreateStoreErrorModalProps> = (props: CreateStoreErrorModalProps) => {

  const { showModal, setShowModal } = props;

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <FormattedMessage id="error"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="unable-to-create-new-store"/>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { CreatStoreErrorModal };