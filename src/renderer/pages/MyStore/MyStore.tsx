
import styled from "styled-components";
import React, {useCallback, useEffect, useState} from "react";
import {DatalayerStoreManager, EditDatalayerStore} from "@/pages";
import {useDispatch, useSelector} from "react-redux";
import {
  getStoreToView,
  getStoreToEdit,
  setStoreIdToView,
  setStoreIdToEdit
} from "@/store/slices/myDatalayerStore";
import {Spacer} from '@/components'
import {DatalayerStoreKeysTable} from "@/components/blocks/tables/DatalayerStoreKeysTable";
import {FormattedMessage} from "react-intl";

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
  const dispatch = useDispatch();
  const [workFlowStep, setWorkFlowStep] = useState<WorkFlowSteps>(WorkFlowSteps.DISPLAY_STORES);
  const storeIdToEdit = useSelector((state: any) => getStoreToEdit(state));
  const storeIdToView = useSelector((state: any) => getStoreToView(state));

  const handleBackToMyStores = useCallback(() => {
    dispatch(setStoreIdToEdit(''));
    dispatch(setStoreIdToView(''));
  }, [dispatch]);

  useEffect(() => {
    if (storeIdToEdit && !storeIdToView){
      setWorkFlowStep(WorkFlowSteps.EDIT_STORE);
    } else if (storeIdToView && !storeIdToEdit){
      setWorkFlowStep(WorkFlowSteps.VIEW_STORE);
    } else if (!storeIdToView && !storeIdToEdit){
      setWorkFlowStep(WorkFlowSteps.DISPLAY_STORES);
    }
  }, [storeIdToView, storeIdToEdit]);

  const backToMyStoresLink =
    <>
      <a href="#"
        
         className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
         onClick={() => handleBackToMyStores()}>
        <FormattedMessage id="back-to-my-stores"/>
      </a>
    </>

  switch (workFlowStep) {
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
        <div style={{ textAlign: 'left', margin: 10 }}>
          {backToMyStoresLink}
          <Spacer size={10} />
          <span>
            <EditDatalayerStore selectedStoreId={storeIdToEdit} />
          </span>
          <Spacer size={10} />
        </div>
      );
    }
    case WorkFlowSteps.VIEW_STORE: {
      return (
        <div style={{ textAlign: 'left', margin: 10 }}>
          {backToMyStoresLink}
          <SpacerDiv>
            <DatalayerStoreKeysTable />
          </SpacerDiv>
        </div>
      );
    }
  }
};

export {MyStore, WorkFlowSteps};