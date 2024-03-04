import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DataTable, LoadingSpinnerCard, StoreId } from "@/components";
import { useGetMirrorsQuery } from "@/api/ipc/datalayer";
import { FormattedMessage } from "react-intl";
import ROUTES from "@/routes/route-constants";
import {Link} from "react-router-dom";
import { Button } from 'flowbite-react';
import { SetStoreLabelModal } from "@/components/blocks/modals/SetStoreLabelModal";
import { FauxLinkButton } from "@/components/blocks/buttons/FauxLinkButton/FauxLinkButton";

interface MirrorsTableProps {
  setTableContentsLoaded?: (loaded: boolean) => void;
}

const MirrorsTable: React.FC<MirrorsTableProps> = ({ setTableContentsLoaded }) => {

  const [mirrorStoreIdToDelete, setMirrorStoreIdToDelete] = useState<string>('');
  const [storeIdToLabel, setStoreIdToLabel] = useState<string>('');
  const [showEditStoreLabelModal, setShowStoreLabelModal] = useState<boolean>(false);

  const {
    data: mirrorsData,
    isLoading: mirrorQueryLoading,
    error: getMirrorsError,
    refetch: refetchMirrors
  } = useGetMirrorsQuery({});

  const handleEditStoreLabel = useCallback((storeId: string) => {
    setStoreIdToLabel(storeId);
    setShowStoreLabelModal(true);
  }, []);

  const handleCloseEditStoreLabelModal = useCallback(() => {
    setStoreIdToLabel('');
    setShowStoreLabelModal(false);
  }, []);

  useEffect(() => {
    if (setTableContentsLoaded && mirrorsData?.success && !mirrorQueryLoading && !getMirrorsError) {
      setTableContentsLoaded(true);
    } else if (setTableContentsLoaded) {
      setTableContentsLoaded(false);
    }
  }, [mirrorsData, mirrorQueryLoading, getMirrorsError, setTableContentsLoaded]);

  const ReloadButton: React.FC = () => {
    return (
      <Button
        onClick={() => {
          refetchMirrors();
        }}
      >
        <FormattedMessage id={"unable-to-load-click-to-retry"} />
      </Button>
    );
  }

  const columns = useMemo(() => [
    {
      title: <FormattedMessage id={"mirror-store-id"} />,
      key: "storeId",
      render: (row: any) => {
        return (
          <StoreId storeId={row.storeId} onEditStoreLabel={handleEditStoreLabel} />
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
            state={{ storeId: row.storeId }}
          >
            <FormattedMessage id={'view'} />
          </Link>
        );
      }
    },
    {
      title: '',
      key: "delete",
      render: (row: any) => {
        return (
          <FauxLinkButton onClick={() => {
            setMirrorStoreIdToDelete(row.storeId);
            console.log('delete mirror:', mirrorStoreIdToDelete);
          }}>
            <FormattedMessage id={'mirror'} />
          </FauxLinkButton>
        );
      }
    }
  ], []);

  return (
    <>
      {mirrorQueryLoading
        ? <LoadingSpinnerCard />
        : // not loading, handle error or display data
        (getMirrorsError || !mirrorsData?.success
            ? <ReloadButton />
            : <DataTable columns={columns} data={mirrorsData?.store_ids} isLoading={mirrorQueryLoading} />
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

export { MirrorsTable }