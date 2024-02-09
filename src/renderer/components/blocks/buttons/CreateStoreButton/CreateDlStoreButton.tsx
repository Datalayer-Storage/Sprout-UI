import React, { useCallback, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useCreateDataStoreMutation } from '@/api/ipc/datalayer';
import { FormattedMessage } from 'react-intl';
import {
  WalletNotSyncedErrorModal,
  SpendableCoinsInsufficientErrorModal,
  CreatStoreSuccessModal,
  CreateStoreErrorModal,
  WaitingForWalletSync, WalletBalanceInsufficientErrorModal,
} from '@/components';
import {
  useGetSpendableCoinsImmediateMutation,
  useGetSyncStatusImmediateMutation,
  useGetWalletBalanceMutation,
} from '@/api/ipc/wallet';
import { ipcApi } from '@/api/ipc';
import { ConfirmCreateStoreModal } from '@/components/blocks/modals/ConfirmCreateStoreModal';
import { useDispatch } from 'react-redux';
import {SpendableCoinRequest} from "chia-wallet";

const CreateDlStoreButton: React.FC = () => {
  const dispatch = useDispatch();
  const [showNotSyncedModal, setShowNotSyncedModal] = useState(false);
  const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] =
    useState(false);
  const [showSpendableCoinsInsufficientModal, setShowSpendableCoinsInsufficientModal] =
    useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmStoreCreationModal, setShowConfirmStoreCreationModal] =
    useState(false);
  const [showWaitingForWalletSyncModal, setShowWaitingForWalletSyncModal] =
    useState(false);

  const [createStoreErrorMsg, setCreateStoreErrorMsg] = useState('');

  const [triggerCreateDataStore, { isLoading: isStoreCreating}] =
    useCreateDataStoreMutation();
  const [triggerGetSyncStatus, { isLoading: isSyncStatusLoading }] =
    useGetSyncStatusImmediateMutation();
  const [triggerGetWalletBalance, { isLoading: isBalanceLoading }] =
    useGetWalletBalanceMutation();
  const [triggerGetSpendableCoinsImmediate] = useGetSpendableCoinsImmediateMutation();

  const handleCreateDataStore = useCallback(async () => {
    const syncStatusResponse = await triggerGetSyncStatus({});

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoinsResponse =
      await triggerGetSpendableCoinsImmediate(spendableCoinRequest);
    console.log('spendableCoinsResponse', spendableCoinsResponse);

    // @ts-ignore
    if (!(spendableCoinsResponse?.data?.confirmed_records?.length) ||
      // @ts-ignore
      spendableCoinsResponse?.data?.confirmed_records?.length < 1) {
      setShowSpendableCoinsInsufficientModal(true);
      return;
    }

    // @ts-ignore
    if (!syncStatusResponse?.data?.synced) {
      setShowNotSyncedModal(true);
      return;
    }

    const walletBalanceResponse = await triggerGetWalletBalance({});
    // @ts-ignore
    if (walletBalanceResponse?.data?.confirmed_wallet_balance > 0) {
      setShowInsufficientBalanceModal(true);
      return;
    }

    const createDataStoreResponse: any = await triggerCreateDataStore({});

    if (createDataStoreResponse.data.success) {
      setShowErrorModal(false);
      setCreateStoreErrorMsg('');
      setTimeout(() => {
        setShowSuccessModal(true);
        setShowWaitingForWalletSyncModal(true);
        // @ts-ignore
        dispatch(ipcApi.util.invalidateTags(['datalayerStore']));
      }, 1000);
    } else {
      setShowSuccessModal(false);
      setShowErrorModal(true);
      setCreateStoreErrorMsg(createDataStoreResponse?.error);
    }
  }, [triggerCreateDataStore, triggerGetSyncStatus, triggerGetWalletBalance, dispatch]);

  return (
    <>
      <div>
        <Button onClick={() => setShowConfirmStoreCreationModal(true)}>
          {isSyncStatusLoading || isBalanceLoading || isStoreCreating ? (
            <Spinner />
          ) : (
            <span>
              <FormattedMessage id="create-new-store" />
            </span>
          )}
        </Button>
        <ConfirmCreateStoreModal
          showModal={showConfirmStoreCreationModal}
          setShowModal={setShowConfirmStoreCreationModal}
          onCreateStore={handleCreateDataStore}
        />
        <CreatStoreSuccessModal
          showModal={showSuccessModal}
          setShowModal={setShowSuccessModal}
        />
        <CreateStoreErrorModal
          showModal={showErrorModal}
          setShowModal={setShowErrorModal}
          errorMessage={createStoreErrorMsg}
        />
        <WalletNotSyncedErrorModal
          showModal={showNotSyncedModal}
          setShowModal={setShowNotSyncedModal}
        />
        <WalletBalanceInsufficientErrorModal
          showModal={showInsufficientBalanceModal}
          setShowModal={setShowInsufficientBalanceModal}
        />
        <SpendableCoinsInsufficientErrorModal
          showModal={showSpendableCoinsInsufficientModal}
          setShowModal={setShowSpendableCoinsInsufficientModal}
        />
        {showWaitingForWalletSyncModal && (
          <WaitingForWalletSync
            onClose={() => setShowWaitingForWalletSyncModal(false)}
          />
        )}
      </div>
    </>
  );
};

export { CreateDlStoreButton };
