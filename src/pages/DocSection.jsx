import React, { useState } from "react";
import DocumentUpload from "../components/DocumentUpload";

const DocSection = () => {
  const [resume, setResume] = useState(null);
  const [onepager, setOnePager] = useState(null);

  const handleResumeChange = (updatedResume) => {
    setResume(updatedResume);
  };

  const handleOnePagerChange = (updatedOnePager) => {
    setOnePager(updatedOnePager);
  };

  const handleSave = () => {
    console.log("Resume:", resume);
    console.log("OnePager:", onepager);
  };

  return (
    <div className="container mx-auto bg-white rounded-lg mb-2">
      <h1 className="text-start text-2xl bg-slate-400 p-2 pl-5 rounded-t-lg mb-4 font-semibold">
        Document Upload
      </h1>
      <div className="p-4">
        <DocumentUpload
          label="Resume"
          isMandatory={true}
          value={resume}
          onChange={handleResumeChange}
        />
        <DocumentUpload
          label="OnePager"
          isMandatory={false}
          value={onepager}
          onChange={handleOnePagerChange}
        />
        <div className="flex space-x-4 justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-base text-white p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocSection;
