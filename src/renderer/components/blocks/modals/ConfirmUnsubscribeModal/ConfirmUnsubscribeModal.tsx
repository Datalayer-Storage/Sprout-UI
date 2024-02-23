import React from "react";
import { Modal, Button } from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ConfirmUnsubscribeModalProps {
  showModal: boolean;
  storeId: string;
  onUnsubscribe: (storeId: string) => void;
  onClose: () => void;
}

const ConfirmUnsubscribeModal: React.FC<ConfirmUnsubscribeModalProps> = (
  {showModal, storeId, onUnsubscribe, onClose}: ConfirmUnsubscribeModalProps) => {

  const accept = () => {
    onUnsubscribe(storeId);
    onClose();
  }

  return (
    <Modal show={showModal} dismissible={false} onClose={onClose}>
      <Modal.Header >
        <FormattedMessage id="important"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="unsubscribing-from-this-store-will-remove-its-associated-data-from-this-device"/>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage
                id="this-subscription-will-appear-in-your-subscriptions-list-until-all-of-its-local-data-has-been-removed"
              />
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="store-id"/>: {storeId}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="do-you-want-to-unsubscribe-from-this-store?"/>
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="yes-unsubscribe"/>
        </Button>
        <Button color="gray" onClick={onClose}>
          <FormattedMessage id="cancel"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ConfirmUnsubscribeModal }