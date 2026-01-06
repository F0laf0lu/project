import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Space, Form, Steps, App } from 'antd';
import { UserOutlined, TeamOutlined, FileTextOutlined, UsergroupAddOutlined, PlusOutlined, ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined}from '@ant-design/icons';
import ClientType from '../components/Onboarding/ClientTypeForm';
import ClientDetails from '../components/Onboarding/ClientDetailsForm';
import ReviewOnboarding from '../components/Onboarding/ReviewOnboarding';
import NOkForm from '../components/Onboarding/NOKForm';
import BeneficiaryForm from '../components/Onboarding/BeneficiaryForm';
import UploadDocForm from '../components/Onboarding/IndividualDocUpload';
import DirectorForm from '../components/Onboarding/AddDirectorsForm';
import { useAuth } from '../contexts/AuthContext';
import { getValueFromName, formatDateForInput } from '../utils/utils';
import utilitiesService from '../services/utilitiesService';
import clientService from '../services/clientService';
import { useNotification } from '../contexts/NotificationContext';
import { useBeneficiaries } from '../hooks/individualOnboardingHooks/useBeneficiaries';
import { useDirectors } from '../hooks/corporateOnboardingHooks/useDirectors';
import { useFileUpload } from '../hooks/individualOnboardingHooks/useFileUploads';



