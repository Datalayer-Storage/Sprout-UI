import React from "react";
import {Card, Spinner} from "flowbite-react";
import {FormattedMessage} from "react-intl";

const LoadingDlStoresSpinner: React.FC = () => {

  return (
    <>
      <Card>
        <Spinner/>
        <FormattedMessage id={"loading-your-stores"}/>
      </Card>
    </>
  );
}

export { LoadingDlStoresSpinner };