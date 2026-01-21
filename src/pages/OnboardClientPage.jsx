import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, App } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  CheckOutlined
} from '@ant-design/icons';

import { OnboardingHeader, OnboardingSteps, NavigationButtons } from '../components/Onboarding/shared';
import ClientType from '../components/Onboarding/ClientTypeForm';
import ClientDetails from '../components/Onboarding/ClientDetailsForm';
import ReviewOnboarding from '../components/Onboarding/ReviewOnboarding';
import NOkForm from '../components/Onboarding/NOKForm';
import BeneficiaryForm from '../components/Onboarding/BeneficiaryForm';
import UploadDocForm from '../components/Onboarding/DocUploadForm';
import DirectorForm from '../components/Onboarding/AddDirectorsForm';
import ShareholderForm from '../components/Onboarding/AddShareholdersForm';

import { useAuth } from '../contexts/AuthContext';
import { getValueFromName, formatDateForInput } from '../utils/utils';
import utilitiesService from '../services/utilitiesService';
import clientService from '../services/clientService';
import { useNotification } from '../contexts/NotificationContext';
import { useBeneficiaries } from '../hooks/individualOnboardingHooks/useBeneficiaries';
import { useDirectors } from '../hooks/corporateOnboardingHooks/useDirectors';
import { useShareholders } from '../hooks/corporateOnboardingHooks/useShareholders';
import { useFileUpload } from '../hooks/individualOnboardingHooks/useFileUploads';

import styles from './OnboardClientPage.module.css';

const INDIVIDUAL_STEPS = [
  { title: 'Client Type', icon: <UserOutlined /> },
  { title: 'Client Details', icon: <UsergroupAddOutlined /> },
  { title: 'Next of Kin', icon: <TeamOutlined /> },
  { title: 'Upload Documents', icon: <FileTextOutlined /> },
  { title: 'Add Beneficiaries', icon: <TeamOutlined /> },
  { title: 'Review & Submit', icon: <CheckOutlined /> }
];

const CORPORATE_STEPS = [
  { title: 'Client Type', icon: <UserOutlined /> },
  { title: 'Client Details', icon: <UsergroupAddOutlined /> },
  { title: 'Add Directors', icon: <TeamOutlined /> },
  { title: 'Add Shareholders', icon: <TeamOutlined /> },
  { title: 'Upload Documents', icon: <FileTextOutlined /> },
  { title: 'Review & Submit', icon: <CheckOutlined /> }
];

