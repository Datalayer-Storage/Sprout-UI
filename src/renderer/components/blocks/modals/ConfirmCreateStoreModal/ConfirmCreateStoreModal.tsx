import React, {ChangeEvent, useState} from "react";
import {Modal, Button, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ConfirmCreateStoreModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onCreateStore: (label: string) => void;
}

const ConfirmCreateStoreModal: React.FC<ConfirmCreateStoreModalProps> = (
  {showModal, setShowModal, onCreateStore}: ConfirmCreateStoreModalProps) => {

  const [storeLabelValue, setStoreLabelValue] = useState<string>('');

  const handleLabelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStoreLabelValue(event.target.value);
  }

  const accept = () => {
    setShowModal(false);
    onCreateStore(storeLabelValue);
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
          <div style={{display: "flex"}}>
            <div style={{
              display: "flex",
              flexDirection: 'column',
              justifyContent: 'center',
              inlineSize: 'min-content',
              whiteSpace: 'nowrap'
            }}>
              <Tooltip content={<FormattedMessage id={"label-of-the-store-once-its-created"}/>}>
                <p>
                  <FormattedMessage id={"store-label"}/>
                </p>
              </Tooltip>
            </div>
            <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
              <TextInput onChange={handleLabelInputChange}/>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="creating-a-store-is-a-permanent-action-that-cannot-be-un-done!"/>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <FormattedMessage id="this-action-will-incur-a-non-refundable-fee-of"/>
              {" " + 0.01 + " "}
              <FormattedMessage id="xch-in-addition-to-standard-chia-blockchain-fees"/>
              {'.'}
            </p>
          </div>
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

export {ConfirmCreateStoreModal}