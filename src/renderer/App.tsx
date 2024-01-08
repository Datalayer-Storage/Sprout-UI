import { useState } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import { useGetConfigQuery } from './api/ipc/wallet';

/**
 * @returns app react component to be rendered by electron as the UI
 */
function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading, isError } = useGetConfigQuery({});

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      <h1>Vite + React</h1>
      {JSON.stringify(data)}
      <Button>Click me</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
