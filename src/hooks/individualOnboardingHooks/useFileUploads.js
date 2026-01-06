import { useState } from "react";


export const useFileUpload = ()=>{

    const [files, setFiles] = useState([]);
    const [kycTypes, setKycTypes] = useState([]);

    const [resumeFiles, setResumeFiles] = useState([])
    const [resumeKycTypes, setResumeKycTypes] = useState([]) 


    const addFile = (file, kycType)=>{

      if (!file || !kycType) {
        message.error("No file or kyctype was selected")
      }

      setFiles((prev)=>[...prev, file])
      setKycTypes((prev)=>[...prev, kycType])
    }

    const removeFile = (index)=>{
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
      setKycTypes(prevTypes => prevTypes.filter((_, i) => i !== index));
      if (isResuming) {
        setResumeFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
        setResumeKycTypes(prevTypes => prevTypes.filter((_, i) => i !== index))
      }
    }

    const resetFiles = () => {
        setFiles([]);
        setKycTypes([]);
    };

    const setInitialFiles = (filesList, kycTypesList) => {
        setFiles(filesList);
        setKycTypes(kycTypesList);
    };


  return {
    files,
    kycTypes,
    addFile,
    removeFile,
    resetFiles,
    setInitialFiles,
    resumeFiles,
    resumeKycTypes,
    setFiles,
    setKycTypes,
    setResumeFiles,
    setResumeKycTypes
  };
}