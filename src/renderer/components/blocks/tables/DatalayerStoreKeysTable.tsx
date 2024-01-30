import React, {useEffect} from "react";
import {Button, Table, TableBody} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useGetKeysQuery, useGetValueQuery} from "@/api/ipc/datalayer";
import {LoadingSpinnerCard} from "@/components";
import {useSelector} from "react-redux";
import {getStoreToView} from "@/store/slices/myDatalayerStore";
//import {visitPage} from "@/store/slices/browser";
import {GetKeysParams, GetValueParams} from "chia-datalayer";
import {decodeHex} from '@/utils/hex-utils';

interface DatalayerStoreKeysTableProps {
  handleViewKeyData?: (storeId: string) => void;
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const DatalayerStoreKeysTable: React.FC<DatalayerStoreKeysTableProps> = (props: DatalayerStoreKeysTableProps) => {

  const storeID: string = useSelector((state)=> getStoreToView(state));
  const getKeysParams: GetKeysParams = {id: storeID}
  const { data, isLoading, error, refetch} = useGetKeysQuery(getKeysParams);

  /** defines default functions for optional props */
  const {
    handleViewKeyData = (key: string) => {
      if (storeID) {
        const getValueParams: GetValueParams = {id: storeID, key: key}
        const response = useGetValueQuery(getValueParams);
        console.log("get value response:", response);
      }
    },
    setTableContentsLoaded = () => {}
  } = props;

  useEffect(() => {
    if (isLoading || error){
      setTableContentsLoaded(false);
    }else{
      setTableContentsLoaded(true);
    }
  }, [setTableContentsLoaded, isLoading, error]);

  const tableContents = data?.keys?.map((storeKey: string, index: number) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
      <Table.Cell key={index}>
        <a href="#"
           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
           onClick={() => handleViewKeyData(data.keys[index])}>
           {decodeHex(storeKey)}
        </a>
      </Table.Cell>
    </Table.Row>
  ));

  const noDataInStore = (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <FormattedMessage id={"no-stores-found"}/>
      </Table.Cell>
    </Table.Row>
  );

  if (isLoading){
    return (
      <LoadingSpinnerCard/>
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
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>
              <FormattedMessage id="key"/>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only"/>
            </Table.HeadCell>
          </Table.Head>
          <TableBody className="divide-y">
            { (!data?.keys?.length) ? <>{noDataInStore}</> : <>{tableContents}</>}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export { DatalayerStoreKeysTable };