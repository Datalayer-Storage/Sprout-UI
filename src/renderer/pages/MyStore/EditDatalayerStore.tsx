import React, {useState} from "react";
import {Button, Card, FileInput, Label} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {SelectedStoreIdCard} from "@/components";

interface ChooseFolderProps {
  selectedStoreId: string
}

const EditDatalayerStore: React.FC<ChooseFolderProps> = (props: ChooseFolderProps) => {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  return (
    <>
      <SelectedStoreIdCard storeId={props.selectedStoreId}/>
      <div style={{padding: "10px"}}/>
      <Card>
        <div>
          <div className="mb-2 block">
            <Label>
              <FormattedMessage id="select-directory-or-files-to-deploy"/>
            </Label>
          </div>
          <FileInput
            id="multiple-file-upload"
            onChange={handleFileChange}
            multiple
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <strong>Selected Files:</strong>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
      <div style={{padding: "10px"}}/>
      <Card>
        <Button>
          Deploy
        </Button>
      </Card>
    </>

  );
}

export { EditDatalayerStore }