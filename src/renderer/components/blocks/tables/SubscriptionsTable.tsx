import React, {useEffect, useMemo} from "react";
import {DataTable, LoadingSpinnerCard} from "@/components";
import {useGetSubscriptionsQuery} from "@/api/ipc/datalayer";
import {FormattedMessage} from "react-intl";

interface SubscriptionsTableProps {}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({}) => {

  const storeId: string = "storeId";
  const {data: subscriptionsData, isLoading: subscriptionsLoading, error: getSubscriptionsError}
    = useGetSubscriptionsQuery({});

  const columns = useMemo(() => [
    {
      title: <FormattedMessage id={"subscription-store-id"}/>,
      key: storeId,
    }
  ], []);

  useEffect(() => {
    if (!subscriptionsLoading){
      console.log('subscriptionsData:', subscriptionsData);
    }
  }, [subscriptionsData, subscriptionsLoading]);

  const data = [{storeId: "foo"}, {storeId: "bar"}];

  return (
    <>
      {subscriptionsLoading
        ? <LoadingSpinnerCard />
        : // not loading, handle error or display data
        (getSubscriptionsError || !subscriptionsData.success
          ? <div>getSubscriptionsError</div>
          : <DataTable columns={columns} data={data} isLoading={subscriptionsLoading}/>
        )
      }
    </>
  );
}

export { SubscriptionsTable }