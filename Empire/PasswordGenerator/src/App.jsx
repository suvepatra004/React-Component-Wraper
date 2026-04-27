import "./index.css";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(9);
  const [password, setPassword] = useState("");
  const [numberEnabled, setNumberEnabled] = useState(false);
  const [charEnabled, setCharEnabled] = useState(false);

  return (
    <>
      <div className="h-screen flex items-center flex-col justify-center bg-amber-300">
        <h1 className="mb-4 text-4xl font-mono text-emerald-700 font-bold">
          Password Generator
        </h1>
        <div className="flex justify-items-center items-stretch bg-gray-50 border rounded-[4px]">
          <input
            type="text"
            value={password}
            placeholder="Enter your password"
            className="px-2 py-1 w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-2 border-l-2 bg-gray-200 rounded-r-[4px] cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex items-center bg-gray-50 p-4">
          <span>Length</span>
          <input
            className="p-2 m-2"
            type="range"
            name="password-length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <input className="p-2 m-2" type="checkbox" name="number-allowed" />{" "}
          <span>Number</span>
          <input className="p-2 m-2" type="checkbox" name="char-allowed" />{" "}
          <span>Symbols</span>
        </div>
      </div>
    </>
  );
}

export default App;
