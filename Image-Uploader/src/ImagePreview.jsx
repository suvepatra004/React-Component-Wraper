import React from "react";

function ImagePreview({ data, onReset }) {
  return (
    <>
      <div>
        <img
          src={data.preview}
          alt="image preview"
          className="w-full h-48 object-cover rounded-lg mb-4 border"
        />
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {data.description}
        </p>
        <button
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor pointer"
        >
          Upload Another
        </button>
      </div>
    </>
  );
}

export default ImagePreview;
