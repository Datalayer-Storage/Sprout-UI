import {Spacer, SubscriptionsTable} from "@/components";
import {useCallback, useState} from "react";
import {Button, TextInput, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";

const Subscriptions: React.FC = () => {

  const [subscriptionsLoaded, setSubscriptionsLoaded] = useState<boolean>(false);

  const handleAddSubscription = useCallback(() => {

  }, [])

  return (
    <>
      {subscriptionsLoaded &&
        <div style={{display: "flex"}}>
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent:'center',
            inlineSize: 'min-content',
            whiteSpace: 'nowrap'}}>
            <Tooltip content={<FormattedMessage id={"add-store-subscription-tooltip"}/>}>
              <p>
                <FormattedMessage id={"store-id-to-subscribe-to"}/>
              </p>
            </Tooltip>
          </div>
          <div style={{width: "100%", marginLeft: '10px', marginRight: '10px'}}>
            <TextInput/>
          </div>
          <Button
            onClick={handleAddSubscription}
            style={{inlineSize: 'min-content', whiteSpace: 'nowrap'}}>
            <FormattedMessage id={"add-store-subscription"}/>
          </Button>
        </div>
      }
      <Spacer size={10}/>
      <SubscriptionsTable setTableContentsLoaded={setSubscriptionsLoaded}/>
    </>
  );
}

export {Subscriptions}