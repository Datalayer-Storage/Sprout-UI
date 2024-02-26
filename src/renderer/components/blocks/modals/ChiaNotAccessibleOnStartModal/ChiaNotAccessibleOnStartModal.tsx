import {Button, Modal} from "flowbite-react";
import React, {useCallback} from "react";
import {FormattedMessage} from "react-intl";
import {FauxLinkButton} from "@/components";

interface ChiaNotAccessibleOnStartModalProps {
  onRetry: () => void;
}
const ChiaNotAccessibleOnStartModal: React.FC<ChiaNotAccessibleOnStartModalProps> = ({onRetry}) => {

  const handleOpenChiaDownloads = useCallback(() => {
    window.open("https://www.chia.net/downloads/", 'Chia Downloads', "nodeIntegration=no");
  }, []);

  return (
    <Modal show={true} dismissible={false}>
      <div className={'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5'}>
        <p className={'text-xl font-medium text-gray-900 dark:text-white'}>
          <FormattedMessage id={"ensure-chia-services-are-running-and-accessible"}/>
        </p>
      </div>
      <Modal.Body>
        <div className={'space-y-6'}>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage id={"sprout-ui-cannot-detect-a-running-chia-instance"}/>
          </p>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage
              id={"please-check-that-chia-is-running-ports-8562-and-9256-are-not-blocked-" +
                "and-sprout-ui-has-permission-to-accept-incoming-connections"}/>
          </p>
          <p className={"text-base leading-relaxed text-gray-500 dark:text-gray-400"}>
            <FormattedMessage id={"if-you-need-to-install-chia-downloads-for-all-platforms-can-be-found-at"}/>
            {' '}
            <FauxLinkButton onClick={handleOpenChiaDownloads}>
              <FormattedMessage id={"the-official-downloads-page"}/>
            </FauxLinkButton>
            {'.'}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onRetry}>
          <FormattedMessage id={"chia-is-running-retry"}/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ChiaNotAccessibleOnStartModal };