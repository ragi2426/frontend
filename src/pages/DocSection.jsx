import React, { useState } from "react";
import DocumentUpload from "../components/DocumentUpload";

const DocSection = () => {
  const [resume, setResume] = useState(null);
  const [certification, setCertification] = useState(null);

  const handleResumeChange = (updatedResume) => {
    setResume(updatedResume);
  };

  const handleCertificationChange = (updatedCertification) => {
    setcertification(updatedCertification);
  };

  const handleSave = () => {
    console.log("Resume:", resume);
    console.log("Certification:", certification);
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
          label="Certification"
          isMandatory={false}
          value={certification}
          onChange={handleCertificationChange}
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
