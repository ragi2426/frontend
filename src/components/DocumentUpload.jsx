import React, { useState } from "react";

const DocumentUpload = ({ label, isMandatory, onChange, value }) => {
  const [file, setFile] = useState(value?.file || null);
  const [description, setDescription] = useState(value?.description || "");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onChange({ file: selectedFile, description });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
    onChange({ file, description: value });
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="font-semibold mb-2 text-start">
        {label} {isMandatory && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 w-1/3"
        />
        <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="py-2 px-4 w-2/3 border rounded-lg"
        />

      </div>
    </div>
  );
};

export default DocumentUpload;
