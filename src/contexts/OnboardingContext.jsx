import React, { createContext, useContext, useState } from 'react';
import { Form } from 'antd';

const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {

  const [tableLoading, setTableLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [resumeOnboardingData, setResumeOnboardingData] = useState({})
  const [isResuming, setIsResuming] = useState(false)


  // Files state
  const [files, setFiles] = useState([])
  const [kycTypes, setKycTypes] = useState([])

  const [resumeFiles, setResumeFiles] = useState([])
  const [resumeKycTypes, setResumeKycTypes] = useState([]) 

  // Beneficiaries state
  const [beneficiaries, setBeneficiaries] = useState([{ id: 0 }]);
  const [beneficiaryData, setBeneficiaryData] = useState({});
   const [activeKeys, setActiveKeys] = useState(['0']);
  const [utilities, setUtilities] = useState({})
    


  return (
    <OnboardingContext.Provider>
      {children}
    </OnboardingContext.Provider>
  );
};


export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  
  return context;
};