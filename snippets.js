// {
//     "clientType": "Individual",

//     "FirstName": "Test",
//     "LastName": "Alabi",
//     "Mobile_Phone": "08010001000",
//     "Email": "kofowosere132@app.com",
//     "City": "Lagos",
//     "Address1": "Ogun state",
//     "BVN": "12255638200",
//     "ID_Number": "1234566637525",
//     "Occupation": "Banker",
//     "Designation": "NOne",
//     "Data_Privacy": "Yes",

//     "Nok_FirstName": "Kolawole",
//     "Nok_MiddleName": "middle",
//     "Nok_PhoneNumber": "08097346452",
//     "Nok_EmailAddress": "nokkola2@app.com",
//     "Nok_Country": "Nigeria",
//     "Nok_City": "Lagos",
//     "Nok_Address": "Lagos",

//     "kyc_type": "06",
//     "kyc_file": {
//         "file": {
//             "uid": "rc-upload-1764767514754-3"
//         },
//         "fileList": [
//             {
//                 "uid": "rc-upload-1764767514754-3",
//                 "lastModified": 1760173628961,
//                 "lastModifiedDate": "2025-10-11T09:07:08.961Z",
//                 "name": "EnrolleeCard.pdf",
//                 "size": 150834,
//                 "type": "application/pdf",
//                 "percent": 0,
//                 "originFileObj": {
//                     "uid": "rc-upload-1764767514754-3"
//                 }
//             }
//         ]
//     },

//     "Eaccount_0": "SITL-009",
//     "Beneficiary_FirstName_0": "Ben",
//     "Beneficiary_MiddleName_0": "Tets",
//     "Beneficiary_LastName_0": "Stl",
//     "Beneficiary_City_0": "Lagos",
//     "Beneficiary_Address_0": "Lagos",
    
//     "Eaccount_1": "HSHSH",
//     "Beneficiary_FirstName_1": "MFMKF",
//     "Beneficiary_MiddleName_1": "JFKFKQ",
//     "Beneficiary_LastName_1": "KRFJRF",
//     "Beneficiary_City_1": "JFJFJ"
// }

