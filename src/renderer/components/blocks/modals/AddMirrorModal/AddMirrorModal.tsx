import React, {useEffect, useState} from "react";
import {Button, Modal, Spinner, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {addStoreMirror} from "@/store/slices/app";
import {useAddMirrorMutation} from "@/api/ipc/datalayer";
import {useGetUserIpQuery} from "@/api";
import {useGetWalletBalanceImmediateMutation} from "@/api/ipc/wallet";
import {WalletBalanceInsufficientErrorModal} from "@/components";

interface ConfirmCreateStoreModalProps {
  storeId: string;
  onClose: () => void;
}

const AddMirrorModal: React.FC<ConfirmCreateStoreModalProps> = ({storeId, onClose}: ConfirmCreateStoreModalProps) => {

  const [triggerAddMirror, {data: addMirrorData, isLoading: addMirrorMutationLoading}] = useAddMirrorMutation();
  const {data: getIpData, isLoading: getUserIpLoading} = useGetUserIpQuery({});
  const [triggerGetWalletBalance, {
    data: getWalletBalanceData,
    isLoading: getWalletBalanceLoading
  }] = useGetWalletBalanceImmediateMutation();

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const [mirrorURL, setMirrorURL] = useState<string>('');
  const [mirrorCoinValue, setMirrorCoinValue] = useState<string>('');
  const [showInvalidUrlError, setShowInvalidUrlError] = useState<boolean>(false);
  const [urlChanged, setUrlChanged] = useState<boolean>(true);
  const [placeholderUrl, setPlaceHolderUrl] = useState<string>('https://duckduckgo.com');
  const [showInsufficientBalanceModal, setShowInsufficentBalanceModal] = useState<boolean>(false);
  const [addMirrorClicked, setAddMirrorClicked] = useState<boolean>(false);

  useEffect(() => {
    if (getIpData?.success && !getUserIpLoading){
      setPlaceHolderUrl('https://' + getIpData.ip_address + ':8575');
    }
  }, [getUserIpLoading, getIpData]);

  useEffect(() => {
    if (addMirrorData?.success) {
      if (mirrorURL){
        dispatch(addStoreMirror({storeId, url: mirrorURL}));
      } else {
        dispatch(addStoreMirror({storeId, url: placeholderUrl}));
      }

      onClose();
    }
  }, [dispatch, addMirrorData?.success, storeId, mirrorURL, onClose, placeholderUrl]);

  useEffect(() => {
    if (getWalletBalanceData?.success && !getWalletBalanceLoading && addMirrorClicked){

      const walletBalance = getWalletBalanceData?.wallet_balance?.spendable_balance;
      const requiredWalletBalance: number = mirrorCoinValue ?
        parseInt(deployOptions.defaultFee) + parseInt(mirrorCoinValue) :
        parseInt(deployOptions.defaultFee) + parseInt(deployOptions.defaultMirrorCoinAmount);

      console.log('@@@@@@ required', requiredWalletBalance, '%%%%%%%%% available', walletBalance);

      if (walletBalance < requiredWalletBalance){
        setShowInsufficentBalanceModal(true);
        setAddMirrorClicked(false);
        return;
      }

      if (!showInvalidUrlError && mirrorURL && mirrorCoinValue) {
        triggerAddMirror({
          id: storeId,
          urls: [mirrorURL],
          amount: parseInt(mirrorCoinValue),
          fee: deployOptions.defaultFee
        });
      } else if (!showInvalidUrlError && mirrorURL && !mirrorCoinValue) {
        triggerAddMirror({
          id: storeId,
          urls: [mirrorURL],
          amount: deployOptions.defaultMirrorCoinAmount,
          fee: deployOptions.defaultFee
        });
      } else if (!showInvalidUrlError && !mirrorURL && mirrorCoinValue) {
        triggerAddMirror({
          id: storeId,
          urls: [placeholderUrl],
          amount: parseInt(mirrorCoinValue),
          fee: deployOptions.defaultFee
        });
      } else if (!showInvalidUrlError) {
        triggerAddMirror({
          id: storeId,
          urls: [placeholderUrl],
          amount: deployOptions.defaultMirrorCoinAmount,
          fee: deployOptions.defaultFee
        });
      }
    }
  }, [addMirrorClicked, deployOptions.defaultFee, getWalletBalanceData?.success,
    getWalletBalanceData?.wallet_balance, getWalletBalanceLoading, mirrorCoinValue, mirrorURL,
    placeholderUrl, showInvalidUrlError, storeId, triggerAddMirror, deployOptions.defaultMirrorCoinAmount,
  ]);

  // Regex to check if the string is a valid URL
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlChanged(true);
    setShowInvalidUrlError(!urlPattern.test(event.target.value));
    setMirrorURL(event.target.value);
  };

  const handleCoinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMirrorCoinValue(event.target.value);
  };

  const accept = () => {
    setUrlChanged(false);
    setAddMirrorClicked(true);
    triggerGetWalletBalance({});
  }

  const cancel = () => {
    onClose()
  }

  return (
    <Modal
      show={true}
      dismissible={!addMirrorMutationLoading}
      onClose={cancel}
      size={"3xl"}
    >
      <Modal.Header>
        <FormattedMessage id="add-store-mirror"/>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id={"store-id"}/>{": " + storeId}
          </p>
          <div>
            {showInvalidUrlError && !urlChanged && <p className="text-base leading-relaxed text-red-600">
              <FormattedMessage id={"please-enter-a-valid-url"}/>
            </p>}
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
                <TextInput
                  onChange={handleURLChange}
                  value={mirrorURL}
                  placeholder={placeholderUrl}
                />
              </div>
            </div>
          </div>
          <div>
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
                <TextInput
                  onChange={handleCoinValueChange}
                  value={mirrorCoinValue}
                  type={'number'}
                  placeholder={deployOptions?.defaultMirrorCoinAmount || 0}
                />
              </div>
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <FormattedMessage id={"important"}/>
            {': '}
            <FormattedMessage id={"unchanged-fields-will-default-to-currently-displayed-values"}/>.
          </p>
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
      <WalletBalanceInsufficientErrorModal
        showModal={showInsufficientBalanceModal}
        setShowModal={setShowInsufficentBalanceModal}
      />
    </Modal>
  );
}

export {AddMirrorModal}