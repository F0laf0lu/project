export const API_CONFIG = {
  BASE_URL: "https://webdev.stanbicibtcpension.com:7789/api",
  TIMEOUT: 30000,
};

export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: "/Admin/Login",
    GENERATE_OTP: "/Admin/GenerateOTP",
    VALIDATE_OTP: "/Admin/ValidateOTP",
  },

  ROLE:{
    CREATE_ROLE: "/Admin/CreateNewRole",
    ASSIGN_ROLE: "/Admin/AssignUserRole",
    MANAGE_ROLE: "/Admin/ManageUserRole"
  },

  UTILITIES: {
    COUNTRIES: "/Utilities/Countries",
    STATES: "/Utilities/States",
    TITLES: "/Utilities/Titles",
    GENDER: "/Utilities/Gender",
    RELATIONSHIP_TYPE: "/Utilities/RelationshipType",
    ID_CARD_TYPE: "/Utilities/ID_CardType",
    MARITAL_STATUS: "/Utilities/Maritial_Status",
    KYC_TYPES: "/Utilities/Get_KYCTypes",
    EMPLOYERS: "/Utilities/GetAllEmployers",
    BUSINESS_NATURE: "/Utilities/BusinessNature",
  },
  

  CLIENTS: {
    VERIFY_EMAIL: "/IndividualClientsOnboarding/VerifyEmail",
    VERIFY_MOBILE_NUMBER: "/IndividualClientsOnboarding/VerifyMobileNumber",
    VERIFY_BVN: "/IndividualClientsOnboarding/VerifyBVN",
    ADD_EMPLOYER: "/IndividualClientsOnboarding/AddEmployer",

    ADD_INDIVIDUAL: "/IndividualClientsOnboarding/Add_Individual_Clients",
    ADD_RELATIONSHIP: "/IndividualClientsOnboarding/Add_Relationship_To_IndividualClients",
    
    UPLOAD_DOCUMENTS: "/IndividualClientsOnboarding/Kyc-Upload",
    ADD_BENEFICIARIES: "/IndividualClientsOnboarding/Add_List_Of_Beneficiaries_To_IndividualClients",

    PREVIEW_CLIENT: "/IndividualClientsOnboarding/Preview_Individual_Clients",
    SUBMIT: "/IndividualClientsOnboarding/Submit",
    ONGOING_CLIENT_LIST: "/IndividualClientsOnboarding/GetList_Of_Ongoing_IndividualClient",
    ONGOING_CLIENT_DETAILS: "/IndividualClientsOnboarding/Get_Ongoing_Individual_ClientDetails",

    COMPLETED_CLIENT_LIST : "/IndividualClientsOnboarding/Get_List_Of_Completed_IndividualClients",
    COMPLETED_CLIENT_DETAILS : "/IndividualClientsOnboarding/Get_Completed_Individual_ClientDetails",
  },

  CORPORATECLIENTS:{
    ADD_CORPORATE_CLIENT: "/CorporateClientsOnboarding/AddNewCorporateClient",
    ADD_DIRECTORS: "/CorporateClientsOnboarding/AddListOFDirectors",
    UPLOAD_DOCUMENTS: "/CorporateClientsOnboarding/Corporate_Kyc_Upload/{accountNumber}",
    ADD_SHAREHOLDERS: "/CorporateClientsOnboarding/AddListOfShareholders",
    SUBMIT: "/CorporateClientsOnboarding/Submit_CorporateClient"
  }
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};