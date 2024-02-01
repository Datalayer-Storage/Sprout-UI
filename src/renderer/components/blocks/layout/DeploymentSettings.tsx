import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {
  setCertificateFolderPath,
  setDatalayerHost, setDefaultFee, setDefaultMirrorCoinAmount,
  setDefaultWalletId,
  setWalletHost
} from "@/store/slices/userOptions";
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import {Button, Card, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {Spacer} from "@/components";
import styled from "styled-components";

const SettingsLayout = styled('div') `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const textInputStyle = {width: '500px', marginLeft: '10px', marginRight: '10px'}

const DatalayerHost: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setDatalayerHost(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setDatalayerHost(initialState.datalayerHost));
  }, [dispatch]);

  return (
    <>
      <SettingsLayout>
        <Label htmlFor="datalayerHost">
          <FormattedMessage id="datalayer-host" />
        </Label>
        <TextInput
          id="datalayerHost"
          type="text"
          value={userOptionsStore.datalayerHost}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingsLayout>
      <Spacer size={5}/>
    </>
  );
}

const WalletHost: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setWalletHost(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setWalletHost(initialState.walletHost));
  }, [dispatch]);

  return (
    <>
      <SettingsLayout>
        <Label>
          <FormattedMessage id="wallet-host"/>
        </Label>
        <TextInput
          type="text"
          value={userOptionsStore.walletHost}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
        <Spacer size={5}/>
      </SettingsLayout>

    </>
  );
}

const CertificateFolderPath: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setCertificateFolderPath(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setCertificateFolderPath(initialState.certificateFolderPath));
  }, [dispatch]);

  return (
    <>
      <Label htmlFor="certficateFolderPath">
        <FormattedMessage id="certificate-folder-path" />
      </Label>
      <TextInput
        id="certificateFolderPath"
        type="text"
        value={userOptionsStore.certificateFolderPath}
        onChange={handleOnChange}
        required
      />
      <Button onClick={handleReset}>
        <FormattedMessage id="reset"/>
      </Button>
      <Spacer size={5}/>
    </>
  );
}

const DefaultWalletId: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setDefaultWalletId(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setDefaultWalletId(initialState.defaultWalletId));
  }, [dispatch]);

  return (
    <>
      <Label htmlFor="defualtWalletId">
        <FormattedMessage id="default-wallet-id" />
      </Label>
      <TextInput
        id="defaultWalletId"
        type="text"
        value={userOptionsStore.defaultWalletId}
        onChange={handleOnChange}
        required
      />
      <Button onClick={handleReset}>
        <FormattedMessage id="reset"/>
      </Button>
      <Spacer size={5}/>
    </>
  );
}

const DefaultMirrorCoinAmount: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setDefaultMirrorCoinAmount(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setDefaultMirrorCoinAmount(initialState.defaultMirrorCoinAmount));
  }, [dispatch]);

  return (
    <>
      <Label htmlFor="defualtMirrorCoinAmount">
        <FormattedMessage id="default-mirror-coin-amount" />
      </Label>
      <TextInput
        id="defaultMirrorCoinAmount"
        type="text"
        value={userOptionsStore.defaultMirrorCoinAmount}
        onChange={handleOnChange}
        required
      />
      <Button onClick={handleReset}>
        <FormattedMessage id="reset"/>
      </Button>
      <Spacer size={5}/>
    </>
  );
}

const DefaultFee: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setDefaultFee(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setDefaultFee(initialState.defaultFee));
  }, [dispatch]);

  return (
    <>
      <Label htmlFor="defualtFee">
        <FormattedMessage id="default-fee" />
      </Label>
      <TextInput
        id="defualtFee"
        type="text"
        value={userOptionsStore.defaultFee}
        onChange={handleOnChange}
        required
      />
      <Button onClick={handleReset}>
        <FormattedMessage id="reset"/>
      </Button>
      <Spacer size={5}/>
    </>
  );
}

const DeploymentSettings: React.FC = () => {
  return (
    <Card>
      <h5>
        <FormattedMessage id="deployment-settings" />
      </h5>
      <Spacer size={5}/>
      <DatalayerHost />
      <WalletHost />
      <CertificateFolderPath />
      <DefaultWalletId />
      <DefaultFee />
      <DefaultMirrorCoinAmount />
    </Card>
  );
}

export { DeploymentSettings };