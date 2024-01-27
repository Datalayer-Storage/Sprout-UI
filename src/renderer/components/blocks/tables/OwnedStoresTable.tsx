import React from "react";
import {Button, Table, TableBody} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import {LoadingDlStoresSpinner} from "@/components";

interface OwnedStoreSelectionTableProps {
  handleStoreSelected?: (storeId: string) => void;
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const OwnedStoresTable: React.FC<OwnedStoreSelectionTableProps> = (props: OwnedStoreSelectionTableProps) => {

  const { data, isLoading, error, refetch} = useGetOwnedStoresQuery({});

  /** defines default functions for optional props */
  const {
    handleStoreSelected = () => {},
    setTableContentsLoaded = () => {}
  } = props;

  const tableContents = data?.store_ids?.map((storeId: string, index: number) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate ...">
        {storeId}
      </Table.Cell>

      { (props?.handleStoreSelected) ?
        <Table.Cell key={index}>
          <a href="#"
             className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
             onClick={() => handleStoreSelected(data.store_ids[index])}>
            <FormattedMessage id={"select-store"}/>
          </a>
        </Table.Cell>
        :
        <></>
      }

    </Table.Row>
  ));

  const noStoresFound = (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <FormattedMessage id={"no-stores-found"}/>
      </Table.Cell>
    </Table.Row>
  );


  if (isLoading){
    setTableContentsLoaded(false);
    return (
      <LoadingDlStoresSpinner/>
    );
  }else if (error){
    setTableContentsLoaded(false);
    return (
      <>
        <Button onClick={refetch}>
          <FormattedMessage id={"unable-to-load-stores-click-to-retry"}/>
        </Button>
      </>
    );
  }else{
    setTableContentsLoaded(true);
    return (
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Store ID</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only"/>
            </Table.HeadCell>
          </Table.Head>
          <TableBody className="divide-y">
            { (!data?.store_ids?.length) ? <>{noStoresFound}</> : <>{tableContents}</>}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export { OwnedStoresTable };