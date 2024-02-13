import React from 'react';
import { useMemo } from 'react';
import { Card, Label, TextInput } from 'flowbite-react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { setStoreLabel } from '@/store/slices/userOptions';

interface SelectedStoreIdCardProps {
  storeId: string;
}

const SelectedStoreIdCard: React.FC<SelectedStoreIdCardProps> = ({
  storeId,
}: SelectedStoreIdCardProps) => {
  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const label = useMemo(() => {
    return userOptionsStore.storeLabels?.[storeId];
  }, [storeId, userOptionsStore.storeLabels]);

  const handleStoreLabelChange = (event) => {
    dispatch(setStoreLabel({ storeId, label: event.target.value }));
  };

  return (
    <Card>
      <div style={{ display: 'flex' }}>
        <FormattedMessage id="store-id" />:
        <span style={{ marginLeft: 5 }}>{storeId}</span>
      </div>
      <Label htmlFor="store-id">
        <FormattedMessage id={"label"}/>
      </Label>
      <TextInput onChange={handleStoreLabelChange} value={label || ''} />
    </Card>
  );
};

export { SelectedStoreIdCard };
