import { WebView } from "@/components/blocks/layout/WebView";
import { NavigationBar } from "./NavigationBar";

const Browser: React.FC = () => {

  return (
    <>
      <NavigationBar/>
      <WebView url="https://google.com" /> 
    </>
    
  );
};

export { Browser };