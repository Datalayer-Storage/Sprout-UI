import { Button, Card, Spinner, ToggleSwitch, Tooltip } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import {
  SelectedStoreIdCard,
  Spacer,
  XTerm,
  FolderSelector,
} from '@/components';
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deployStore } from '@/utils/os';
const { ipcRenderer } = window.require('electron');

interface ChooseFolderProps {
  selectedStoreId: string;
}

const EditDatalayerStore: React.FC<ChooseFolderProps> = ({
  selectedStoreId,
}: ChooseFolderProps) => {
  const [selectedPath, setSelectedPath] = useState<string>('');
  const userOptions = useSelector((state: any) => state.userOptions);
  const [log, setLog] = useState<string>('Waiting To Deploy...');
  const [deployMode, setDeployMode] = useState<string>('replace');
  const [deploying, setDeploying] = useState<boolean>(false);

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

  const handleDeploy = useCallback(() => {
    setLog('Deploying...');
    setDeploying(true);
    deployStore(
      selectedStoreId,
      selectedPath,
      deployMode,
      userOptions.deployOptions,
    );
  }, [selectedStoreId, selectedPath, userOptions.deployOptions, deployMode]);

  return (
    <>
      <SelectedStoreIdCard storeId={selectedStoreId} />
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
    </>
  );
};

export { EditDatalayerStore };
