import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Spinner } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useGetWalletSyncStatusQuery, useGetWalletBalanceQuery } from '@/api/ipc/wallet';

const WaitingForWalletSyncModal: React.FC = () => {
  const appStore = useSelector((state: any) => state.app);

  const { data: syncStatus, refetch: refetchSyncStatus } = useGetWalletSyncStatusQuery(null, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true
  });

  const { data: walletData, refetch: refetchWalletBalance } = useGetWalletBalanceQuery(null, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    refetchSyncStatus();
    refetchWalletBalance();
    setTimeout(() => {
      refetchSyncStatus();
      refetchWalletBalance();
    }, 2000);
  }, [appStore.checkForPendingTxToken, refetchSyncStatus, refetchWalletBalance]);

  console.log(syncStatus?.synced, walletData?.wallet_balance?.pending_coin_removal_count)

  return (
    <Modal show={Boolean(walletData?.wallet_balance?.pending_coin_removal_count)}>
      <Modal.Header>
        <FormattedMessage id="waiting-for-transactions-to-confirm" />
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner size={'lg'} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { WaitingForWalletSyncModal };
