import _ from 'lodash';
import React, { useEffect } from 'react';
import { Modal, Spinner } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import {
  useGetWalletSyncStatusQuery,
  useGetTransactionsQuery,
} from '@/api/ipc/wallet';

interface WaitingForWalletSyncProps {
  onClose: () => void;
}

const WaitingForWalletSyncModal: React.FC<WaitingForWalletSyncProps> = ({
  onClose = _.noop,
}: WaitingForWalletSyncProps) => {
  const { data: syncStatus } = useGetWalletSyncStatusQuery(null, {
    pollingInterval: 6000,
  });

  const { data: transactionData } = useGetTransactionsQuery(null, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    if (!transactionData || !syncStatus) {
      return;
    }
    const unconfirmedTransactions = transactionData.transactions.some(
      (transaction) => !transaction.confirmed,
    );

    if (syncStatus?.synced && !unconfirmedTransactions) {
      onClose();
    }
  }, [syncStatus, onClose, transactionData]);

  return (
    <Modal show={true}>
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
