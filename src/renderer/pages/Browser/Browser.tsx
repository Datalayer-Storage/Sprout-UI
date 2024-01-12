import { useState, useCallback, useRef, useEffect } from 'react';
import { WebView } from "@/components/blocks/layout/WebView";
import { NavigationBar } from "./NavigationBar";
import { WebviewTag } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import {
  visitPage,
  PageState,
  VisitPagePayload,
  selectCurrentPage,
  selectDefaultPage,
} from '@/store/slices/browser';

const Browser: React.FC = () => {
  const dispatch = useDispatch();
  const webviewRef = useRef<WebviewTag>(null);
  const currentPage = useSelector((state: any) => selectCurrentPage(state));
  const defaultPage = useSelector((state: any) => selectDefaultPage(state));
  const [addressBar, setAddressBar] = useState('');

  useEffect(() => {
    if (!currentPage) {
      dispatch(visitPage(defaultPage));
      setAddressBar(defaultPage.url);
    }
  }, [currentPage, defaultPage, dispatch]);

  const handleUpdateAddressBar = useCallback((event) => {
    setAddressBar(event.target.value);
  }, [setAddressBar]);

  const handleGotoAddress = () => {
    const pageState: PageState = { 
      scrollPosition: {x: 0, y: 0},
      formData: {}
    }
    const payload: VisitPagePayload = { 
      url: addressBar, title: '', pageState: pageState 
    }
    dispatch(visitPage(payload));
  };

  const handleRefresh = () => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  }

  if (!currentPage) {
    return <Spinner />;
  }

  return (
    <>
      <NavigationBar 
        value={addressBar} 
        onChange={handleUpdateAddressBar}
        onEnterDown={handleGotoAddress}
        onRefresh={handleRefresh}
      />
      <WebView
        ref={webviewRef}
        location={currentPage.url}
      />
    </>
  );
};

export { Browser };