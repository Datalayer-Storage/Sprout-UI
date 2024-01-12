import { useState, useCallback, useRef } from 'react';
import { WebView } from "@/components/blocks/layout/WebView";
import { NavigationBar } from "./NavigationBar";
import { WebviewTag } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { visitPage, PageState, VisitPagePayload } from '@/store/slices/browser';

const Browser: React.FC = () => {
  const dispatch = useDispatch();
  const webviewRef = useRef<WebviewTag>(null);
  //@ts-ignore
  const browserStore = useSelector((state: any) => state.browser);
  const [addressBar, setAddressBar] = useState('');

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

  return (
    <>
      <NavigationBar 
        value={addressBar} 
        onChange={handleUpdateAddressBar}
        onEnterDown={handleGotoAddress}
      />
      <WebView
        ref={webviewRef}
        defaultLocation="https://google.com"
      />
    </>

  );
};

export { Browser };