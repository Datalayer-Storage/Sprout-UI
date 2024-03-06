import React, {useState} from "react";
import {Modal, Button, Tooltip, TextInput, Spinner} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {updateStoreMirror} from "@/store/slices/app";
import {useAddMirrorMutation} from "@/api/ipc/datalayer";

interface ConfirmCreateStoreModalProps {
  storeId: string;
  onClose: () => void;
}

const AddMirrorModal: React.FC<ConfirmCreateStoreModalProps> =
  ({storeId, onClose}: ConfirmCreateStoreModalProps) => {

  const [triggerAddMirror, {data: addMirrorData, isLoading: addMirrorMutationLoading}] = useAddMirrorMutation();
  const dispatch = useDispatch();
  const userOptions = useSelector((state: any) => state.userOptions);
  const deployOptions = userOptions.deployOptions;
  const [mirrorURL, setMirrorURL] = useState<string>('');
  const [mirrorCoinValue, setMirrorCoinValue] = useState<string>(deployOptions?.defaultFee || '');
  const [enableMirrorURLError, setEnableMirrorURLError] = useState<boolean>(false);
  const [enableMirrorValueError, setEnableMirrorValueError] = useState<boolean>(false);

  if (addMirrorData?.success){
    dispatch(updateStoreMirror({storeId, url: mirrorURL}));
    onClose();
  }

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableMirrorURLError(false);
    setMirrorURL(event.target.value);
  };

  const handleCoinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableMirrorValueError(false);
    setMirrorCoinValue(event.target.value);
  };

  const accept = () => {
    setEnableMirrorURLError(true);
    setEnableMirrorValueError(true);
    if (mirrorURL && mirrorCoinValue){
      triggerAddMirror({
        id: storeId,
        urls: [mirrorURL],
        amount: parseInt(mirrorCoinValue),
        fee: deployOptions.defaultFee
      });
    }
  }

  const cancel = () => {onClose()}

  return (
    <Modal
      show={true}
      dismissible={!addMirrorMutationLoading}
      onClose={cancel}
      size={"3xl"}
    >
      <Modal.Header >
        <FormattedMessage id="add-store-mirror"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id={"store-id"}/>{": " + storeId}
          </p>
          <div>
            {
              enableMirrorURLError && !mirrorURL &&
              <p className="text-base leading-relaxed text-red-600">
                <FormattedMessage id={"mirror-url-cannot-be-empty"}/>.
              </p>
            }
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
                <TextInput onChange={handleURLChange} value={mirrorURL}/>
              </div>
            </div>
          </div>
          <div>
            {
              enableMirrorValueError && !mirrorCoinValue &&
              <p className="text-base leading-relaxed text-red-600">
                <FormattedMessage id={"mirror-coin-value-cannot-be-empty"}/>.
              </p>
            }
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
                <TextInput onChange={handleCoinValueChange} value={mirrorCoinValue} type={'number'}/>
              </div>
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
            {'.'}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={accept}>
          <FormattedMessage id="add-store-mirror"/>
          {addMirrorMutationLoading && <Spinner className={"ml-2"} size={"sm"}/>}
        </Button>
        <Button color="gray" onClick={cancel} disabled={addMirrorMutationLoading}>
          <FormattedMessage id="cancel"/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export {AddMirrorModal}