const OnboardClientPage = () => {
  const { message } = App.useApp();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, token } = useAuth();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formSteps, setFormSteps] = useState([]);
  const [formData, setFormData] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [utilities, setUtilities] = useState({});
  const [resumeOnboardingData, setResumeOnboardingData] = useState({});
  const [isResuming, setIsResuming] = useState(false);

  const {
    beneficiaries, beneficiaryData, activeKeys, addBeneficiary, removeBeneficiary,
    updateBeneficiaryField, getAllBeneficiariesData, setActiveKeys, setBeneficiaries, setBeneficiaryData
  } = useBeneficiaries();

  const {
    directors, directorData, activeDirectorKeys, adddirector, removeDirector,
    updateDirectorField, getAllDirectorsData, setActiveDirectorKeys, setDirectors, setDirectorData
  } = useDirectors();

  const {
    shareholders, shareholderData, activeShareholderKeys, addShareholder, removeShareholder,
    updateShareholderField, getAllShareholdersData, setActiveShareholderKeys, setShareholders, setShareholderData
  } = useShareholders();

  const {
    files, kycTypes, addFile, removeFile, resumeFiles, resumeKycTypes,
    setFiles, setKycTypes, setResumeFiles, setResumeKycTypes
  } = useFileUpload();

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const allData = await utilitiesService.getAllUtilities(token);
        setUtilities(allData);
      } catch (error) {
        console.error('Failed to load utilities:', error);
      }
    };
    fetchUtilities();
  }, [token]);

  useEffect(() => {
    if (!location.state) {
      setFiles([]);
      setKycTypes([]);
      setBeneficiaries([{ id: 0 }]);
      setDirectors([{ id: 0 }]);
      setShareholders([{ id: 0 }]);
      return;
    }

    const locationState = location.state;
    setResumeOnboardingData(locationState.clientData);
    setIsResuming(true);
    setResumeFiles(locationState.docs?.files || []);
    setResumeKycTypes(locationState.docs?.kycTypes || []);

    if (locationState.isCorporate) {
      setFormData((prev) => ({ ...prev, clientType: 'Corporate' }));
      setFormSteps(CORPORATE_STEPS);
      setCurrentStep(locationState.onboardingStep);

      if (locationState.directors?.length > 0) {
        setDirectors(locationState.directors);
        setDirectorData(locationState.directorData);
      }
      if (locationState.shareholders?.length > 0) {
        setShareholders(locationState.shareholders);
        setShareholderData(locationState.shareholderData);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (resumeOnboardingData && Object.keys(resumeOnboardingData).length > 0) {
      const clientData = resumeOnboardingData;

      if (location.state?.isCorporate) {
        const initialValues = {
          ...clientData,
          Residential_Country: getValueFromName(clientData.Residential_Country, utilities.countryOptions),
          Residential_State: getValueFromName(clientData.Residential_State, utilities.stateOptions)
        };

        if (location.state.directorData) {
          Object.entries(location.state.directorData).forEach(([directorId, data]) => {
            Object.entries(data).forEach(([fieldName, value]) => {
              initialValues[`director_${fieldName}_${directorId}`] = value;
            });
          });
        }

        if (location.state.shareholderData) {
          Object.entries(location.state.shareholderData).forEach(([shareholderId, data]) => {
            Object.entries(data).forEach(([fieldName, value]) => {
              initialValues[`shareholder_${fieldName}_${shareholderId}`] = value;
            });
          });
        }

        form.setFieldsValue(initialValues);
      } else {
        const initialValues = {
          ...clientData,
          Marital_Status: undefined,
          Date_Of_Birth: undefined,
          Title: getValueFromName(clientData.Title, utilities.titleOptions),
          Gender: getValueFromName(clientData.Gender, utilities.genderOptions),
          State_Of_Origin: getValueFromName(clientData.State_Of_Origin, utilities.stateOptions),
          Country: getValueFromName(clientData.Title, utilities.titleOptions),
          Residential_Country: getValueFromName(clientData.Residential_Country, utilities.countryOptions),
          Nationality: getValueFromName(clientData.Residential_Country, utilities.countryOptions),
          State: getValueFromName(clientData.State, utilities.stateOptions),
          ID_Type: getValueFromName(clientData.ID_Type, utilities.idCardTypeOptions),
          Employer: getValueFromName(clientData.Employer, utilities.employersOptions),
          Maritial_Status: getValueFromName(clientData.Marital_Status, utilities.maritalStatusOptions),
          DATE_OF_BIRTH: formatDateForInput(clientData.Date_Of_Birth || ''),
          Nok_Title: getValueFromName(clientData.Nok_Title, utilities.titleOptions),
          Nok_State: getValueFromName(clientData.Nok_State, utilities.stateOptions),
          Nok_Country: getValueFromName(clientData.Nok_Country, utilities.countryOptions),
          Nok_Relationship: getValueFromName(clientData.Nok_Relationship, utilities.relationshipTypeOptions),
          Nok_Date_Of_Birth: formatDateForInput(clientData.Nok_Date_Of_Birth || ''),
          Nok_Gender: getValueFromName(clientData.Nok_Gender, utilities.genderOptions)
        };

        delete initialValues.Marital_Status;
        delete initialValues.Date_Of_Birth;
        form.setFieldsValue(initialValues);
        setBeneficiaries(location.state.beneficiaries);
        setBeneficiaryData(location.state.beneficiaryData);
      }
    }
  }, [resumeOnboardingData, form, utilities, location.state]);

  const handleCorporateOnboarding = async () => {
    let currentValues = form.getFieldsValue();
    const corporateStepMap = { 0: 'clientType', 1: 'clientDetails', 2: 'directorsDetails', 3: 'shareholdersDetails', 4: 'uploadedDocs' };

    if (currentStep === 2) currentValues = { Directors: getAllDirectorsData() };
    if (currentStep === 3) currentValues = { Shareholders: getAllShareholdersData() };
    if (currentStep === 4) currentValues = { files, kycTypes };

    if (currentStep !== 5) {
      const key = corporateStepMap[currentStep];
      setFormData((prev) => ({ ...prev, [key]: { ...prev[key], ...currentValues } }));
    }

    const accountNumber = formData?.accountNumber || location.state?.clientData.Customer_Reg_ID;
    let result;

    switch (currentStep) {
      case 0:
        setFormData((prev) => ({ ...prev, ...currentValues }));
        setFormSteps(CORPORATE_STEPS);
        message.success('Client type selected');
        break;
      case 1:
        result = await clientService.addCorporateClient(currentValues, authUser.UserName, { accountNumber });
        if (result?.Success) {
          showNotification('success', { message: result.Message });
          setFormData((prev) => ({ ...prev, accountNumber: result.Data?.Generated_AccountNumber }));
        } else {
          message.error('Failed to save corporate client details');
          return;
        }
        break;
      case 2:
        result = await clientService.submitDirectors(currentValues.Directors, accountNumber, authUser.UserName);
        if (result?.Success) {
          showNotification('success', { message: result.Message });
        } else {
          message.error('Failed to save directors details');
          return;
        }
        break;
      case 3:
        result = await clientService.submitShareholders(currentValues.Shareholders, accountNumber, authUser.UserName);
        if (result?.Success) {
          showNotification('success', { message: result.Message });
        } else {
          message.error('Failed to save shareholders details');
          return;
        }
        break;
      case 4:
        break;
      default:
        break;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleNext = async () => {
    let currentValues = form.getFieldsValue();
    const stepMap = { 0: 'clientType', 1: 'clientDetails', 2: 'nokDetails', 3: 'uploadedDocs', 4: 'beneficiaryDetails' };

    if (formData.clientType === 'Corporate') {
      handleCorporateOnboarding();
      return;
    }

    if (currentStep === 3) currentValues = { files, kycTypes };
    else if (currentStep === 4) currentValues = { Beneficiaries: getAllBeneficiariesData() };

    if (currentStep !== 5) {
      const key = stepMap[currentStep];
      setFormData((prev) => ({ ...prev, [key]: { ...prev[key], ...currentValues } }));
    }

    const accountNumber = formData?.accountNumber || location.state?.clientData.Customer_Reg_ID;
    let result;

    switch (currentStep) {
      case 0:
        setFormData((prev) => ({ ...prev, ...currentValues }));
        setFormSteps(currentValues.clientType === 'Individual' ? INDIVIDUAL_STEPS : CORPORATE_STEPS);
        message.success('Client type selected');
        break;
      case 1:
        result = await clientService.addIndividualClient(currentValues, authUser.UserName, { accountNumber });
        if (result?.Success) {
          showNotification('success', { message: result.Message });
          setFormData((prev) => ({ ...prev, accountNumber: result.Data?.Generated_AccountNumber }));
        } else {
          message.error('Failed to save client details');
          return;
        }
        break;
      case 2:
        result = await clientService.submitNextOfKin(currentValues, accountNumber, authUser.UserName);
        if (result?.Success) {
          showNotification('success', { message: result.Message });
        } else {
          message.error('Failed to save Next of Kin details');
          return;
        }
        break;
      case 3:
        if (isResuming && files.length === 0) break;
        result = await clientService.uploadDocuments(files, kycTypes, accountNumber);
        if (result?.Success) {
          showNotification('success', { message: result.Message });
        } else {
          showNotification('error', { message: 'Failed to upload documents' });
          return;
        }
        break;
      case 4:
        result = await clientService.submitBeneficiaries(currentValues, accountNumber, authUser.UserName);
        if (result?.Success) {
          message.success('Beneficiaries saved successfully');
          showNotification('success', { message: result.Message });
        } else {
          showNotification('error', { message: 'Failed to save beneficiaries' });
          return;
        }
        break;
      default:
        break;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleOnboardClient = async () => {
    setTableLoading(true);
    const accountNumber = formData.accountNumber || location.state?.clientData?.AccountNumber;
    const isCorporate = formData.clientType === 'Corporate';

    const result = isCorporate
      ? await clientService.submitCorporateOnboarding(authUser.UserName, accountNumber)
      : await clientService.submitOnboarding(authUser.UserName, accountNumber);

    if (result?.Success) {
      showNotification('success', { message: result.Message });
    } else {
      showNotification('error', { message: 'Failed to submit client details' });
      setTableLoading(false);
      return;
    }
    navigate('/clients');
  };

  const onCancelOnboarding = () => {
    setCurrentStep(0);
    form.resetFields();
    setFormData({});
    setFiles([]);
    setKycTypes([]);
    setBeneficiaryData({});
    setBeneficiaries([]);
  };

  const renderStepContent = () => {
    const isCorporate = formData?.clientType === 'Corporate';

    if (currentStep === 0) return <ClientType form={form} />;

    if (isCorporate) {
      switch (currentStep) {
        case 1: return <ClientDetails form={form} utilities={utilities} />;
        case 2: return (
          <DirectorForm
            form={form} utilities={utilities} directors={directors} directorData={directorData}
            onAddDirector={adddirector} onRemoveDirector={removeDirector} onFieldChange={updateDirectorField}
            activeKeys={activeDirectorKeys} onActiveKeysChange={setActiveDirectorKeys}
          />
        );
        case 3: return (
          <ShareholderForm
            form={form} utilities={utilities} shareholders={shareholders} shareholderData={shareholderData}
            onAddShareholder={addShareholder} onRemoveShareholder={removeShareholder} onFieldChange={updateShareholderField}
            activeKeys={activeShareholderKeys} onActiveKeysChange={setActiveShareholderKeys}
          />
        );
        case 4: return (
          <UploadDocForm
            form={form} onAddFile={addFile} onRemoveFile={removeFile}
            files={files} kycTypes={kycTypes} isResuming={isResuming}
            resumeKycTypes={resumeKycTypes} resumeFiles={resumeFiles}
          />
        );
        case 5: return (
          <ReviewOnboarding
            form={form} beneficiaries={beneficiaries} files={files} kycTypes={kycTypes}
            utilities={utilities} directors={directors} directorData={directorData}
            shareholders={shareholders} shareholderData={shareholderData}
          />
        );
        default: return null;
      }
    }

    switch (currentStep) {
      case 1: return <ClientDetails form={form} utilities={utilities} />;
      case 2: return <NOkForm form={form} utilities={utilities} />;
      case 3: return (
        <UploadDocForm
          form={form} onAddFile={addFile} onRemoveFile={removeFile}
          files={files} kycTypes={kycTypes} isResuming={isResuming}
          resumeKycTypes={resumeKycTypes} resumeFiles={resumeFiles}
        />
      );
      case 4: return (
        <BeneficiaryForm
          form={form} utilities={utilities} beneficiaries={beneficiaries} beneficiaryData={beneficiaryData}
          onAddBeneficiary={addBeneficiary} onRemoveBeneficiary={removeBeneficiary} onFieldChange={updateBeneficiaryField}
          activeKeys={activeKeys} onActiveKeysChange={setActiveKeys}
        />
      );
      case 5: return (
        <ReviewOnboarding
          form={form} beneficiaries={beneficiaries} files={files}
          kycTypes={kycTypes} utilities={utilities}
        />
      );
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      <OnboardingHeader />

      <OnboardingSteps
        currentStep={currentStep}
        steps={formData?.clientType === 'Individual' ? INDIVIDUAL_STEPS : CORPORATE_STEPS}
        clientType={formData?.clientType}
      />

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <Form form={form} layout="vertical" onFinish={handleOnboardClient} preserve>
            <div className={styles.formContent}>{renderStepContent()}</div>

            <NavigationButtons
              currentStep={currentStep}
              totalSteps={formSteps.length}
              onCancel={onCancelOnboarding}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isLoading={tableLoading}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OnboardClientPage;
