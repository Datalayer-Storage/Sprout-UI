import { useRef, useEffect } from "react";

const Browser: React.FC = () => {

  console.log("hello from the browser")

  const webviewRef = useRef<Electron.WebviewTag | null>(null);

  useEffect(() => {
    if (webviewRef.current) {
      console.log('!!!');
      webviewRef.current.src = "https://datalayer.storage";
    }
  }, [webviewRef.current]);

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

  return (
    <>
      <div>
        this is the browser
      </div>
      <webview 
        ref={webviewRef}
        id="webview" 
        src="https://datalayer.storage" 
        style={{
          width: '100%',
          height: '100%',
          display: 'inline-flex',
      }}
      ></webview>
    </>
  );
};

export { Browser };