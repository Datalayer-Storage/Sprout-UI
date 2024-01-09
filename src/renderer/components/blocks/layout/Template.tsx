import { ErrorBoundary } from '../../../pages';
import { LeftNav } from './LeftNav';
import styled, { withTheme } from 'styled-components';
import { Outlet } from 'react-router-dom';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftNavAside = styled('aside')`
  width: 270px;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

const Template = withTheme(() => {
  return (
    <ErrorBoundary>
      <>
        <AppContainer id="app">
          <BodyContainer id="body">
            <LeftNavAside>
              <LeftNav />
            </LeftNavAside>
            <ContentContainer id="content">
              <>
                {/* 100% - header */}
                <div style={{ height: 'calc(100% - 64px)', overflowY: 'auto' }}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </div>
              </>
            </ContentContainer>
          </BodyContainer>
        </AppContainer>
      </>
    </ErrorBoundary>
  );
});

export { Template };
