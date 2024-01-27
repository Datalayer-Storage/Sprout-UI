import React from "react";
import {Card, FileInput, Label} from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface ChooseFolderProps {
  selectedStoreId: string
}

const SelectAndDeployFolder: React.FC<ChooseFolderProps> = (props: ChooseFolderProps) => {

  return (
    <>
      <Card>
        <FormattedMessage id="selected-store-id"/>
        <div>{props.selectedStoreId}</div>
      </Card>
      <div style={{padding: "10px"}}/>
      <Card>
        <div>
          <div className="mb-2 block">
            <Label>
              <FormattedMessage id="select-directory-or-files-to-deploy"/>
            </Label>
          </div>
          <FileInput id="multiple-file-upload" multiple/>
        </div>
      </Card>
    </>

  );
}

export { SelectAndDeployFolder }