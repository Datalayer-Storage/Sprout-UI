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
  FolderSelector, FeeNoticeTooltip,
} from '@/components';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deployStore } from '@/utils/os';
import {useLocation} from "react-router-dom";
import {SpendableCoinsInsufficientErrorModal} from "@/components";
import {SpendableCoinRequest} from "chia-wallet";
import {useGetSpendableCoinsImmediateMutation} from "@/api/ipc/wallet";
import {ConfirmDeployFolderModal} from "@/components/blocks/modals/ConfirmDeployFolderModal/ConfirmDeployFolderModal";
const { ipcRenderer } = window.require('electron');

const EditStore: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [showSpendableCoinsInsufficientModal, setShowSpendableCoinsInsufficientModal] =
    useState(false);
  const [showConfirmDeployFolderModal, setShowConfirmDeployFolderModal] = useState(false);
  const userOptions = useSelector((state: any) => state.userOptions);
  const [triggerGetSpendableCoins] = useGetSpendableCoinsImmediateMutation();
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

    const spendableCoinRequest: SpendableCoinRequest = {wallet_id: 1};
    const spendableCoinsResponse = await triggerGetSpendableCoins(spendableCoinRequest);

    // @ts-ignore
    console.log('!!!!', spendableCoinsResponse?.data?.confirmed_records?.length, spendableCoinsResponse?.data?.confirmed_records?.length < 1);

    // @ts-ignore
    if (spendableCoinsResponse?.data?.confirmed_records?.length < 1) {
      setShowSpendableCoinsInsufficientModal(true);
      return;
    }

    setLog('Deploying...');
    setDeploying(true);
    deployStore(
      storeId,
      selectedPath,
      deployMode,
      userOptions.deployOptions,
    );
  }, [storeId, selectedPath, userOptions.deployOptions, deployMode, triggerGetSpendableCoins]);

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
            flexDirection: 'row',
          }}
        >
          <ToggleSwitch
            checked={deployMode === 'replace'}
            onChange={() => {
              setDeployMode(
                deployMode === 'replace' ? 'additive' : 'replace',
              );
            }}
          />
          <Tooltip
            content={
              deployMode === 'replace'
                ? <FormattedMessage id="missing-files-in-project-folder-will-be-deleted-from-the-store"/>
                : <FormattedMessage
                  id="new-files-will-be-upserted,-but-missing-files-in-the-project-folder-will-not-be-deleted"/>
            }
          >
            <div style={{marginLeft: 10}}>
              {
                deployMode === 'replace'
                  ? <FormattedMessage id="deploy-mode---replace"/>
                  : <FormattedMessage id="deploy-mode---additive"/>
              }
            </div>
          </Tooltip>
        </div>
        <FeeNoticeTooltip>
          <Button
            disabled={deploying || !selectedPath}
            style={{width: 150}}
            onClick={() => setShowConfirmDeployFolderModal(true)}
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
        </FeeNoticeTooltip>
        <SpendableCoinsInsufficientErrorModal
          showModal={showSpendableCoinsInsufficientModal}
          setShowModal={setShowSpendableCoinsInsufficientModal}
        />
        <XTerm log={log} />
      </Card>
      <ConfirmDeployFolderModal
        showModal={showConfirmDeployFolderModal}
        setShowModal={setShowConfirmDeployFolderModal}
        onDeployFolder={handleDeploy}
      />
    </>
  );
};

export { EditStore };
