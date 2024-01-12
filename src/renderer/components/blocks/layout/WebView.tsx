import React from 'react';

interface WebViewProps {
    location: string;
    style?: React.CSSProperties;
}

const WebView = React.forwardRef<Electron.WebviewTag, WebViewProps>(
  ({ location, style = {} }, ref) => {
    return (
      <webview
        ref={ref}
        src={location}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    );
  },
);

export { WebView };