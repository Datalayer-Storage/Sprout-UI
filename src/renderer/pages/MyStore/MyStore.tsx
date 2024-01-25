import {Button, Card, Spinner, Table} from "flowbite-react";
import { useState } from "react";
import { useGetOwnedStoresQuery } from "@/api/ipc/datalayer";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
//import {useSelector} from "react-redux";

const SpacerDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
`;


interface DlStoreTableBodyProps {
  storeIds: string[];
}


const MyStore: React.FC = () => {

  return (
    <>
      <SpacerDiv>
        <Layout/>
      </SpacerDiv>
    </>
  );
};

const Layout: React.FC = () => {

  return (
    <>
      <ShowDlStores/>
    </>
  );
}

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
  if (props.storeIds.length === 0){
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
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {storeId}
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                <FormattedMessage id={"select-store"}/>
              </a>
            </Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>
    );
  }
}

const ShowDlStores: React.FC = () => {

  const [reload, doReload] = useState(false);
  console.log("dispatched getStores");
  const { data, isLoading, isError} = useGetOwnedStoresQuery({});

  if(reload){
    console.log("reloading");
    doReload(false);
  }

  if (isLoading){
    return (
      <LoadingDlStoresSpinner/>
    );
  }else if (isError){
    return (
      <>
        <Button onClick={() => doReload(true)}>
          <FormattedMessage id={"unable-to-load-stores-click-to-retry"}/>
        </Button>
      </>
    );
  }else{

    return (
      <>
        <Button>
          <FormattedMessage id={"create-new-store"}/>
        </Button>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Store ID</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <DlStoreTableBody storeIds={data.store_ids}/>
          </Table>
        </div>
      </>
    );
  }
}

/*
const ChooseFolder: React.FC = () => {

  const storeId: string = 'store id goes here';

  return (
    <>
      <div>
        {storeId}
      </div>
      <Button>
        Choose Folder
      </Button>
    </>

  );
}

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

export {MyStore};