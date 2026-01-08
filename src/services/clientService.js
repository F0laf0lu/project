import apiClient from '../utils/apiClient';
import axiosClient from '../config/axiosInstance';
import { API_ENDPOINTS } from '../constants/api';


class ClientService {

  async addIndividualClient(clientData, userName, options={}) {
    const {accountNumber} = options
    const payload = {
      ...clientData,
      CREATED_BY: userName,
      FullName: `${clientData.FirstName} ${clientData.LastName}`,
      Data_Privacy: clientData.Data_Privacy === 'Yes',
      Address2: clientData.Address2 || '',
      Passport: clientData.Passport || '',
      AccountNumber : accountNumber
    };

    const response = await axiosClient.post(
      API_ENDPOINTS.CLIENTS.ADD_INDIVIDUAL,
      payload
    );
    return response.data;
  }


  async submitNextOfKin(nokData, accountNumber, userName) {
    const payload = {
      ...nokData,
      AccountNumber: accountNumber,
      Nok_MiddleName: nokData.Nok_MiddleName || '',
      Nok_CreatedBy: userName,
    };

    const response = await axiosClient.post(
      API_ENDPOINTS.CLIENTS.ADD_RELATIONSHIP,
      payload
    );
    console.log(response)
    return response.data;
  }

  async uploadDocuments(files, kycTypes, accountNumber) {
    const formData = new FormData();

      files.forEach(
          file=>{
            formData.append('files', file)
          }
        )
        kycTypes.forEach(
          kycType=>{
            formData.append('kycTypes', kycType)
          }
        )

    const url = `${API_ENDPOINTS.CLIENTS.UPLOAD_DOCUMENTS}/${accountNumber}`

    const response = await axiosClient.postForm(
      url,
      formData,
    );

    return response.data;
  }

  async submitBeneficiaries(beneficiaries, accountNumber, userName) {
    const payload = {
      AccountNumber: accountNumber,
      Trust_Officer_SapID: userName,
      ...beneficiaries
    };
    console.log(payload)

    const response = await axiosClient.post(
      API_ENDPOINTS.CLIENTS.ADD_BENEFICIARIES,
      payload,
    );

    return response.data;
  }

  async addCorporateClient(clientData, userName, options={}) {
    const {accountNumber} = options
    const payload = {
      ...clientData,
      Created_By: userName,
      Contact_Email_Address: clientData.Contact_Email_Address || '',
      AccountNumber : accountNumber
    };

    const response = await axiosClient.post(
      API_ENDPOINTS.CORPORATECLIENTS.ADD_CORPORATE_CLIENT,
      payload
    );
    return response.data;
  }

  async submitDirectors(directors, accountNumber, userName) {
    const payload = {
      AccountNumber: accountNumber,
      Trust_Officer_SapID: userName,
      Directors: directors
    };
    console.log(payload)

    const response = await axiosClient.post(
      API_ENDPOINTS.CORPORATECLIENTS.ADD_DIRECTORS,
      payload,
    );

    return response.data;
  }

  async uploadCorporateDocuments(files, kycTypes, accountNumber) {
    const formData = new FormData();

    files.forEach(
      file=>{
        formData.append('files', file)
      }
    )
    kycTypes.forEach(
      kycType=>{
        formData.append('kycTypes', kycType)
      }
    )

    const url = API_ENDPOINTS.CORPORATECLIENTS.UPLOAD_DOCUMENTS.replace('{accountNumber}', accountNumber)

    const response = await axiosClient.postForm(
      url,
      formData,
    );

    return response.data;
  }

  async submitCorporateOnboarding(sapID, accountNumber){
    const payload = {
      SapId: sapID,
      AccountNumber: accountNumber
    }

    const response = await axiosClient.post(
      API_ENDPOINTS.CORPORATECLIENTS.SUBMIT,
      payload
    )
    return response.data
  }

  async submitOnboarding(sapID, accountNumber){
    const payload = {
      SapId: sapID,
       AccountNumber: accountNumber
    }

    const response = await axiosClient.post(
      API_ENDPOINTS.CLIENTS.SUBMIT,
      payload
    )
    return response.data
  }

  async onboardingClientList(){
    const response = await axiosClient.get(
      API_ENDPOINTS.CLIENTS.ONGOING_CLIENT_LIST
    )
    return response.data
  }

  async onboardingClientDetails(accountNumber){
    const url = `${API_ENDPOINTS.CLIENTS.ONGOING_CLIENT_DETAILS}?accountNumber=${accountNumber}`
    const response = await apiClient.post(
      API_ENDPOINTS.CLIENTS.ONGOING_CLIENT_LIST
    )
    return response.data
  }

  async completedClientList(){
    const response = await axiosClient.get(
      API_ENDPOINTS.CLIENTS.COMPLETED_CLIENT_LIST
    )
    return response.data
  }

  async verifyEmail(email) {
    const payload = {
      Email: email,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.CLIENTS.VERIFY_EMAIL,
      payload,
    );

    return response.data;
  }
  async verifyBVN(bvn) {
    const payload = {
      BVN: bvn,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.CLIENTS.VERIFY_BVN,
      payload,
    );

    return response.data;
  }
  async verifyMobileNumber(mobileNumber) {
    const payload = {
      MobileNumber: mobileNumber,
    };

    const response = await apiClient.post(
      API_ENDPOINTS.CLIENTS.VERIFY_MOBILE_NUMBER ,
      payload,
    );

    return response.data;
  }
}

export default new ClientService();