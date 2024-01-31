import React from "react";
import {Card} from "flowbite-react";
import {FormattedMessage} from "react-intl";

interface SelectedStoreIdCardProps {
  storeId: string;
}

const SelectedStoreIdCard: React.FC<SelectedStoreIdCardProps> = (props: SelectedStoreIdCardProps) => {
  return(
    <Card>
      <FormattedMessage id="selected-store-id"/>
      <div>{props.storeId}</div>
    </Card>
  );
}

export { SelectedStoreIdCard };
