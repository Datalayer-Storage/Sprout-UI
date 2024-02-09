import React, {useCallback} from "react";
import { Modal } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface DeployFolderErrorModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMsg: string) => void;
}

const DeployFolderErrorModal: React.FC<DeployFolderErrorModalProps> = (
  { showModal, setShowModal, errorMessage, setErrorMessage}: DeployFolderErrorModalProps) => {

  const handleClose = useCallback(() => {
    setShowModal(false);
    setErrorMessage('');
  }, []);

  return (
    <Modal show={showModal} onClose={handleClose}>
      <Modal.Header>
        <FormattedMessage id="cannot-deploy-folder"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {errorMessage}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { DeployFolderErrorModal };