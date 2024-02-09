import {
  Button,
  Card,
  Spinner,
  ToggleSwitch,
  Tooltip
} from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import {
  SelectedStoreIdCard,
  Spacer,
  XTerm,
  FolderSelector,
} from '@/components';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deployStore } from '@/utils/os';
import {useLocation} from "react-router-dom";
import {DeployFolderErrorModal} from "@/components/blocks/modals/DeployFolderErrorModal";
import Wallet, {SpendableCoinRequest} from "chia-wallet";
const { ipcRenderer } = window.require('electron');

const EditStore: React.FC = () => {
  const wallet = new Wallet({verbose: true})
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showDeployFolderErrorModal, setShowDeployFolderErrorModal] = useState<boolean>(false);
  const userOptions = useSelector((state: any) => state.userOptions);
  const [log, setLog] = useState<string>('Waiting To Deploy...');
  const [deployMode, setDeployMode] = useState<string>('replace');
  const [deploying, setDeploying] = useState<boolean>(false);
  const location = useLocation();
  const storeId = location.state?.storeId;

  useEffect(() => {
    if (!storeId){
      console.error('EditStore received invalid storeId:', storeId);
    }
  }, [storeId]);

  useEffect(() => {
    const handleLogMessage = (_, message: string) => {
      if (deploying) {
        setLog(message);
      }

      if (message.includes('Deploy operation completed successfully.')) {
        setDeploying(false);
      }
    };

    ipcRenderer.on('logMessage', handleLogMessage);

    // Cleanup listener when component unmounts
    return () => {
      ipcRenderer.removeListener('logMessage', handleLogMessage);
    };
  }, [deploying]);

  const handleDeploy = useCallback(async () => {

    const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
    const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);

    if (spendableCoins.confirmed_records.length > 1) {
      setLog('Deploying...');
      setDeploying(true);
      deployStore(
        storeId,
        selectedPath,
        deployMode,
        userOptions.deployOptions,
      );
    } else {
      setErrorMsg("You must have at least 2 coins to deploy a folder.")
      setShowDeployFolderErrorModal(true);
    }


  }, [storeId, selectedPath, userOptions.deployOptions, deployMode, wallet]);

  return (
    <>
      <SelectedStoreIdCard storeId={storeId} />
      <Spacer size={10} />
      <Card>
        <FolderSelector onSelect={setSelectedPath} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Tooltip
            content={
              deployMode === 'replace'
                ? 'Missing files in the project folder will be deleted from the store'
                : 'New files will be upserted, but missing files in the project folder will not be deleted'
            }
          >
            <ToggleSwitch
              checked={deployMode === 'replace'}
              label={
                deployMode === 'replace'
                  ? 'Deploy Mode - Replace'
                  : 'Deploy Mode - Additive'
              }
              onChange={() => {
                setDeployMode(
                  deployMode === 'replace' ? 'additive' : 'replace',
                );
              }}
            />
          </Tooltip>
        </div>
        <Button
          disabled={deploying || !selectedPath}
          style={{ width: 150 }}
          onClick={handleDeploy}
        >
          {deploying ? (
            <div>
              {' '}
              <Spinner />
            </div>
          ) : (
            <span style={{ textTransform: 'capitalize' }}>
              <FormattedMessage id="deploy" />
            </span>
          )}
        </Button>

        <XTerm log={log} />
      </Card>
      <DeployFolderErrorModal
        showModal={showDeployFolderErrorModal}
        setShowModal={setShowDeployFolderErrorModal}
        errorMessage={errorMsg}
        setErrorMessage={setErrorMsg}
      />
    </>
  );
};

export { EditStore };
