import React, {useRef} from "react";
import {Modal, Button, Tooltip, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ConfirmCreateStoreModalProps {
  storeId: string;
  onClose: () => void;
}

const AddMirrorModal: React.FC<ConfirmCreateStoreModalProps> = ({onClose}: ConfirmCreateStoreModalProps) => {

  const mirrorURLInputRef = useRef<HTMLInputElement>(null);
  const mirrorValueInputRef = useRef<HTMLInputElement>(null);
  const accept = () => {
    onClose()
  }

  const cancel = () => {onClose()}

  return (
    <Modal show={true} dismissible={true} onClose={cancel}>
      <Modal.Header >
        <FormattedMessage id="add-store-mirror"/>
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
              <p>
                <FormattedMessage id={"mirror-url"}/>
              </p>
            </div>
            <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
              <TextInput ref={mirrorURLInputRef}/>
            </div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{
              display: "flex",
              flexDirection: 'column',
              justifyContent: 'center',
              inlineSize: 'min-content',
              whiteSpace: 'nowrap'
            }}>
              <Tooltip content={<FormattedMessage id={"a-higher-value-gives-the-mirror-more-validity"}/>}>
                <p>
                  <FormattedMessage id={"mirror-coin-value"}/>
                </p>
              </Tooltip>
            </div>
            <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
              <TextInput ref={mirrorValueInputRef}/>
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id="this-action-will-incur-a-non-refundable-fee-of"/>
            {" " + 0.01 + " "}
            <FormattedMessage id="xch-in-addition-to-standard-chia-blockchain-fees"/>
            {', '}
            <FormattedMessage id={"and"}/>
            {' '}
            <FormattedMessage id={"create-a-mirror-coin-with-the-specified-value"}/>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="add-store-mirror"/>
        </Button>
        <Button color="gray" onClick={cancel}>
          <FormattedMessage id="cancel"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export {AddMirrorModal}