// Rendering docs status
{/* <Col xs={24} md={12}>
{renderDocStatus('passportPhotograph', 'Passport Photograph')}
{renderDocStatus('identificationDocument', 'Identification Document')}
{['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && 
    renderDocStatus('proofOfAddressDocument', 'Proof of Address')}
{['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && 
    renderDocStatus('appointmentLetter', 'Appointment Letter')}
</Col> */}
{/* <Col xs={24} md={12}>
{renderDocStatus('sanctionScreening', 'Sanction Screening')}
{renderDocStatus('adverseMediaSearch', 'Adverse Media Search')}
</Col> */}




        // const BASE_URL = "https://webdev.stanbicibtcpension.com:7789"
        
        // fetch(`${BASE_URL}/api/Admin/Login`, {
        // method:'POST',
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body:JSON.stringify({
        //     "UserName": "A268332",
        //     "Password": "Fola720??080"
        // })
        // }).then(res=>res.json())
        // .then(data=>setAuthUser(data))




        // ============== form validation snippet

        // form.validateFields().then(() => {
        //   setCurrentStep(currentStep + 1);
        // }).catch((errorInfo) => {
        //   console.log('Validation failed:', errorInfo);
        // });



        // Next step handling snippet
        // switch (currentStep) {
        //   case 0:
        //     console.log("Step 0: Client Type selected");
        //     break
        //   case 1:
        //     console.log("Step 1: Submitting Client Details");
        //     result = await addIndividualClients(currentValues)
        //     if (result && result.Success) {
        //       console.log("Client details saved successfully")
        //       message.success("Client details saved")
        //       console.log(result.Data?.Generated_AccountNumber)
        //       setFormData(prev => ({ ...prev, accountNumber: result.Data?.Generated_AccountNumber }));
        //     }
        //     else{
        //       console.log('Failed to save client details')
        //       message.error("Failed to save client details")
        //       return;
        //     }
        //     break;
          
        //   case 2:
        //     console.log("Step 2: Submitting Next of Kin");
        //     console.log(currentValues)
        //     result = await submitNextOfKin(currentValues);
            // if (result && result.Success) {
            //   message.success('Next of Kin details saved successfully');
            //   console.log('Next of Kin details saved successfully')
            // } else {
            //   message.error('Failed to save Next of Kin details');
            //   console.log('Failed to save Next of Kin details')
            //   // return;
            // }
        //     break;
            
        //     case 3:
        //       // Step 4: Upload Documents
        //       console.log("Step 3: Submitting Documents");
        //       message.success('Documents uploaded successfully');
        //       result = await submitDocuments(updatedFormData, uploadedFiles);
              
        //       if (result && result.Success) {
        //         message.success('Documents uploaded successfully');
        //       } else {
        //         message.error('Failed to upload documents');
        //         return;
        //       }
        //       break;
        //     case 4:
        //       // Add Beneficiaries
        //       console.log("Step 4: Submitting Beneficiaries");
        //       console.log('Submitting beneficiaries:', {Beneficiaries : beneficiaries});

              // result = await submitBeneficiaries({Beneficiaries : beneficiaries});
              
              // if (result && result.Success) {
              //   message.success('Beneficiaries saved successfully');
              // } else {
              //   message.error('Failed to save beneficiaries');
              //   return;
              // }
        //       break;

        //     case 5:
        //       console.log("Step 5: Review");
        //       break;

        
        //   default:
        //     break;
        // }



{/* {identificationType && !['NIN', 'BVN'].includes(identificationType) && (
                    <Col xs={24} md={8}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Expiry Date</span>}
                        name="identificationExpiry"
                        rules={[
                          { required: true, message: 'Please enter expiry date' }
                        ]}
                      >
                        <Input 
                          type="date"
                          size="large"
                          style={{ fontSize: '15px' }}
                        />
                      </Form.Item>
                    </Col>
                  )} */}



// {
//     "clientType": {
//         "clientType": "Individual"
//     },
//     "clientDetails": {
//         "FirstName": "Jekanmo",
//         "OtherName": "Client",
//         "LastName": "Tiamiyu",
//         "Mobile_Phone": "07010001201",
//         "City": "Lagos"
//     },
//     "nokDetails": {
//         "Nok_FirstName": "Kolawole",
//         "Nok_MiddleName": "middle",
//         "Nok_PhoneNumber": "09025361728",
//         "Nok_Country": "Nigeria",
//         "Nok_City": "Lagos",
//         "Nok_Address": "Lagos"
//     },
//     "uploadedDocs": {
//         "files": [
//             {
//                 "uid": "rc-upload-1764854684133-7"
//             }
//         ],
//         "kycTypes": [
//             "08"
//         ]
//     },
//     "beneficiaryDetails": {
//         "beneficiaries": [
//             {
//                 "Eaccount": "SITL-009",
//                 "Beneficiary_LastName": "Stl"
//             },
//             {
//                 "Eaccount": "HSHSH",
//                 "Beneficiary_FirstName": "MFMKF",
//                 "Beneficiary_LastName": "KRFJRF",
//                 "Beneficiary_MiddleName": "JFKFKQ"
//             }
//         ]
//     }
// }

{
    [
        {
            "AccountNumber": "2512080027",
            "FileName": "logo_stanbic1.png",
            "Data":"iVBORw0KGgoAAAANSUhEUgAAALgAAADNCAYAAAAL3Lq1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHsIAAB7CAW7QdT4AAItWSURBVHhe7V0HgF1Vtd1vep/JJJn0DgkQQgm9BRBBijRFActHFEVEvuj3g6JfRcX/LaggUhVBBRQQpErvvdcEQkJ6n5Lp7c17f629z7n3vjftzZsEAmbNnHf2OffcU9fdd59zWywJyFYMitZ2kc6uJJz5HfC7u5PS1R2GOzuj8Za2g/sgPoFeLsgTKSyMSVEB/IKYFOSL5MMVQS50cUXYno90BfkWxzDji4ssfiuGhn9LgvckROobk1LXkJT6JjjIdLUI121MWHgj5EbI6ieVtIT1lpORT9LJ9HxPpnYp5aTELACkbrN4S",
            "FileType": ".png",
            "DocumentType": "03",
            "DateCreated": "2025-12-08T13:24:38.59"
        }
    ]
    [
        {
            "AccountNumber": "2512080027",
            "FileName": "enrolleecard.png",
            "Data":"iVBORw0KGgoAAAANSUhEUgAAALgAAADNCAYAAAAL3Lq1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHsIAAB7CAW7QdT4AAItWSURBVHhe7V0HgF1Vtd1vep/JJJn0DgkQQgm9BRBBijRFActHFEVEvuj3g6JfRcX/LaggUhVBBRQQpErvvdcEQkJ6n5Lp7c17f629z7n3vjftzZsEAmbNnHf2OffcU9fdd59zWywJyFYMitZ2kc6uJJz5HfC7u5PS1R2GOzuj8Za2g/sgPoFeLsgTKSyMSVEB/IKYFOSL5MMVQS50cUXYno90BfkWxzDji4ssfiuGhn9LgvckROobk1LXkJT6JjjIdLUI121MWHgj5EbI6ieVtIT1lpORT9LJ9HxPpnYp5aTELACkbrN4S",
            "FileType": ".pdf",
            "DocumentType": "05",
            "DateCreated": "2025-12-08T13:25:38.59"
        }
    ]
}



// { "Title": "15", "FirstName": "JEKANMO", "LastName": "ALABI", "Gender": "2", "DATE_OF_BIRTH": "1987-11-20", "Maritial_Status": "2", "Nationality": "Nigeria", "State_Of_Origin": "OY", "Mobile_Phone": "07082560121", "Email": "BABAJEKAMO81@GMAIL.COM", "Residential_Country": "NGA", "City": "LAGOS", "State": "LA", "Address1": "OGUN STATE", "Address2": "", "BVN": "21245638893", "ID_Type": 2, "ID_Number": "123456789101112", "Employer": "1015", "Occupation": "NONE", "Designation": "NONE", "Data_Privacy": true, "CREATED_BY": "A268332", "FullName": "JEKANMO ALABI", "Passport": "", "AccountNumber": "2512020024", "SapId": "A268332" }





  const addIndividualClients = async(clientData) => {

    clientData['CREATED_BY'] = authUser.UserName
    clientData['FullName'] = `${clientData.FirstName} ${clientData.LastName}`
    clientData['Data_Privacy'] = clientData.Data_Privacy === 'Yes';
    clientData['Address2'] = ""
    clientData['PASSPORT'] = "";
    clientData["AccountNumber"] = formData?.accountNumber || location.state?.clientData.Customer_Reg_ID 
    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Add_Individual_Clients`, {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(clientData)
      })
        if (!response.ok) {
            let errorData = null;
            try {
              errorData = await response.json();
            } catch {
              // If response is not JSON, use text
              errorData = await response.text();
            }
            
            const error = new Error(`HTTP Error: ${response.status}`);
            error.status = response.status;
            error.data = errorData;
            
            // Log the error for debugging
            console.error(`API Error ${response.status}:`, errorData);
            
            // Throw to be caught by the catch block
            throw error;
          }
      const result = await response.json()
      console.log(result)
      return result
    } catch (error) {
      
      return { 
        success: false, 
        error: error.message, 
        data: error.data,
        status: error.status 
      };

    }
  }

  const submitNextOfKin = async (nokData) => {

    nokData["AccountNumber"] = formData.accountNumber || location.state.clientData.Customer_Reg_ID
    nokData["Nok_MiddleName"] = nokData["Nok_MiddleName"] ?? "";
    nokData["Nok_CreatedBy"] = authUser.UserName

    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Add_Relationship_To_IndividualClients`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nokData)
      });
      
      if (!response.ok) {
        throw new Error(`Response: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(result.Message)
      return result;
    } catch (error) {
      console.error('Error submitting Next of Kin:', error.message);
      throw error;
    }
  };

  const submitDocuments = async (files, kycTypes) => {
    try {
      const formDataObj = new FormData();
      files.forEach(
        file=>{
          formDataObj.append('files', file)
        }
      )
      kycTypes.forEach(
        kycType=>{
          formDataObj.append('kycTypes', kycType)
        }
      )
      const accountNumber = formData.accountNumber || location.state.clientData.Customer_Reg_ID
      formDataObj.append('accountNumber', accountNumber);

      
      // DEBUGGING
      console.log('FormData contents:');
        for (let pair of formDataObj.entries()) {
          console.log(pair[0], pair[1]);
      }
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Kyc-Upload/${accountNumber}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataObj
      });
      
      if (!response.ok) {
        throw new Error(`Response: ${response.status}`);
      }
      const result = await response.json();
      // const result = {Success:true};
      return result;
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  };

  const submitBeneficiaries = async (beneficiariesData) => {
    beneficiariesData["AccountNumber"] = formData.accountNumber
    beneficiariesData["Trust_Officer_SapID"] = authUser.UserName
    console.log(beneficiariesData)
    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Add_List_Of_Beneficiaries_To_IndividualClients`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(beneficiariesData)
      });
      
      if (!response.ok) {
        throw new Error(`Response: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting beneficiaries:', error);
      throw error;
    }
  };

  const submitOnboarding = async() =>{
    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Submit`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          SapId: authUser.UserName,
          AccountNumber: formData.accountNumber || location.state.clientData.AccountNumber
        })
      });
      if (!response.ok) {
        throw new Error(`Response: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.Message)
      return result;
    } catch (error) {
      console.error('Error submitting message:', error.message);
      throw error;
    }
  }





    // Beneficiary management
    // Beneficiary state
    const [beneficiaries, setBeneficiaries] = useState([{ id: 0 }]);
    const [beneficiaryData, setBeneficiaryData] = useState({});
    const [activeKeys, setActiveKeys] = useState(['0']);
    const handleAddBeneficiary = () => {
        const newId = beneficiaries.length > 0 ? Math.max(...beneficiaries.map(b => b.id)) + 1 : 0;
        const updatedBeneficiaries = [...beneficiaries, { id: newId }];
        setBeneficiaries(updatedBeneficiaries);
        setActiveKeys([...activeKeys, newId.toString()]);
    };

    const handleRemoveBeneficiary = (id) => {
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
        const newBeneficiaryData = { ...beneficiaryData };
        delete newBeneficiaryData[id];
        setBeneficiaryData(newBeneficiaryData);
        setActiveKeys(activeKeys.filter(key => key !== id.toString()));
    };

    const handleFieldChange = (beneficiaryId, fieldName, value) => {
        const updatedData = {
            ...beneficiaryData,
            [beneficiaryId]: {
                ...beneficiaryData[beneficiaryId],
                [fieldName]: value
            }
        };
        setBeneficiaryData(updatedData);
    };


    const getAllBeneficiariesData = () => {
      console.log(beneficiaryData)
        return beneficiaries.map(b => beneficiaryData[b.id] || {});
    };

    {currentStep === 4 && <BeneficiaryForm 
                        form={form}
                        utilities={utilities}
                        beneficiaries={beneficiaries}
                        beneficiaryData={beneficiaryData}
                        onAddBeneficiary={handleAddBeneficiary}
                        onRemoveBeneficiary={handleRemoveBeneficiary}
                        onFieldChange={handleFieldChange}
                        activeKeys={activeKeys}
                        onActiveKeysChange={setActiveKeys}
                  />}




 // Files state
  // const [files, setFiles] = useState([])
  // const [kycTypes, setKycTypes] = useState([])

  // const [resumeFiles, setResumeFiles] = useState([])
  // const [resumeKycTypes, setResumeKycTypes] = useState([]) 

  // const onAddFile = (file, kycType)=>{

  //   if (!file || !kycType) {
  //     message.error("No file or kyctype was selected")
  //   }

  //   setFiles((prev)=>[...prev, file])
  //   setKycTypes((prev)=>[...prev, kycType])
  // }

  // const onRemoveFile = (index)=>{
  //   setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  //   setKycTypes(prevTypes => prevTypes.filter((_, i) => i !== index));
  //   if (isResuming) {
  //     setResumeFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  //     setResumeKycTypes(prevTypes => prevTypes.filter((_, i) => i !== index))
  //   }
  // }


              {/* {
              formData?.clientType == 'Individual' ? (
            <Steps
              current={currentStep}
              items={individualSteps}
            /> 
              ) : (
              <Steps
                  current={currentStep}
                  items={corporateSteps}
                 /> 
              )
            } */}


