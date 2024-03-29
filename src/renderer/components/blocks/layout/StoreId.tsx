import React, {useMemo, useState} from "react";
import {Button, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {SetStoreLabelModal} from "@/components";

interface StoreIdProps {
  storeId: string;
  allowLabelEditing: boolean
}

const StoreId: React.FC<StoreIdProps> = ({storeId, allowLabelEditing}) => {

  const userOptions = useSelector((state: any) => state.userOptions);
  const [showEditStoreLabelModal, setShowStoreLabelModal] = useState<boolean>(false);

  const storeLabel = useMemo(() => {
    return userOptions.storeLabels?.[storeId];
  }, [storeId, userOptions.storeLabels]);

  const IdWithEditTooltip: React.FC = () => {
    return (
      <>
        <Tooltip
          arrow={false}
          style={'light'}
          animation="duration-500"
          content={
            <div className={'flex'}>
              {
                allowLabelEditing &&
                <>
                  <Button onClick={() => setShowStoreLabelModal(true)}>
                    <FormattedMessage id={"set-store-label"}/>
                  </Button>
                </>
              }
              <div style={{
                marginLeft: '10px',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              >
                {storeLabel && <p>{storeId}</p>}
              </div>
            </div>
          }
        >
          {storeLabel || storeId}
        </Tooltip>
      </>
    );
  }

  return (
    <>
      {
        (allowLabelEditing || storeLabel)
        ? <IdWithEditTooltip/>
        : <div style={{width: '100%', display: 'flex'}}>{storeId}</div>
      }
      {
        showEditStoreLabelModal && allowLabelEditing &&
        <SetStoreLabelModal
          storeId={storeId}
          onClose={() => setShowStoreLabelModal(false)}
        />
      }
    </>
  );
}

export {StoreId}
