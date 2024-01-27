
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import React, {useEffect, useState} from "react";
import {SelectDlStore, SelectAndDeployFolder} from "@/pages";
import {useSelector} from "react-redux";
import {getFilesDeployed, getSelectedStoreId} from "@/store/slices/myDatalayerStore";
//import {useSelector} from "react-redux";

const SpacerDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
`;

enum MyStoreStatesEnum {
  SELECT_STORE ,
  SELECT_FOLDER,
  FOLDER_DEPLOYED
}

const MyStore: React.FC = () => {

  const [stateOfMyStoreComponent, setStateOfMyStoreComponent] = useState<MyStoreStatesEnum>(MyStoreStatesEnum.SELECT_STORE);
  const selectedStoreId = useSelector((state: any) => getSelectedStoreId(state));
  const filesDeployed = useSelector((state: any) => getFilesDeployed(state));

  console.log(selectedStoreId, "files deployed:", filesDeployed);

  useEffect(() => {
    if (selectedStoreId && !filesDeployed){
      setStateOfMyStoreComponent(MyStoreStatesEnum.SELECT_FOLDER);
    } else if (selectedStoreId && filesDeployed){
      setStateOfMyStoreComponent(MyStoreStatesEnum.FOLDER_DEPLOYED);
    }
  }, [filesDeployed, selectedStoreId]);


  switch(stateOfMyStoreComponent) {
    case MyStoreStatesEnum.SELECT_STORE: {
      return (
        <SpacerDiv>
          <SelectDlStore/>
        </SpacerDiv>
      );
    }
    case MyStoreStatesEnum.SELECT_FOLDER: {
      return (
        <SpacerDiv>
          <span>
            <SelectAndDeployFolder selectedStoreId={selectedStoreId}/>
          </span>
        </SpacerDiv>
      );
    }
    case MyStoreStatesEnum.FOLDER_DEPLOYED: {
      return (
        <SpacerDiv>
          Todo: Folder Deployed Component
        </SpacerDiv>
      );
    }
    default: {
      return (
        <SpacerDiv>
          <FormattedMessage id="invalid-component-state"/>
        </SpacerDiv>
      );
    }
  }
};

export { MyStore, MyStoreStatesEnum };