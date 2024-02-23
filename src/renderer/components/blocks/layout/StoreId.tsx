import React, {useMemo} from "react";
import {Button, Tooltip} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";

interface StoreIdProps {
  storeId: string;
  setStoreIdToEdit?: (storeId: string) => void;
}

const StoreId: React.FC<StoreIdProps> = ({storeId, setStoreIdToEdit}) => {

  const userOptions = useSelector((state: any) => state.userOptions);

  const storeLabel = useMemo(() => {
    return userOptions.storeLabels?.[storeId];
  }, [storeId, userOptions.storeLabels]);

  const IDWithEditTooltip: React.FC = () => {
    return (
      <Tooltip
        arrow={false}
        style={'light'}
        animation="duration-500"
        content={
          <div className={'flex'}>
            {
              setStoreIdToEdit &&
                <>
                  <Button onClick={() => setStoreIdToEdit(storeId)}>
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
    );
  }

  return (
    <>
      {
        (setStoreIdToEdit || storeLabel)
        ? <IDWithEditTooltip/>
        : <div style={{width: '100%', display: 'flex'}}>{storeId}</div>
      }
    </>
  );
}

export {StoreId}