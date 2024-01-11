import { useRef, useEffect } from "react";
import WebviewTag from 'electron';

const Browser: React.FC = () => {

  console.log("hello from the browser")

  const userAgent: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36";
  const customHTML: string = `
      <body style="display:flex; flex-direction: column;justify-content: center; 
        align-items:center; background-color: black; color:white; height: 100%;">
          <h1 style="font-size:100px; padding: 50px; text-align: center;" 
          id="h1_element">
            This is simple html
          </h1>
          <h2 style="display: block; font-size:80px; padding: 50px; 
          text-align: center;" id="h2_element">
            This text will be changed later!
          </h2>
       </body>`;

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