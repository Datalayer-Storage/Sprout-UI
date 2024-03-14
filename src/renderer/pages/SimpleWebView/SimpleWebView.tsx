import { useRef } from 'react';
import { WebView } from '@/components/blocks/layout/WebView';
import { WebviewTag } from 'electron';
import {BackButton} from '@/components';
import SplashScreen from '@/assets/home2.png';
import {useLocation} from "react-router-dom";
import {transformToHttpProtocal} from "@/utils/chia-router";

const SimpleWebView: React.FC = () => {

  const webviewRef = useRef<WebviewTag>(null);
  const location = useLocation()
  const chiaUrl: string = location?.state?.chiaUrl;
  const ownedStores: string[] = location?.state?.ownedStores;
  const fallbackStoreProvider: string = location?.state?.fallbackStoreProvider;
  const pageChiaProtocolUrl: string =
    (chiaUrl && ownedStores && fallbackStoreProvider) ? chiaUrl : 'browser://home';

  return (
    <div>
      <BackButton/>
      {(pageChiaProtocolUrl === 'browser://home') ? (
        <div
          style={{
            width: '100%', // Adjust the width as needed
            height: '100vh', // Adjust the height as needed
            backgroundImage: `url(${SplashScreen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3
          }}
        />
      ) : (
        <WebView
          ref={webviewRef}
          onDidNavigate={() => {}}
          onDidNavigateInPage={() => {}}
          location={transformToHttpProtocal(pageChiaProtocolUrl, fallbackStoreProvider, ownedStores)}
        />
      )}
    </div>
  );
};

export { SimpleWebView };
