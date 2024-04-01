import {Modal} from "flowbite-react";
import React from "react";
import {FormattedMessage} from "react-intl";
import {SetStoreLabel} from "@/components";

interface StoreSubscriptionSuccessModalProps {
  storeId: string;
  onClose: () => void;
}

const StoreSubscriptionSuccessModal: React.FC<StoreSubscriptionSuccessModalProps> =
  ({storeId, onClose }) => {

  return (
    <Modal show={true} onClose={onClose} size="3xl">
      <Modal.Header>
        <FormattedMessage id="store-subscription-successful"/>
      </Modal.Header>
      <Modal.Body>
        <div className={'space-y-6'}>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="additional-time-will-be-required-for-the-store-data-to-populate"/>.
          </p>
          <div className={'space-y-2'}>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="optionally-set-a-label-for-the-store-or-dismiss-this-modal"/>.
            </p>
            <SetStoreLabel storeId={storeId}/>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
  }

export {StoreSubscriptionSuccessModal}
