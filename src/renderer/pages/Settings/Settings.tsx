import { Button, TextInput, Card, Label } from 'flowbite-react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccessKey,
  getAccessSecret,
  setAccessKey,
  setAccessSecret,
  setFallbackStoreProvider,
} from '@/store/slices/userOptions';
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import { Spacer, DeploymentSettings } from '@/components';

const SettingsDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

interface SettingsProps {}

interface AccessSettingsProps {}


const Web2GatewaySettings: React.FC<AccessSettingsProps> = () => {
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

const AccessSettings: React.FC<AccessSettingsProps> = () => {
  const dispatch = useDispatch();
  const accessKeyTextInput = useRef<HTMLInputElement>(null);
  const accessSecretTextInput = useRef<HTMLInputElement>(null);
  const accessKey = useSelector((state: any) => getAccessKey(state));
  const accessSecret = useSelector((state: any) => getAccessSecret(state));

  useEffect(() => {
    if (accessKeyTextInput.current && accessSecretTextInput.current) {
      accessKeyTextInput.current.value = accessKey;
      accessSecretTextInput.current.value = accessSecret;
    }
  }, [accessKeyTextInput, accessSecretTextInput, accessSecret, accessKey]);

  const onSave = useCallback(() => {
    if (accessKeyTextInput.current && accessSecretTextInput.current) {
      if (
        accessKeyTextInput.current.value != '' &&
        accessSecretTextInput.current.value != ''
      ) {
        dispatch(setAccessKey(accessKeyTextInput.current.value as string));
        dispatch(
          setAccessSecret(accessSecretTextInput.current.value as string),
        );
      }
    }
  }, [dispatch]);

  return (
    <Card>
      <h5>
        <FormattedMessage id="data-layer-storage-settings" />
      </h5>
      <div>
        <div className="mb-2 block">
          <FormattedMessage id="access-key" />
        </div>
        <TextInput
          id="acessKey"
          type="text"
          ref={accessKeyTextInput}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <FormattedMessage id="access-secret" />
        </div>
        <TextInput
          id="accessSecret"
          type="text"
          ref={accessSecretTextInput}
          required
        />
      </div>
      <div style={{ height: '20px' }} />
      <Button type="submit" onClick={onSave} style={{ width: '100%' }}>
        <FormattedMessage id="save" />
      </Button>
    </Card>
  );
};

const Settings: React.FC<SettingsProps> = () => {
  return (
    <SettingsDiv>
      <div style={{ width: '100%' }}>
        <Web2GatewaySettings />
        <Spacer size={10} />
        <AccessSettings />
        <Spacer size={10} />
        <DeploymentSettings />
      </div>
    </SettingsDiv>
  );
};

export { Settings };
