import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUploader from "./ImageUploader";

function ImageUploaderForm() {
  const [data, setData] = useState(null);

  function handleUpload(uploadData) {
    setData(uploadData);
  }

  const handleReset = () => {
    setData(null);
  };

  return (
    <>
      {!data ? (
        <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Preview Image</h2>
      )}
      {!data ? (
        <ImageUploader onUpload={handleUpload} />
      ) : (
        <ImagePreview data={data} onReset={handleReset} />
      )}
    </>
  );
}

export default ImageUploaderForm;
