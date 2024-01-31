import {Button, Card, Label} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {SelectedStoreIdCard} from "@/components";
//import {selectFolderDialogue} from "@/api/ipc/os";

interface ChooseFolderProps {
  selectedStoreId: string
}

const EditDatalayerStore: React.FC<ChooseFolderProps> = (props: ChooseFolderProps) => {

  //const [selectedDir, setSelectedDir] = useState<string>('');


  return (
    <>
      <SelectedStoreIdCard storeId={props.selectedStoreId}/>
      <div style={{padding: "10px"}}/>
      <Card>
        <div>
          <div className="mb-2 block">
            <Label>
              <FormattedMessage id="select-directory-to-deploy"/>
            </Label>
            <Button>
              Deploy
            </Button>
          </div>
        </div>
      </Card>
    </>

  );
}

export { EditDatalayerStore }