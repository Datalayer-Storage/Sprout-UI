import React from "react";
import { Modal, Button } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface CreateStoreSuccessModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onCreateStore: () => void;
}

const ConfirmCreateStoreModal: React.FC<CreateStoreSuccessModalProps> = (props: CreateStoreSuccessModalProps) => {

  const { showModal, setShowModal, onCreateStore } = props;

  const accept = () => {
    setShowModal(false);
    onCreateStore();
  }

  const cancel = () => {
    setShowModal(false);
  }

  return (
    <Modal show={showModal} dismissible={false} onClose={cancel}>
      <Modal.Header >
        <FormattedMessage id="important"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="creating-a-store-is-a-permanent-action-that-cannot-be-un-done!"/>
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="do-you-want-to-proceed-with-store-creation?"/>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="yes-create-store"/>
        </Button>
        <Button color="gray" onClick={cancel}>
          <FormattedMessage id="no-cancel-store-creation"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmCreateStoreModal }