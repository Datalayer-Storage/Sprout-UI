import React from 'react';

interface WebViewProps {
    defaultLocation: string;
    style?: React.CSSProperties;
}

const WebView = React.forwardRef<Electron.WebviewTag, WebViewProps>(
    ({ defaultLocation, style = {} }, ref) => {
      return (
        <webview
          ref={ref}
          src={defaultLocation}
          style={{
            width: '100%',
            height: '100%',
            ...style
          }} 
        />
      );
    }
  );

export { WebView };