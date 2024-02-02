import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {
  setCertificateFolderPath,
  setDatalayerHost, setDefaultFee, setDefaultMirrorCoinAmount,
  setDefaultWalletId, setMaximumRpcPayloadSize, setMirrorUrlOverride, setNumFilesProcessedPerBatch,
  setWalletHost, setWeb2GatewayHost, setWeb2GatewayPort, toggleIgnoreOrphans, toggleVerbose
} from "@/store/slices/userOptions";
import initialState from "@/store/slices/userOptions/userOptions.initialstate";
import {Button, Card, Checkbox, Label, TextInput} from "flowbite-react";
import {FormattedMessage} from "react-intl";
import {Spacer} from "@/components";
import styled from "styled-components";

const SettingHorizontalFlexBox = styled('div') `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
`;

const LabelBox = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: right;
  width: 200px;
`;

const textInputStyle = {
  maxWidth: '100%',
  width: '500px',
  marginLeft: '10px',
  marginRight: '10px',
}

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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="datalayerHost">
            <FormattedMessage id="datalayer-host" />
          </Label>
        </LabelBox>
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
      </SettingHorizontalFlexBox>
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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="walletHost">
            <FormattedMessage id="wallet-host" />
          </Label>
        </LabelBox>
        <TextInput
          id="walletHost"
          type="text"
          value={userOptionsStore.walletHost}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="certficateFolderPath">
            <FormattedMessage id="certificate-folder-path" />
          </Label>
        </LabelBox>
        <TextInput
          id="certificateFolderPath"
          type="text"
          value={userOptionsStore.certificateFolderPath}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="defualtWalletId">
            <FormattedMessage id="default-wallet-id" />
          </Label>
        </LabelBox>
        <TextInput
          id="defaultWalletId"
          type="number"
          value={userOptionsStore.defaultWalletId}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="defualtFee">
            <FormattedMessage id="default-fee" />
          </Label>
        </LabelBox>
        <TextInput
          id="defualtFee"
          type="number"
          value={userOptionsStore.defaultFee}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
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
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="defualtMirrorCoinAmount">
            <FormattedMessage id="default-mirror-coin-amount"/>
          </Label>
        </LabelBox>
        <TextInput
          id="defaultMirrorCoinAmount"
          type="number"
          value={userOptionsStore.defaultMirrorCoinAmount}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const MaximumRpcPayloadSize: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
      dispatch(setMaximumRpcPayloadSize(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setMaximumRpcPayloadSize(initialState.maximumRpcPayloadSize));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="maximumRpcPayloadSize">
            <FormattedMessage id="maximum-rpc-payload-size"/>
          </Label>
        </LabelBox>
        <TextInput
          id="maximumRpcPayloadSize"
          type="number"
          value={userOptionsStore.maximumRpcPayloadSize || ''}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const Web2GatewayPort: React.FC = () => {

  const dispatch = useDispatch();
  const userOptions = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
      dispatch(setWeb2GatewayPort(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setWeb2GatewayPort(initialState.web2GatewayPort));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="web2GatewayPortweb2GatewayPort">
            <FormattedMessage id="web-2-gateway-port" />
          </Label>
        </LabelBox>
        <TextInput
          id="web2GatewayPort"
          type="number"
          value={userOptions.web2GatewayPort || ''}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const Web2GatewayHost: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
      dispatch(setWeb2GatewayHost(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setWeb2GatewayHost(initialState.web2GatewayHost));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="web2GatewayHost">
            <FormattedMessage id="web-2-gateway-host" />
          </Label>
        </LabelBox>
        <TextInput
          id="web2GatewayHost"
          type="text"
          value={userOptionsStore.web2GatewayHost}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const MirrorUrlOverride: React.FC = () => {

  const dispatch = useDispatch();
  const mirrorUrlOverride = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
    dispatch(setMirrorUrlOverride(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setMirrorUrlOverride(initialState.mirrorUrlOverride));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="mirrorUrlOverride">
            <FormattedMessage id="mirror-url-override" />
          </Label>
        </LabelBox>
        <TextInput
          id="mirrorUrlOverride"
          type="number"
          value={mirrorUrlOverride || ''}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const NumFilesProcessedPerBatch: React.FC = () => {

  const dispatch = useDispatch();
  const userOptions = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback((event) => {
      dispatch(setNumFilesProcessedPerBatch(event.target.value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setNumFilesProcessedPerBatch(initialState.numFilesProcessedPerBatch));
  }, [dispatch]);

  return (
    <>
      <SettingHorizontalFlexBox>
        <LabelBox>
          <Label htmlFor="numFilesProcessedPerBatch">
            <FormattedMessage id="num-files-processed-per-batch" />
          </Label>
        </LabelBox>
        <TextInput
          id="numFilesProcessedPerBatch"
          type="number"
          value={userOptions.numFilesProcessedPerBatch || ''}
          onChange={handleOnChange}
          style={textInputStyle}
          required
        />
        <Button onClick={handleReset}>
          <FormattedMessage id="reset"/>
        </Button>
      </SettingHorizontalFlexBox>
      <Spacer size={5}/>
    </>
  );
}

const Verbose: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback(() => {
    dispatch(toggleVerbose());
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center gap-2">
        <LabelBox>
          <Label htmlFor="verbose">
            <FormattedMessage id="verbose" />
          </Label>
        </LabelBox>
        <Checkbox
          id="verbose"
          onChange={handleOnChange}
          checked={userOptionsStore.verbose}
        />
      </div>
      <Spacer size={5}/>
    </>
  );
}

const IgnoreOrphans: React.FC = () => {

  const dispatch = useDispatch();
  const userOptionsStore = useSelector((state: any) => state.userOptions);

  const handleOnChange = useCallback(() => {
    dispatch(toggleIgnoreOrphans());
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center gap-2">
        <LabelBox>
          <Label htmlFor="ignoreOrphans">
            <FormattedMessage id="ignore-orphans" />
          </Label>
        </LabelBox>
        <Checkbox
          id="ignoreOrphans"
          onChange={handleOnChange}
          checked={userOptionsStore.ignoreOrphans}
        />
      </div>
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
      <MaximumRpcPayloadSize />
      <Web2GatewayPort />
      <Web2GatewayHost />
      <MirrorUrlOverride />
      <NumFilesProcessedPerBatch />
      <IgnoreOrphans />
      <Verbose />
    </Card>
  );
}

export { DeploymentSettings };