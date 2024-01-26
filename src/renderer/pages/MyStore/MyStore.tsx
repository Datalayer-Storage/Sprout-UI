import {Button, Card, Spinner, Table, FileInput, Label} from "flowbite-react";
import { useGetOwnedStoresQuery } from "@/api/ipc/datalayer";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import {CreateDlStoreButton} from "@/components";
import React, {useCallback, useState} from "react";
//import {useSelector} from "react-redux";

const SpacerDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
`;

enum MyStoreStatesEnum {
  SELECT_STORE ,
  SELECT_FOLDER,
  FOLDER_DEPLOYED
}

interface DlStoreTableBodyProps {
  storeIds: string[];
  handleStoreSelected: (setSelectedStoreId: string) => void;
}

interface SelectedDlStoreProps {
  setState: (state: MyStoreStatesEnum) => void;
  setSelectedStore: (setSelectedStoreId: string) => void;
}

interface ChooseFolderProps {
  selectedStoreId: string
}

const MyStore: React.FC = () => {

  const [state, setState] = useState<MyStoreStatesEnum>(MyStoreStatesEnum.SELECT_STORE);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');

  switch(state) {
    case MyStoreStatesEnum.SELECT_STORE: {
      return (
        <SpacerDiv>
          <SelectDlStore setState={setState} setSelectedStore={setSelectedStoreId}/>
        </SpacerDiv>
      );
    }
    case MyStoreStatesEnum.SELECT_FOLDER: {
      return (
        <SpacerDiv>
          <span>
            <ChooseFolder selectedStoreId={selectedStoreId}/>
          </span>
        </SpacerDiv>
      );
    }
    case MyStoreStatesEnum.FOLDER_DEPLOYED: {
      return (
        <SpacerDiv>
          Todo: Folder Deployed Component
        </SpacerDiv>
      );
    }
    default: {
      return (
        <SpacerDiv>
          <FormattedMessage id="invalid-component-state"/>
        </SpacerDiv>
      );
    }
  }
};

const LoadingDlStoresSpinner: React.FC = () => {

  return (
    <>
      <Card>
        <Spinner/>
        <FormattedMessage id={"loading-your-stores"}/>
      </Card>
    </>
  );
}

const DlStoreTableBody: React.FC<DlStoreTableBodyProps> = (props) => {

  if (!props?.storeIds?.length){
    return(
      <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <FormattedMessage id={"no-stores-found"}/>
            </Table.Cell>
          </Table.Row>
      </Table.Body>
    );
  }else{

    return(
      <Table.Body className="divide-y">

        {props.storeIds.map((storeId: string, index: number) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate ...">
              {storeId}
            </Table.Cell>
            <Table.Cell key={index}>
              <a href="#"
                 className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                 onClick={() => props.handleStoreSelected(props.storeIds[index])}>
                <FormattedMessage id={"select-store"}/>
              </a>
            </Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>
    );
  }
}

const SelectDlStore: React.FC<SelectedDlStoreProps> = (props: SelectedDlStoreProps) => {

  console.log("dispatched getStores");
  const { data, isLoading, error, refetch} = useGetOwnedStoresQuery({});

  const handleStoreSelected = useCallback((storeId: string) => {
    console.log("selected storeId:", storeId);
    props.setState(MyStoreStatesEnum.SELECT_FOLDER);
    props.setSelectedStore(storeId);
  }, [props])

  if (isLoading){
    return (
      <LoadingDlStoresSpinner/>
    );
  }else if (error){
    return (
      <>
        <Button onClick={refetch}>
          <FormattedMessage id={"unable-to-load-stores-click-to-retry"}/>
        </Button>
      </>
    );
  }else{

    return (
      <>
        <CreateDlStoreButton/>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Store ID</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only"/>
              </Table.HeadCell>
            </Table.Head>
            <DlStoreTableBody storeIds={data.store_ids} handleStoreSelected={handleStoreSelected}/>
          </Table>
        </div>
      </>
    );
  }
}

const ChooseFolder: React.FC<ChooseFolderProps> = (props: ChooseFolderProps) => {

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

/*
const DeployFolderToDlStore: React.FC = () => {

    return (
      <>
        <Button>
          Deploy Folder to DL Store
        </Button>
      </>
    );
}

 */
export type { SelectedDlStoreProps };
export { MyStore };