import {Spacer, SubscriptionsTable} from "@/components";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Spinner, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useSubscribeMutation} from "@/api/ipc/datalayer";
import {AddSubscriptionErrorModal} from "@/components";

const Subscriptions: React.FC = () => {

  const [subscriptionStoreIdToAdd, setSubscriptionStoreIdToAdd] = useState<string>('');
  const [subscriptionsLoaded, setSubscriptionsLoaded] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const [triggerSubscribe, {
    data: subscribeMutationData,
    isLoading: subscribeMutationLoading
  }] = useSubscribeMutation();

  const handleTextInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionStoreIdToAdd(event.target.value || '');
  }, []);

  const handleAddSubscription = useCallback(() => {
    triggerSubscribe({id: subscriptionStoreIdToAdd});
  }, [triggerSubscribe, subscriptionStoreIdToAdd]);

  useEffect(() => {
    if (subscribeMutationData?.error){
      setShowErrorModal(true);
    }
  }, [subscribeMutationData]);

  useEffect(() => {
    if (subscribeMutationData?.success) {
      setSubscriptionStoreIdToAdd('');
    }
  }, [subscribeMutationData]);

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
            <TextInput onChange={handleTextInputChange}/>
          </div>
          <Button
            disabled={subscriptionStoreIdToAdd.length < 64 || subscriptionStoreIdToAdd.length > 64}
            onClick={() => handleAddSubscription()}
            style={{inlineSize: 'min-content', whiteSpace: 'nowrap'}}
          >
            {subscribeMutationLoading && <Spinner/>}
            <FormattedMessage id={"add-store-subscription"}/>
          </Button>
        </div>
      }
      <Spacer size={10}/>
      <SubscriptionsTable setTableContentsLoaded={setSubscriptionsLoaded}/>
      <AddSubscriptionErrorModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        errorMessage={subscribeMutationData?.error}
      />
    </>
  );
}

export {Subscriptions}