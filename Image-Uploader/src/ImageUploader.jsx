import React from "react";
import { useState } from "react";
function ImageUploader({ onUpload }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      alert("Please select an Image");
      return;
    }
    const preview = URL.createObjectURL(image);

    onUpload({
      image,
      preview,
      description,
    });
    console.log("Image:", image);
    console.log("Description:", description);
  }

  return (
    <>
      <form
        className="flex flex-col items-start gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="image-description"
          id="iamge-description"
          placeholder="Enter Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-1 focus:ring-blue-200"
        />
        <input
          type="file"
          name="image"
          id="iamge"
          accept="image/*"
          className="mb-4 w-full *:file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded-lg file:border-none file:hover:bg-blue-700"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          type="submit"
        >
          Upload Image
        </button>
      </form>
    </>
  );
}

export default ImageUploader;
