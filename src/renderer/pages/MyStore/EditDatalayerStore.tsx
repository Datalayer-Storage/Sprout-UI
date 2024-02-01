import {Button, Card, Label} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {SelectedStoreIdCard, Spacer} from "@/components";
import {useCallback, useState} from "react";
import {selectFolderDialogue} from "@/utils/os";
import {SelectFolderDialogResponse} from "@/vite-env";

interface ChooseFolderProps {
  selectedStoreId: string
}

const EditDatalayerStore: React.FC<ChooseFolderProps> = (props: ChooseFolderProps) => {

  const [selectedPath, setSelectedPath] = useState<string>('');

  const handleOpenFolder = useCallback(async () => {
    const openFolderResponse: SelectFolderDialogResponse = await selectFolderDialogue();

    if (openFolderResponse?.success) {
      setSelectedPath(openFolderResponse.filePath);
    }else if (openFolderResponse?.error){
      console.log("failed to open folder. Error:\n", openFolderResponse.error);
    }
  }, []);

  return (
    <>
      <SelectedStoreIdCard storeId={props.selectedStoreId}/>
      <Spacer size={10}/>
      <Card>
        {
          (selectedPath) ?
          <>
            <Label>
              <span><FormattedMessage id="selected-directory:-"/>{selectedPath}</span>
            </Label>
            <Button onClick={handleOpenFolder}>
              <FormattedMessage id="deploy-selected-directory-to-store"/>
            </Button>
          </>
          :
          <>
            <Button onClick={handleOpenFolder}>
              <FormattedMessage id="select-directory-to-deploy"/>
            </Button>
          </>
        }
      </Card>
    </>

  );
}

export { EditDatalayerStore }