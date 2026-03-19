/**
 * TODO:
 *
 * - [] Implement image uploading functionality.
 * - [] Implement image description functionality.
 * - [] Implement image preview functionality.
 *
 * FIXME:
 *
 * - [done] - 18/03/2026 - Fix Tailwind Configuration.
 */
import { useState } from "react";
import "./App.css";
import ImageUploaderForm from "./ImageUploaderForm";

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* <span>
            Please select an image to upload. You can also add a description for
          </span> */}
          <ImageUploaderForm />
        </div>
      </div>
    </>
  );
}

export default App;
