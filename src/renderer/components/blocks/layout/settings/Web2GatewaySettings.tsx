import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {setFallbackStoreProvider} from "@/store/slices/userOptions";
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import {Button, Card, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";

const Web2GatewaySettings: React.FC = () => {
  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setFallbackStoreProvider(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setFallbackStoreProvider(initialState.fallbackStoreProvider));
  }, [dispatch]);

  return (
    <Card>
      <h5>
        <FormattedMessage id="web2-gateway-settings" />
      </h5>
      <Label htmlFor="datalayerHost">
        <FormattedMessage id="fallback-store-provider" />
      </Label>
      <TextInput
        id="datalayerHost"
        type="text"
        value={userOptionsStore.fallbackStoreProvider}
        onChange={handleOnChange}
        required
      />
      <Button onClick={handleReset}>
        <FormattedMessage id="reset"/>
      </Button>
    </Card>
  );
};

export { Web2GatewaySettings };