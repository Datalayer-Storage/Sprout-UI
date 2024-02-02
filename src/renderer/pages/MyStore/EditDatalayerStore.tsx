import { Button, Card, Label } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { SelectedStoreIdCard, Spacer, XTerm } from '@/components';
import { useCallback, useState } from 'react';
import { selectFolderDialogue } from '@/utils/os';
import { SelectFolderDialogResponse } from '@/vite-env';


interface ChooseFolderProps {
  selectedStoreId: string;
}

const EditDatalayerStore: React.FC<ChooseFolderProps> = (
  { selectedStoreId }: ChooseFolderProps,
) => {
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [log, setLog] = useState<string>();

  const handleOpenFolder = useCallback(async () => {
    const openFolderResponse: SelectFolderDialogResponse =
      await selectFolderDialogue();

    if (openFolderResponse?.success) {
      setSelectedPath(openFolderResponse.filePath);
    } else if (openFolderResponse?.error) {
      console.log('failed to open folder. Error:\n', openFolderResponse.error);
    }
  }, []);

  const handleDeploy = useCallback(() => {
    setLog('Deploying...');
    const deployment = deploy(selectedStoreId, selectedPath);

    deployment.on('info', (message) => {
      setLog(message);
    });

    deployment.on('error', (error) => {
      setLog(error);
    });
  }, [selectedStoreId, selectedPath]);

  return (
    <>
      <SelectedStoreIdCard storeId={selectedStoreId} />
      <Spacer size={10} />
      <Card>
        {selectedPath ? (
          <>
            <Label>
              <span>
                <FormattedMessage id="selected-directory:-" />
                {selectedPath}
              </span>
            </Label>
            <Button onClick={handleOpenFolder}>
              <FormattedMessage id="deploy-selected-directory-to-store" />
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleOpenFolder}>
              <FormattedMessage id="select-directory-to-deploy" />
            </Button>
          </>
        )}
        <Button onClick={handleDeploy}>
          <FormattedMessage id="deploy" />
        </Button>

        {log && <XTerm log={log} />}
      </Card>
    </>
  );
};

export { EditDatalayerStore };
