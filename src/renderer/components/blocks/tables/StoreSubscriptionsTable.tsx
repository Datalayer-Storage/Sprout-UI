import React, { useEffect, useState } from 'react';
import { Button, Card, Table, TableBody } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import {useGetSubscriptionsQuery} from '@/api/ipc/datalayer';
import { LoadingSpinnerCard, Spacer } from '@/components';
import { useSelector } from 'react-redux';
import {decodeHex} from "@/utils/hex-utils";
import _ from 'lodash';

interface StoreSubscriptionsTableProps {
  onViewSubscriptionData?: (subscriptionId: string) => void;
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const StoreSubscriptionsTable: React.FC<StoreSubscriptionsTableProps> = (
  { onViewSubscriptionData = _.noop, setTableContentsLoaded = _.noop }: StoreSubscriptionsTableProps
) => {
  const userOptions = useSelector((state: any) => state.userOptions);
  const { data, isLoading, error, refetch } = useGetSubscriptionsQuery({});

  const [numSubscriptions, setNumSubscriptions] = useState<number>(0);

  useEffect(() => {
    if (data?.store_ids?.length) {
      setNumSubscriptions(data.store_ids.length);
    } else {
      setNumSubscriptions(0);
    }
  }, [data]);

  useEffect(() => {
    if ((isLoading || error) && setTableContentsLoaded) {
      setTableContentsLoaded(false);
    } else if (setTableContentsLoaded) {
      setTableContentsLoaded(true);
    }
  }, [setTableContentsLoaded, isLoading, error]);

  const tableContents = data?.store_ids?.map(
    (subscriptionStoreId: string, index: number) => (
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={index}
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate ...">
          {userOptions.storeLabels?.[subscriptionStoreId] || subscriptionStoreId}
        </Table.Cell>
        <Table.Cell>
          <a
            href="#"
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            onClick={() => onViewSubscriptionData(decodeHex(data.keys[index]))}
          >
            {decodeHex(subscriptionStoreId)}
          </a>
        </Table.Cell>
      </Table.Row>
    ),
  );

  const NoStoresFound: React.FC = () => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <FormattedMessage id={'no-stores-found'} />
        </Table.Cell>
      </Table.Row>
    );
  }

  if (isLoading) {
    return <LoadingSpinnerCard />;
  } else if (error) {
    return (
      <>
        <Button onClick={refetch}>
          <FormattedMessage id={'unable-to-load-stores-click-to-retry'} />
        </Button>
      </>
    );
  } else {
    return (
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>
              <FormattedMessage id="store-id" />
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only" />
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only" />
            </Table.HeadCell>
          </Table.Head>
          <TableBody className="divide-y">
            {!data?.store_ids?.length ? (
              <NoStoresFound/>
            ) : (
              <>{tableContents}</>
            )}
          </TableBody>
        </Table>
        <Spacer size={5} />
        <Card>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <span>
              <FormattedMessage id="store-count" />
              {numSubscriptions}
            </span>
          </p>
        </Card>
      </div>
    );
  }
};

export { StoreSubscriptionsTable };
