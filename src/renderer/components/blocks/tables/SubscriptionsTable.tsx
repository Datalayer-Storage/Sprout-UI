import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ConfirmUnsubscribeModal, DataTable, LoadingSpinnerCard, StoreId} from "@/components";
import {useGetSubscriptionsQuery, useUnsubscribeMutation} from "@/api/ipc/datalayer";
import {FormattedMessage} from "react-intl";
import ROUTES from "@/routes/route-constants";
import {Link} from "react-router-dom";
import {Button} from 'flowbite-react';
import {SetStoreLabelModal} from "@/components/blocks/modals/SetStoreLabelModal";
import {FauxLinkButton} from "@/components/blocks/buttons/FauxLinkButton/FauxLinkButton";

interface SubscriptionsTableProps {
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({setTableContentsLoaded}) => {

  const [storeIdToUnsubscribe, setStoreIdToUnsubscribe] = useState('');
  const [storeIdToLabel, setStoreIdToLabel] = useState<string>('');
  const [triggerUnsubscribe] = useUnsubscribeMutation();
  const {
    data: subscriptionsData,
    isLoading: subscriptionQueryLoading,
    error: getSubscriptionsError,
    refetch: refetchSubscriptions
  } = useGetSubscriptionsQuery({});

  const handleUnsubscribe = useCallback((storeId: string) => {
    triggerUnsubscribe({id: storeId})
  }, [triggerUnsubscribe]);

  useEffect(() => {
    if (setTableContentsLoaded && subscriptionsData?.success && !subscriptionQueryLoading && !getSubscriptionsError){
      setTableContentsLoaded(true);
    }else if (setTableContentsLoaded){
      setTableContentsLoaded(false);
    }
  }, [subscriptionsData, subscriptionQueryLoading, getSubscriptionsError, setTableContentsLoaded]);

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
          <StoreId storeId={row.storeId} setStoreIdToEdit={setStoreIdToLabel}/>
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
      key: "unsubscribe",
      render: (row: any) => {

        return (
          <FauxLinkButton onClick={() => setStoreIdToUnsubscribe(row.storeId)}>
            <FormattedMessage id={'unsubscribe'}/>
          </FauxLinkButton>
        );
      }
    }
  ], [setStoreIdToUnsubscribe]);

  return (
    <>
      {subscriptionQueryLoading
        ? <LoadingSpinnerCard/>
        : // not loading, handle error or display data
        (getSubscriptionsError || !subscriptionsData?.success
          ? <ReloadButton/>
          : <DataTable columns={columns} data={subscriptionsData?.store_ids} isLoading={subscriptionQueryLoading}/>
        )
      }
      <SetStoreLabelModal
        storeId={storeIdToLabel}
        setStoreId={setStoreIdToLabel}
      />
      <ConfirmUnsubscribeModal
        storeId={storeIdToUnsubscribe}
        setStoreId={setStoreIdToUnsubscribe}
        onUnsubscribe={handleUnsubscribe}/>
    </>
  );
}

export { SubscriptionsTable }