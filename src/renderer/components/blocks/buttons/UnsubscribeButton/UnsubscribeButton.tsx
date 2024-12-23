import {ConfirmUnsubscribeModal, FauxLinkButton} from "@/components";
import {FormattedMessage} from "react-intl";
import React, {useState} from "react";
import _ from 'lodash';
import {useSelector} from "react-redux";
import {Spinner} from "flowbite-react";

interface UnsubscribeButtonProps {
  storeId: string
}

const UnsubscribeButton: React.FC<UnsubscribeButtonProps> = ({storeId}: UnsubscribeButtonProps) => {

  const unsubscribingStores = useSelector((state: any) => state.app.unsubscribingStores);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState<boolean>(false);

  return(
    <>
      {
        _.isNil(unsubscribingStores[storeId]) ?
          <FauxLinkButton onClick={() => setShowUnsubscribeModal(true)}>
            <FormattedMessage id={'unsubscribe'}/>
          </FauxLinkButton>
          :
          <div className={'flex items-center justify-center whitespace-nowrap space-x-2'}>
            <p className={'font-medium text-gray-500'}>
              <FormattedMessage id={'unsubscribing'}/>
            </p>
            <Spinner size={'sm'}/>
          </div>
      }
      {
        showUnsubscribeModal &&
        <ConfirmUnsubscribeModal
          storeId={storeId}
          onClose={() => setShowUnsubscribeModal(false)}
        />
      }
    </>
  );
}

export { UnsubscribeButton };