const OnboardClientPage = () => {

  const { message } = App.useApp();

  const {showNotification} = useNotification()

  const location = useLocation()

  const {beneficiaries, beneficiaryData, activeKeys, addBeneficiary, removeBeneficiary, updateBeneficiaryField, getAllBeneficiariesData,
    setActiveKeys,
    setBeneficiaries,
    setBeneficiaryData
  } = useBeneficiaries();

  const {directors,
        directorData,
        activeDirectorKeys,
        adddirector,
        removeDirector,
        updateDirectorField,
        getAllDirectorsData,
        setActiveDirectorKeys,
        setDirectors,
        setDirectorData } = useDirectors()

  

  const {files, kycTypes, addFile, removeFile,resumeFiles, resumeKycTypes,
     setFiles, setKycTypes, setResumeFiles, setResumeKycTypes} = useFileUpload();

  const navigate = useNavigate()
  const [tableLoading, setTableLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formSteps, setFormSteps] = useState([])
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [resumeOnboardingData, setResumeOnboardingData] = useState({})
  const [isResuming, setIsResuming] = useState(false)


 

  const [utilities, setUtilities] = useState({})

  const {authUser, token} = useAuth()

  const stepMap = {
      0 : "clientType",
      1 : "clientDetails",
      2 : "nokDetails",
      3 : "uploadedDocs",
      4 : "beneficiaryDetails"
   }

   const individualSteps = [
      {
        title: 'Client Type',
        icon: <UserOutlined />,
      },
      {
        title: 'Client Details',
        icon: <UsergroupAddOutlined />,
      },
      {
        title: 'Next of Kin',
        icon: <TeamOutlined />,
      },
      {
        title: 'Upload Documents',
        icon: <FileTextOutlined />,
      },
      {
        title: 'Add Beneficiaries',
        icon: <TeamOutlined />,
      },
      { 
        title: 'Review & Submit',
        icon: <CheckOutlined />,
      }    
   ]

   const corporateSteps = [
      {
        title: 'Client Type',
        icon: <UserOutlined />,
      },
      {
        title: 'Client Details',
        icon: <UsergroupAddOutlined />,
      },
      {
        title: 'Add Directors',
        icon: <TeamOutlined />,
      },
      {
        title: 'Upload Documents',
        icon: <FileTextOutlined />,
      },
      { 
        title: 'Review & Submit',
        icon: <CheckOutlined />,
      },    
   ]
  
    // Data submission functions
    async function fetchUtilities() {    
      try {
          const allData = await utilitiesService.getAllUtilities(token);
          setUtilities(allData);
        } 
      catch (error) {
          console.error('Failed to load utilities:', error);
        } 
    }

    useEffect(()=>{
      fetchUtilities()
    }, [])

    useEffect(()=>{
      if (!location.state) {
        setFiles([]);
        setKycTypes([]);
        setBeneficiaries([{id : 0}])
        return;
      }
      const locationState = location.state;
      setResumeOnboardingData(locationState.clientData)
      setIsResuming(true)
      setResumeFiles(locationState.docs.files)
      setResumeKycTypes(locationState.docs.kycTypes)
    }, [])

    useEffect(() => {
      if (resumeOnboardingData && Object.keys(resumeOnboardingData).length > 0) {
        const clientData = resumeOnboardingData;

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
            State:getValueFromName(clientData.State, utilities.stateOptions),
            ID_Type: getValueFromName(clientData.ID_Type, utilities.idCardTypeOptions),
            Employer: getValueFromName(clientData.Employer, utilities.employersOptions),

            // Maritial_Status: clientData.Marital_Status || clientData.Maritial_Status || '',
            Maritial_Status : getValueFromName(clientData.Marital_Status, utilities.maritalStatusOptions),
            DATE_OF_BIRTH: formatDateForInput(clientData.Date_Of_Birth || '') ,      

            Nok_Title : getValueFromName(clientData.Nok_Title, utilities.titleOptions),
            Nok_State : getValueFromName(clientData.Nok_State, utilities.stateOptions),
            Nok_Country: getValueFromName(clientData.Nok_Country, utilities.countryOptions),
            Nok_Relationship: getValueFromName(clientData.Nok_Relationship, utilities.relationshipTypeOptions),
            Nok_Date_Of_Birth: formatDateForInput(clientData.Nok_Date_Of_Birth || ''),
            Nok_Gender: getValueFromName(clientData.Nok_Gender, utilities.genderOptions),
          }
          delete initialValues.Marital_Status;
          delete initialValues.Date_Of_Birth;
          form.setFieldsValue(initialValues);
          setBeneficiaries(location.state.beneficiaries)
          setBeneficiaryData(location.state.beneficiaryData)
        }
      
    }, [resumeOnboardingData, form, utilities]);

    // Corporate onboarding
    const handleCorporateOnboarding = ()=>{
      let currentValues = form.getFieldsValue();

      if (currentStep === 2) {
          currentValues = {
            Directors: getAllDirectorsData()
          }
        }

      switch (currentStep) {
        case 1:
          console.log(currentValues)
          break;
        case 2:
          console.log(currentValues)
        default:
          break;
      }

      setCurrentStep(prev => prev + 1);
    }
  
    const handleNext = async () => {
        let currentValues = form.getFieldsValue();

        if (formData['clientType'] == 'Corporate') {
          handleCorporateOnboarding(currentValues)
          return
        }

        if (currentStep === 3) {
          currentValues = {
            files, kycTypes
          } 
        }
        else if (currentStep === 4) {
          currentValues = {
            Beneficiaries: getAllBeneficiariesData()
          }
        }

        let key;
        if (currentStep != 5) {
          key = stepMap[currentStep]
          setFormData(prev=>({
                ...prev, [key]:{
                  ...prev[key],
                  ...currentValues
              }
          }))
        }
        
        let result;
        const accountNumber = formData?.accountNumber || location.state?.clientData.Customer_Reg_ID
        
        switch (currentStep) {
          case 0:
            console.log(key, currentValues)
            setFormData(prev => ({...prev, ...currentValues}))
            const step = currentValues.clientType == "Individual" ? individualSteps : corporateSteps
            setFormSteps(step)
            message.success("Client type selected")
            break;
          case 1:
            console.log(key, currentValues)
            result = await clientService.addIndividualClient(currentValues, authUser.UserName, {accountNumber})
            console.log(result)
            if (result && result.Success) {
              showNotification("success", {
                message: result.Message
              })
              setFormData(prev => ({ ...prev, accountNumber: result.Data?.Generated_AccountNumber }));
            }
            else{
              message.error("Failed to save client details")
              return;
            }
            break
          case 2:
            console.log(key, currentValues)
            result = await clientService.submitNextOfKin(currentValues, accountNumber, authUser.UserName);
            if (result && result.Success) {
              showNotification("success", {
                message: result.Message
              })
            } else {
              message.error('Failed to save Next of Kin details');
              return;
            }
            break
          case 3:
            if (isResuming && files.length == 0) {
              break
            }
            result = await clientService.uploadDocuments(files, kycTypes, accountNumber);
            if (result && result.Success) {
              showNotification("success", {
                  message: result.Message
              })
            } else {
              showNotification("error", {
                  message: "Failed to upload documents"
              })
              return;
            }
            break
          case 4:
            console.log(key, currentValues)
            result = await clientService.submitBeneficiaries(currentValues, accountNumber, authUser.UserName);
            if (result && result.Success) {
              message.success('Beneficiaries saved successfully');
              showNotification("success", {
                  message: result.Message
              })
            } else {
              showNotification("error", {
                  message: 'Failed to save beneficiaries'
              })
              return;
            }
            break
          default:
            console.log(key, currentValues)
            break;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
      };  
  
    const handleOnboardClient = async() => {
      setTableLoading(true);
        const accountNumber = formData.accountNumber || location.state.clientData.AccountNumber
        const result = await clientService.submitOnboarding(authUser.UserName, accountNumber);
        if (result && result.Success) {
          showNotification("success", {
                message: result.Message
          })
        } else {
          showNotification("success", {
              message:'Failed to submit client details'
          })
          setTableLoading(false);
          return;
        }
        navigate('/clients')
    };

    // Cancel Form
    const onCancelOnboarding = ()=>{
        setCurrentStep(0);
        form.resetFields();
        setFormData({})
        setFiles([]);
        setKycTypes([])
        setBeneficiaryData({})
        setBeneficiaries([]); 
    }

    return (
      <div style={{
        minHeight: 'calc(100vh - 120px)',
        padding: '60px 40px',
      }}>
        {/* Header Section */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
          }}>
            <h2 style={{ 
              color: '#1890ff', 
              marginBottom: '10px',
              fontSize: '32px',
              fontWeight: '600'
            }}>
              <PlusOutlined style={{ marginRight: '12px' }} />
              Onboard New Client
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '16px',
              margin: 0
            }}>
              Complete the steps to add a new client to the system
            </p>
          </div>
        </div>

        {/* Steps Progress Section */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderBottom: '1px solid #e8e8e8',
          position: "sticky",
          top:"65px",
          zIndex:1000
        }}>
            
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto'
          }}>
            {
              formData?.clientType == "Individual" && (<Steps
                  current={currentStep}
                  items={individualSteps}
                />)
            }
            {
              formData?.clientType == "Corporate" && (<Steps
                  current={currentStep}
                  items={corporateSteps}
                />)
            }
          </div>
        </div>

        {/* Form Section */}
        <div style={{
          padding: '60px 0px',
          minHeight: '400px',
        }}>
          <div style={{
            background: 'white',
            padding: '60px',
            borderRadius: '8px',
            margin: '0 auto'
          }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleOnboardClient}
              preserve={true}
            >
              <div style={{ minHeight: '350px' }}>
                {currentStep === 0 && <ClientType form={form} />}

                {
                  formData?.clientType === "Corporate" ? (
                  <>
                    {currentStep === 1 && <ClientDetails form={form} utilities={utilities} />}
                    {currentStep === 2 && <DirectorForm 
                            form={form}
                            utilities={utilities}
                            directors={directors}
                            directorData={directorData}
                            onAddDirector={adddirector}
                            onRemoveDirector={removeDirector}
                            onFieldChange={updateDirectorField}
                            activeKeys={activeDirectorKeys}
                            onActiveKeysChange={setActiveDirectorKeys}
                    />}
                    {currentStep === 3 && <UploadDocForm 
                            form={form} 
                            onAddFile={addFile} 
                            onRemoveFile={removeFile}
                            files={files} 
                            kycTypes={kycTypes} 
                            isResuming={isResuming}
                            resumeKycTypes={resumeKycTypes}
                            resumeFiles={resumeFiles}
                    />}
                    {currentStep === 4 && <ReviewOnboarding 
                            form={form} beneficiaries={beneficiaries}
                            files={files} 
                            kycTypes={kycTypes}
                            utilities={utilities} 
                    />}
                  </>
                  ) : (
                  <>
                    {currentStep === 1 && <ClientDetails form={form} utilities={utilities} />}

                    {currentStep === 2 && <NOkForm form={form} utilities={utilities} />}
                    {currentStep === 3 && <UploadDocForm 
                            form={form} 
                            onAddFile={addFile} 
                            onRemoveFile={removeFile}
                            files={files} 
                            kycTypes={kycTypes} 
                            isResuming={isResuming}
                            resumeKycTypes={resumeKycTypes}
                            resumeFiles={resumeFiles}
                    />}
                    {currentStep === 4 && <BeneficiaryForm 
                            form={form}
                            utilities={utilities}
                            beneficiaries={beneficiaries}
                            beneficiaryData={beneficiaryData}
                            onAddBeneficiary={addBeneficiary}
                            onRemoveBeneficiary={removeBeneficiary}
                            onFieldChange={updateBeneficiaryField}
                            activeKeys={activeKeys}
                            onActiveKeysChange={setActiveKeys}
                      />}
                    {currentStep === 5 && <ReviewOnboarding 
                            form={form} beneficiaries={beneficiaries}
                            files={files} 
                            kycTypes={kycTypes}
                            utilities={utilities} 
                    />}
                  </>
                  )
                }
              </div>

              {/* Navigation Buttons */}
              <Form.Item style={{ marginBottom: 0, marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #f0f0f0' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button 
                    onClick={() => {
                      onCancelOnboarding()
                    }}
                    size="large"
                    style={{ minWidth: '120px' }}
                  >
                    Cancel
                  </Button>

                  <Space size="large">
                    {currentStep > 0 && (
                      <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={handlePrevious}
                        size="large"
                        style={{ minWidth: '120px' }}
                      >
                        Previous
                      </Button>
                    )}

                    {
                      currentStep == 0 ? ( 
                      <Button 
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        onClick={handleNext}
                        size="large"
                        style={{
                          background: '#1890ff',
                          borderColor: '#1890ff',
                          minWidth: '120px'
                        }}
                      >
                        Next
                      </Button>) : (
                        currentStep < formSteps.length - 1 ? ( 
                      <Button 
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        onClick={handleNext}
                        size="large"
                        style={{
                          background: '#1890ff',
                          borderColor: '#1890ff',
                          minWidth: '120px'
                        }}
                      >
                        Next
                      </Button>) : null
                      )
                    }

                    

                    {currentStep === formSteps.length - 1 && (
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={tableLoading}
                        icon={<CheckOutlined />}
                        size="large"
                        style={{
                          background: '#1890ff',
                          borderColor: '#1890ff',
                          minWidth: '180px'
                        }}
                      >
                        Complete Onboarding
                      </Button>
                    )}
                  </Space>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>

      </div>
    );
  };


export default OnboardClientPage