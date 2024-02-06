import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {setDeploymentSetting} from "@/store/slices/userOptions";
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

interface DeploymentSettingPayload {
  settingKey: string;
  value: string | number | boolean | null;
}

const DatalayerHost: React.FC = () => {

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'datalayerHost',
      value: event.target.value,
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'datalayerHost',
      value: initialState.deployOptions['datalayerHost']
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.datalayerHost}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions)  ;

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'walletHost',
      value: event.target.value,
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'walletHost',
      value: initialState.deployOptions.walletHost,
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.walletHost}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'certificateFolderPath',
      value: event.target.value,
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'certificateFolderPath',
      value: initialState.deployOptions.certificateFolderPath,
    }
    dispatch(
      setDeploymentSetting(payload)
    );
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
          value={deployOptions.certificateFolderPath}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultWalletId',
      value: event.target.value,
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultWalletId',
      value: initialState.deployOptions.defaultWalletId,
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.defaultWalletId || ''}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultFee',
      value: event.target.value,
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultFee',
      value: initialState.deployOptions.defaultFee,
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.defaultFee || ''}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultMirrorCoinAmount',
      value: event.target.value
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'defaultMirrorCoinAmount',
      value: initialState.deployOptions.defaultMirrorCoinAmount,
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.defaultMirrorCoinAmount || ''}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'maximumRpcPayloadSize',
      value: event.target.value
    }
      dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'maximumRpcPayloadSize',
      value: initialState.deployOptions.maximumRpcPayloadSize,
    }
    dispatch(setDeploymentSetting(payload),);
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
          value={deployOptions.maximumRpcPayloadSize || ''}
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
  const userOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'web2GatewayPort',
      value: event.target.value
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'web2GatewayPort',
      value: initialState.deployOptions.web2GatewayPort,
    }
    dispatch(setDeploymentSetting(payload));
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'web2GatewayHost',
      value: event.target.value
    }
      dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'web2GatewayHost',
      value: initialState.deployOptions.web2GatewayHost,
    }
    dispatch(setDeploymentSetting(payload));
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
          value={deployOptions.web2GatewayHost}
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'mirrorUrlOverride',
      value: event.target.value
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'mirrorUrlOverride',
      value: initialState.deployOptions.mirrorUrlOverride,
    }
    dispatch(setDeploymentSetting(payload));
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
          type="text"
          value={deployOptions.mirrorUrlOverride || ''}
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
  const userOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback((event) => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'numFilesProcessedPerBatch',
      value: event.target.value
    }
      dispatch(setDeploymentSetting(payload));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'numFilesProcessedPerBatch',
      value: initialState.deployOptions.numFilesProcessedPerBatch,
    }
    dispatch(setDeploymentSetting(payload));
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
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'verbose',
      value: !deployOptions.verbose
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, deployOptions.verbose]);

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
          checked={deployOptions.verbose}
        />
      </div>
      <Spacer size={5}/>
    </>
  );
}

const IgnoreOrphans: React.FC = () => {

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'ignoreOrphans',
      value: !deployOptions.ignoreOrphans
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, deployOptions.ignoreOrphans]);

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
          checked={deployOptions.ignoreOrphans}
        />
      </div>
      <Spacer size={5}/>
    </>
  );
}

const ForceIp4Mirror: React.FC = () => {

  const dispatch = useDispatch();
  const deployOptions = useSelector((state: any) => state.userOptions.deployOptions);

  const handleOnChange = useCallback(() => {
    const payload: DeploymentSettingPayload = {
      settingKey: 'forceIp4Mirror',
      value: !deployOptions.forceIp4Mirror
    }
    dispatch(setDeploymentSetting(payload));
  }, [dispatch, deployOptions.forceIp4Mirror]);

  return (
    <>
      <div className="flex items-center gap-2">
        <LabelBox>
          <Label htmlFor="forceIp4Mirror">
            <FormattedMessage id="force-ip4-mirror" />
          </Label>
        </LabelBox>
        <Checkbox
          id="forceIp4Mirror"
          onChange={handleOnChange}
          checked={deployOptions.forceIp4Mirror}
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
      <ForceIp4Mirror />
      <IgnoreOrphans />
      <Verbose />
    </Card>
  );
}

export type { DeploymentSettingPayload };
export { DeploymentSettings };