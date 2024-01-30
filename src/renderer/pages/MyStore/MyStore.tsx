
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {DatalayerStoreManager, EditDatalayerStore} from "@/pages";
import {useSelector} from "react-redux";
import {getStoreToView, getStoreToEdit} from "@/store/slices/myDatalayerStore";
import {Spacer} from '@/components'
import {DatalayerStoreKeysTable} from "@/components/blocks/tables/DatalayerStoreKeysTable";

const SpacerDiv = styled('div')`
  height: 100%;
  width: 100%;
  padding: 10px;
`;

enum WorkFlowSteps {
  DISPLAY_STORES,
  EDIT_STORE,
  VIEW_STORE
}

const MyStore: React.FC = () => {

  const [workFlowStep, setWorkFlowStep] = useState<WorkFlowSteps>(WorkFlowSteps.DISPLAY_STORES);
  const storeIdToEdit = useSelector((state: any) => getStoreToEdit(state));
  const storeIdToView = useSelector((state: any) => getStoreToView(state));

  useEffect(() => {
    if (storeIdToEdit && !storeIdToView){
      setWorkFlowStep(WorkFlowSteps.EDIT_STORE);
    } else if (storeIdToView && !storeIdToEdit){
      setWorkFlowStep(WorkFlowSteps.VIEW_STORE);
    }
  }, [storeIdToView, storeIdToEdit]);

  switch(workFlowStep) {
    case WorkFlowSteps.DISPLAY_STORES: {
      return (
        <>
          <Spacer size={10}/>
          <DatalayerStoreManager/>
          <Spacer size={10}/>
        </>
      );
    }
    case WorkFlowSteps.EDIT_STORE: {
      return (
        <>
          <Spacer size={10}/>
          <span>
            <EditDatalayerStore selectedStoreId={storeIdToEdit}/>
          </span>
          <Spacer size={10}/>
        </>
      );
    }
    case WorkFlowSteps.VIEW_STORE: {
      return (
        <SpacerDiv>
          <DatalayerStoreKeysTable/>
        </SpacerDiv>
      );
    }
  }
};

export { MyStore, WorkFlowSteps };