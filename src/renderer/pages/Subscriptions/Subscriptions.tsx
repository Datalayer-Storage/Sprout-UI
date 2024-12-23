import {Spacer, SubscriptionsTable} from "@/components";
import React, {useCallback, useRef, useState} from "react";
import {Button, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useGetOwnedStoresQuery, useSubscribeMutation} from "@/api/ipc/datalayer";
import {AddSubscriptionErrorModal} from "@/components";
import {StoreSubscriptionSuccessModal} from "@/components/blocks/modals/StoreSubscriptionSucessModal";

const Subscriptions: React.FC = () => {

  const [subscriptionStoreIdToAdd, setSubscriptionStoreIdToAdd] = useState<string>('');
  const [subscriptionsLoaded, setSubscriptionsLoaded] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [storeIsOwned, setStoreIsOwned] = useState(false);

  const storeInputRef = useRef<HTMLInputElement>(null);

  const [triggerSubscribe, {
    data: subscribeMutationData,
    isLoading: subscribeMutationLoading,
    error: subscribeRtkQueryError
  }] = useSubscribeMutation();
  const {
    data: ownedStoresData,
    isLoading: ownedStoresQueryLoading,
    error: ownedStoresQueryError
  } = useGetOwnedStoresQuery({});

  // Regex to check if the string is a valid URL
  const storeIdPattern: RegExp = new RegExp(/^[a-zA-Z0-9]{64}$/);

  const handleTextInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionStoreIdToAdd(event.target.value || '');
  }, []);

  const handleStoreIsOwned = useCallback(() => {
    setShowErrorModal(true);
    if (storeInputRef?.current?.value){
      storeInputRef.current.value = '';
    }
  }, [setShowErrorModal, storeInputRef])

  const handleAddSubscription = useCallback(async () => {
    const storeOwned: boolean = ownedStoresData?.store_ids.includes(subscriptionStoreIdToAdd);
    setStoreIsOwned(storeOwned);
    if (storeOwned){
      handleStoreIsOwned()
    }else{
      const subscribeResult = await triggerSubscribe({id: subscriptionStoreIdToAdd});
      // @ts-ignore
      if (subscribeResult?.data?.success){
        setShowSuccessModal(true);
      }else{
        setShowErrorModal(true);
      }
    }

  }, [triggerSubscribe, subscriptionStoreIdToAdd, handleStoreIsOwned, ownedStoresData]);

  const handleSubscriptionSuccessModalClose = () => {
    setShowSuccessModal(false);
    setSubscriptionStoreIdToAdd('');
    if (storeInputRef?.current?.value) {
      storeInputRef.current.value = '';
    }
  }

  return (
    <>
      {subscriptionsLoaded &&
        <div style={{display: "flex"}}>
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            inlineSize: 'min-content',
            whiteSpace: 'nowrap'
          }}>
            <Tooltip content={<FormattedMessage id={"add-store-subscription"}/>}>
              <p>
                <FormattedMessage id={"store-id"}/>
              </p>
            </Tooltip>
          </div>
          <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
            <TextInput ref={storeInputRef} onChange={handleTextInputChange}/>
          </div>
          <Button
            disabled={!storeIdPattern.test(subscriptionStoreIdToAdd)}
            isProcessing={subscribeMutationLoading || ownedStoresQueryLoading}
            onClick={() => handleAddSubscription()}
            style={{inlineSize: 'min-content', whiteSpace: 'nowrap'}}
          >
            <FormattedMessage id={"add-store-subscription"}/>
          </Button>
        </div>
      }
      <Spacer size={10}/>
      <SubscriptionsTable setTableContentsLoaded={setSubscriptionsLoaded}/>
      <AddSubscriptionErrorModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        errorMessage={
          subscribeMutationData?.error ||
          subscribeRtkQueryError ||
          ownedStoresQueryError ||
          (storeIsOwned && <FormattedMessage id={'you-cannot-subscribe-to-your-own-store'}/>)
        }
      />
      {
        showSuccessModal &&
        <StoreSubscriptionSuccessModal
          storeId={subscriptionStoreIdToAdd}
          onClose={handleSubscriptionSuccessModalClose}
        />
      }
    </>
  );
}

export {Subscriptions}