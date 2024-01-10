import "./App.css";
import { AppNavigator } from "./routes";

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {

  return (
  <div style={{height: '100%'}}>  
    <AppNavigator/>
  </div>
  );
}

export default App;
