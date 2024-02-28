import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spinner } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useGetWalletSyncStatusQuery, useGetWalletBalanceQuery } from '@/api/ipc/wallet';
import { ipcApi } from '@/api/ipc';

/**
 * Component to display a modal waiting for wallet sync.
 * @returns {JSX.Element} The WaitingForWalletSyncModal component.
 */
const WaitingForWalletSyncModal: React.FC = () => {
  const dispatch = useDispatch();
  const appStore = useSelector((state: any) => state.app);

  // Custom hook to refetch wallet sync status with polling and refetch on mount or argument change
  const { refetch: refetchSyncStatus } = useGetWalletSyncStatusQuery(null, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });

  // Custom hook to refetch wallet balance with polling and refetch on mount or argument change
  const { data: walletData, refetch: refetchWalletBalance } = useGetWalletBalanceQuery(null, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  // Effect to refetch wallet sync status and balance on certain conditions
  useEffect(() => {
    refetchSyncStatus();
    refetchWalletBalance();

    // Refetch after a delay to ensure updated data
    setTimeout(() => {
      refetchSyncStatus();
      refetchWalletBalance();
    }, 2000);
  }, [appStore.checkForPendingTxToken, refetchSyncStatus, refetchWalletBalance]);

  // Effect to invalidate data layer tags when wallet data changes
  useEffect(() => {
    if (walletData?.wallet_balance?.pending_coin_removal_count !== undefined) {
      dispatch(ipcApi.util.invalidateTags(['datalayerStore']));
    }
  }, [walletData?.wallet_balance?.pending_coin_removal_count, dispatch]);

  return (
    <Modal show={Boolean(walletData?.wallet_balance?.pending_coin_removal_count)} dismissible={false}>
      <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5">
        <FormattedMessage id="waiting-for-transactions-to-confirm" />
      </div>
      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner size="lg" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { WaitingForWalletSyncModal };
