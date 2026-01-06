
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../constants/api';


class UtilitiesService {

  async getCountries(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.COUNTRIES, token);
    return response.Data || [];
  }

  async getStates(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.STATES, token);
    return response.Data || [];
  }

  async getTitles(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.TITLES, token);
    return response.Data || [];
  }

  async getGenders(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.GENDER, token);
    return response.Data || [];
  }

  async getRelationshipTypes(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.RELATIONSHIP_TYPE, token);
    return response.Data || [];
  }

  async getIdCardTypes(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.ID_CARD_TYPE, token);
    return response.Data || [];
  }

  async getMaritalStatuses(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.MARITAL_STATUS, token);
    return response.Data || [];
  }

  async getKycTypes(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.KYC_TYPES, token);
    return response.Data || [];
  }

  async getEmployers(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.EMPLOYERS, token);
    return response.Data || [];
  }

  async getBusinessNatures(token) {
    const response = await apiClient.get(API_ENDPOINTS.UTILITIES.BUSINESS_NATURE, token);
    return response.Data || [];
  }

  async getAllUtilities(token) {
    try {
      const [
        countries,
        states,
        titles,
        genders,
        relationshipTypes,
        idCardTypes,
        maritalStatuses,
        kycTypes,
        employers,
        businessNatures,
      ] = await Promise.all([
        this.getCountries(token),
        this.getStates(token),
        this.getTitles(token),
        this.getGenders(token),
        this.getRelationshipTypes(token),
        this.getIdCardTypes(token),
        this.getMaritalStatuses(token),
        this.getKycTypes(token),
        this.getEmployers(token),
        this.getBusinessNatures(token),
      ]);

      return {
        countryOptions: countries,
        stateOptions: states,
        titleOptions: titles,
        genderOptions: genders,
        relationshipTypeOptions: relationshipTypes,
        idCardTypeOptions: idCardTypes,
        maritalStatusOptions: maritalStatuses,
        kycTypeOptions: kycTypes,
        employersOptions: employers,
        businessNatureOptions: businessNatures,
      };
    } catch (error) {
      console.error('Error fetching utilities:', error);
      throw error;
    }
  }
}

export default new UtilitiesService();