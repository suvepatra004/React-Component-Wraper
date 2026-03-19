/**
 * TODO:
 *
 * - [] Implement image uploading functionality.
 *
 * FIXME:
 *
 * - [done] - 18/03/2026 - Fix Tailwind Configuration.
 */
import { useState } from "react";
import "./App.css";

function App() {
  const greeting = "Hello, Prop Drilling!";
  const response = "I'm not here to play!";

  return <Parent greeting={greeting} response={response} />;
}

const Parent = ({ greeting, response }) => {
  return <Child greeting={greeting} response={response} />;
};

const Child = ({ greeting, response }) => {
  return <Grandchild greeting={greeting} response={response} />;
};

const Grandchild = ({ greeting, response }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{greeting}</h1>
      <h2>{response}</h2>

      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>Decrease Count</button>
    </>
  );
};

export default App;
