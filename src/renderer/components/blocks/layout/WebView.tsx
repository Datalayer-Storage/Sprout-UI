import React from 'react';
import { useRef, useEffect } from "react";

interface WebViewProps {
  url: string;
  style?: React.CSSProperties;
}

const WebView: React.FC<WebViewProps> = ({ url, style = {} }: WebViewProps) => {

    const webviewRef = useRef<Electron.WebviewTag | null>(null);

    const onLoadStart = () => {
      console.log('browser webview attempting to load page');
    }
  
    const onLoadStop = () => {
      console.log('browser webview stopped loading page');
    }
  
    const onError = (error: Event) => {
      console.log('browser webview failed to load page. Error:\n', error)
    }
  
    useEffect(() => {
  
      const webview = webviewRef.current;
      if (webview) {
        console.log('added event listenters')
        //add event listeners
        webview.addEventListener('did-start-loading', onLoadStart);
        webview.addEventListener('did-stop-loading', onLoadStop);
        webview.addEventListener('did-fail-load', onError);
  
        // Cleanup function to remove event listeners
        return () => {
          webview.removeEventListener('did-start-loading', onLoadStart);
          webview.removeEventListener('did-stop-loading', onLoadStop);
          webview.removeEventListener('did-fail-load', onError);
        };
      } else {
        console.log(webview)
      }
    })

  return <webview
    ref={webviewRef}
    src={url} 
    style={{ 
        width: '100%', 
        height: '100%', 
        ...style 
    }} />;
};

export { WebView };