import React, {Dispatch, useCallback, useEffect, useMemo, useState} from "react";
import { DataTable, LoadingSpinnerCard, StoreId} from "@/components";
import {useGetSubscriptionsQuery} from "@/api/ipc/datalayer";
import {FormattedMessage} from "react-intl";
import ROUTES from "@/routes/route-constants";
import {Link} from "react-router-dom";
import {Button} from 'flowbite-react';
import {SetStoreLabelModal} from "@/components";
import {StoreMirrorButton} from "@/components";
import {UnsubscribeButton} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {UnknownAction} from "@reduxjs/toolkit";
import {deleteUnsubscribingStoreMark} from "@/store/slices/app";

interface SubscriptionsTableProps {
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({setTableContentsLoaded}) => {

  const [storeIdToLabel, setStoreIdToLabel] = useState<string>('');
  const [showEditStoreLabelModal, setShowStoreLabelModal] = useState<boolean>(false);
  const storesMarkedForUnsubscription = useSelector((state: any) => state.app.unsubscribingStores);
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const {
    data: subscriptionsData,
    isLoading: subscriptionQueryLoading,
    error: getSubscriptionsError,
    refetch: refetchSubscriptions
  } = useGetSubscriptionsQuery({});

  const handleEditStoreLabel = useCallback((storeId: string) => {
    setStoreIdToLabel(storeId);
    setShowStoreLabelModal(true);
  }, []);

  const handleCloseEditStoreLabelModal = useCallback(() => {
    setStoreIdToLabel('');
    setShowStoreLabelModal(false);
  }, []);

  useEffect(() => {
    if (setTableContentsLoaded && subscriptionsData?.success && !subscriptionQueryLoading && !getSubscriptionsError){
      setTableContentsLoaded(true);

      // remove unsubscribing mark from storeId that has been unsubscribed
      Object.keys(storesMarkedForUnsubscription).forEach((markedStoreId: string) => {

        const markedStoreIdPresent: boolean = subscriptionsData.store_ids
          .some((store: {id: string, storeId: string}) => {
            return store.storeId === markedStoreId
          });

        if (!markedStoreIdPresent){
          dispatch(deleteUnsubscribingStoreMark({storeId: markedStoreId}))
        }
      });
    }else if (setTableContentsLoaded){
      setTableContentsLoaded(false);
    }
  }, [subscriptionsData, subscriptionQueryLoading, getSubscriptionsError, setTableContentsLoaded, storesMarkedForUnsubscription, dispatch]);

  const ReloadButton: React.FC = () => {
    return (
      <Button
        onClick={() => {
          refetchSubscriptions();
        }}
      >
        <FormattedMessage id={"unable-to-load-click-to-retry"} />
      </Button>
    )
      ;
  }

  const columns = useMemo(() => [
    {
      title: <FormattedMessage id={"subscription-store-id"}/>,
      key: "storeId",
      render: (row: any) => {
        return (
          <StoreId storeId={row.storeId} onEditStoreLabel={handleEditStoreLabel}/>
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
        return (<UnsubscribeButton storeId={row.storeId}/>);
      }
    }
  ], [handleEditStoreLabel]);

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
      {
        showEditStoreLabelModal &&
        <SetStoreLabelModal
          storeId={storeIdToLabel}
          onClose={handleCloseEditStoreLabelModal}
        />
      }
    </>
  );
}

export { SubscriptionsTable }