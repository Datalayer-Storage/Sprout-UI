import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ConfirmUnsubscribeModal, DataTable, LoadingSpinnerCard, StoreId} from "@/components";
import {useGetSubscriptionsQuery} from "@/api/ipc/datalayer";
import {FormattedMessage} from "react-intl";
import ROUTES from "@/routes/route-constants";
import {Link} from "react-router-dom";
import {Button, Tooltip} from 'flowbite-react';
import {SetStoreLabelModal} from "@/components/blocks/modals/SetStoreLabelModal";
import {FauxLinkButton} from "@/components/blocks/buttons/FauxLinkButton/FauxLinkButton";
import {AddMirrorModal} from "@/components/blocks/modals/AddMirrorModal";
import {useSelector} from "react-redux";
import _ from 'lodash';

interface SubscriptionsTableProps {
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({setTableContentsLoaded}) => {

  const mirrors = useSelector((state: any) => state.app.storeMirrors);

  const [storeIdToUnsubscribe, setStoreIdToUnsubscribe] = useState<string>('');
  const [storeIdToLabel, setStoreIdToLabel] = useState<string>('');
  const [storeIdToMirror, setStoreIdToMirror] = useState<string>('');
  const [showEditStoreLabelModal, setShowStoreLabelModal] = useState<boolean>(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState<boolean>(false);
  const [showAddMirrorModal, setShowAddMirrorModal] = useState<boolean>(false);

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

  const handleEditStoreLabel = useCallback((storeId: string) => {
    setStoreIdToLabel(storeId);
    setShowStoreLabelModal(true);
  }, []);

  const handleCloseEditStoreLabelModal = useCallback(() => {
    setStoreIdToLabel('');
    setShowStoreLabelModal(false);
  }, []);

  const handleClickAddMirror = useCallback((storeId: string) => {
    setStoreIdToMirror(storeId);
    setShowAddMirrorModal(true);
  }, []);

  const handleCloseAddMirrorModal = useCallback(() => {
    setStoreIdToMirror('');
    setShowAddMirrorModal(false);
  }, [])

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

        if (_.isNil(mirrors[row.storeId])){
          return (
            <div className={'mr-2 ml-2'}>
              <FauxLinkButton onClick={() => handleClickAddMirror(row.storeId)}>
                <FormattedMessage id={'mirror'}/>
              </FauxLinkButton>
            </div>
          );
        } else {
          return (
            <Tooltip content={mirrors[row.storeId]}>
              <p className={'font-medium text-gray-500'}>
                <FormattedMessage id={"mirrored"}/> &#10003;
              </p>
            </Tooltip>
          );
        }
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
  ], [handleEditStoreLabel, mirrors, handleClickAddMirror, handleClickUnsubscribe]);

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
      {
        showAddMirrorModal &&
        <AddMirrorModal
          storeId={storeIdToMirror}
          onClose={handleCloseAddMirrorModal}
        />
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

export { SubscriptionsTable }