import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ConfirmUnsubscribeModal, DataTable, LoadingSpinnerCard, StoreId} from "@/components";
import {useGetSubscriptionsQuery} from "@/api/ipc/datalayer";
import {FormattedMessage} from "react-intl";
import ROUTES from "@/routes/route-constants";
import {Link} from "react-router-dom";
import {Button, Card} from 'flowbite-react';
import {FauxLinkButton} from "@/components";
import {StoreMirrorButton} from "@/components";

interface SubscriptionsTableProps {
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({setTableContentsLoaded}) => {

  const [storeIdToUnsubscribe, setStoreIdToUnsubscribe] = useState<string>('');
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState<boolean>(false);
  const [numStores, setNumStores] = useState<number>(0);

  const {
    data: subscriptionsData,
    isLoading: subscriptionQueryLoading,
    error: getSubscriptionsError,
    refetch: refetchSubscriptions
  } = useGetSubscriptionsQuery({});

  const handleClickUnsubscribe = useCallback((storeId: string) => {
    setStoreIdToUnsubscribe(storeId);
    setShowUnsubscribeModal(true);
  }, []);

  const handleCloseUnsubscribeModal = useCallback(() => {
    setStoreIdToUnsubscribe('');
    setShowUnsubscribeModal(false);
  }, []);

  useEffect(() => {
    if (setTableContentsLoaded && subscriptionsData?.success && !subscriptionQueryLoading && !getSubscriptionsError){
      setTableContentsLoaded(true);
    }else if (setTableContentsLoaded){
      setTableContentsLoaded(false);
    }
  }, [subscriptionsData, subscriptionQueryLoading, getSubscriptionsError, setTableContentsLoaded]);

  useEffect(() => {
    if (subscriptionsData?.store_ids?.length) {
      setNumStores(subscriptionsData.store_ids.length);
    } else {
      setNumStores(0);
    }
  }, [subscriptionsData]);

  const ReloadButton: React.FC = () => {
    return (
      <Button
        onClick={() => {
          refetchSubscriptions();
        }}
      >
        <FormattedMessage id={"unable-to-load-click-to-retry"} />
      </Button>
    );
  }

  const columns = useMemo(() => [
    {
      title: <FormattedMessage id={"subscription-store-id"}/>,
      key: "storeId",
      render: (row: any) => {
        return (
          <StoreId storeId={row.storeId} allowLabelEditing={true}/>
        );
      }
    },
    {
      title: '',
      key: "view",
      render: (row: any) => {
        return (
          <Link
            to={ROUTES.VIEW_STORE}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            state={{storeId: row.storeId}}
          >
            <FormattedMessage id={'view'} />
          </Link>
        );
      }
    },
    {
      title: '',
      key: "mirror",
      render: (row: any) => {
        return(<StoreMirrorButton storeId={row.storeId}/>);
      }
    },
    {
      title: '',
      key: "unsubscribe",
      render: (row: any) => {
        return (
          <FauxLinkButton onClick={() => handleClickUnsubscribe(row.storeId)}>
            <FormattedMessage id={'unsubscribe'}/>
          </FauxLinkButton>
        );
      }
    }
  ], [handleClickUnsubscribe]);

  return (
    <>
      {subscriptionQueryLoading
        ? <LoadingSpinnerCard/>
        : // not loading, handle error or display data
        (getSubscriptionsError || !subscriptionsData?.success
          ? <ReloadButton/>
          : // display table
            <>
              <DataTable columns={columns} data={subscriptionsData?.store_ids} isLoading={subscriptionQueryLoading}/>
              <Card>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <FormattedMessage id="subscription-count"/>: {numStores}
                </p>
              </Card>
            </>
        )
      }
      {
        showUnsubscribeModal &&
        <ConfirmUnsubscribeModal
          storeId={storeIdToUnsubscribe}
          onClose={handleCloseUnsubscribeModal}
        />
      }
    </>
  );
}

export { SubscriptionsTable };