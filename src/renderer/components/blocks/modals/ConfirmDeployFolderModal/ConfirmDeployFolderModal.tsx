import React from "react";
import { Modal, Button } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ConfirmDeployFolderProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onDeployFolder: () => void;
}

const ConfirmDeployFolderModal: React.FC<ConfirmDeployFolderProps> = (
  {showModal, setShowModal, onDeployFolder}: ConfirmDeployFolderProps) => {

  const accept = () => {
    setShowModal(false);
    onDeployFolder();
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
            <FormattedMessage
              id="this-action-will-incur-a-non-refundable-fee-of-0.01-xch-in-addition-to-standard-chia-blockchain-fees"
            />
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="do-you-want-to-proceed-with-folder-deploy?"/>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="yes-deploy-folder"/>
        </Button>
        <Button color="gray" onClick={cancel}>
          <FormattedMessage id="no-cancel-deploy"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmDeployFolderModal }