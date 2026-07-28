import { useState } from "react";
function App() {
  return (
    <div className="flex items-center justify-center flex-col">
      Git Profile Viewer
      <button
        onClick={() => {
          console.log("Showing Profile");
        }}
        className="bg-indigo-500 text-white text-xl font-bold cursor-pointer p-4 rounded"
      >
        Show Profile
      </button>
    </div>
  );
}

export default App;
