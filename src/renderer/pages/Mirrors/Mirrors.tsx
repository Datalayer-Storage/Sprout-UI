import { Spacer, SubscriptionsTable } from "@/components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, TextInput, Tooltip } from "flowbite-react";
import { FormattedMessage } from "react-intl";
import { useGetOwnedStoresQuery, useAddMirrorMutation } from "@/api";
import { AddMirrorErrorModal } from "@/components";

const Mirrors: React.FC = () => {

  const [mirrorStoreIdToAdd, setMirrorStoreIdToAdd] = useState<string>('');
  const [mirrorsLoaded, setMirrorsLoaded] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [storeIsOwned, setStoreIsOwned] = useState(false);

  const storeInputRef = useRef<HTMLInputElement>(null);

  const [triggerAddMirror, {
    data: mirrorMutationData,
    isLoading: mirrorMutationLoading
  }] = useAddMirrorMutation();
  const {
    data: ownedStoresData,
    isLoading: ownedStoresQueryLoading,
    error: ownedStoresQueryError
  } = useGetOwnedStoresQuery({});

  const handleTextInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMirrorStoreIdToAdd(event.target.value || '');
  }, []);

  const handleStoreIsOwned = useCallback(() => {
    setShowErrorModal(true);
    if (storeInputRef?.current?.value) {
      storeInputRef.current.value = '';
    }
  }, [setShowErrorModal, storeInputRef])

  const handleAddMirror = useCallback(() => {
    const storeOwned: boolean = ownedStoresData?.store_ids.includes(mirrorStoreIdToAdd);
    setStoreIsOwned(storeOwned);
    storeOwned ? handleStoreIsOwned() : triggerAddMirror({ id: mirrorStoreIdToAdd });
  }, [triggerAddMirror, mirrorStoreIdToAdd, handleStoreIsOwned, ownedStoresData]);

  useEffect(() => {
    if (mirrorMutationData?.error) {
      setShowErrorModal(true);
    }
  }, [mirrorMutationData]);

  useEffect(() => {
    if (mirrorMutationData?.success) {
      setMirrorStoreIdToAdd('');
      if (storeInputRef?.current?.value) {
        storeInputRef.current.value = '';
      }
    }
  }, [mirrorMutationData]);

  return (
    <>
      <div>
        <h1>
          MIRRORS
        </h1>
      </div>
      {mirrorsLoaded &&
        <div style={{ display: "flex" }}>
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            inlineSize: 'min-content',
            whiteSpace: 'nowrap'
          }}>
            <Tooltip content={<FormattedMessage id={"add-store-mirror"} />} >
              <p>
                <FormattedMessage id={"store-id"} />
              </p>
            </Tooltip>
          </div>
          <div style={{ width: "100%", marginLeft: '10px', marginRight: '10px' }}>
            <TextInput ref={storeInputRef} onChange={handleTextInputChange} />
          </div>
          <Button
            disabled={mirrorStoreIdToAdd.length < 64 || mirrorStoreIdToAdd.length > 64}
            isProcessing={mirrorMutationLoading || ownedStoresQueryLoading}
            onClick={() => handleAddMirror()}
            style={{ inlineSize: 'min-content', whiteSpace: 'nowrap' }}
          >
            <FormattedMessage id={"add-store-mirror"} />
          </Button>
        </div>
      }
      <Spacer size={10} />
      <SubscriptionsTable setTableContentsLoaded={setMirrorsLoaded} />
      <AddMirrorErrorModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        errorMessage={
          mirrorMutationData?.error ||
          ownedStoresQueryError ||
          (storeIsOwned && <FormattedMessage id={'you-cannot-mirror-your-own-store'} />)
        }
      />
    </>
  );
}

export { Mirrors }