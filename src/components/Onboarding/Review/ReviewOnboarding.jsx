import { getValueFromName, getNameFromValue } from '../../../utils/utils';
import {
  ClientTypeSection,
  ClientDetailsSection,
  DirectorsReviewSection,
  ShareholdersReviewSection,
  DocumentsReviewSection,
  BeneficiariesReviewSection,
  SubmitSection
} from './sections';
import styles from './ReviewOnboarding.module.css';

const AVAILABLE_KYC_TYPES = [
  { Kyc_ID: '01', Kyc_Type: 'Passport photograph of Settlor' },
  { Kyc_ID: '02', Kyc_Type: 'Valid means of identification of Settlor' },
  { Kyc_ID: '03', Kyc_Type: 'Utility bill not older than 3 months for Settlor (Address Verification)' },
  { Kyc_ID: '04', Kyc_Type: 'Completed Email Indemnity Form' },
  { Kyc_ID: '05', Kyc_Type: 'Simple Will Agreement' },
  { Kyc_ID: '06', Kyc_Type: 'Comprehensive Will Agreement' },
  { Kyc_ID: '07', Kyc_Type: 'Confirmation of Previous Wills' },
  { Kyc_ID: '08', Kyc_Type: 'Passport photograph of beneficiary' },
  { Kyc_ID: '09', Kyc_Type: 'Birth certificate of beneficiary' },
  { Kyc_ID: '10', Kyc_Type: 'Others' }
];

const ReviewOnboarding = ({
  form,
  beneficiaries,
  files,
  kycTypes,
  utilities,
  directors,
  directorData,
  shareholders,
  shareholderData
}) => {
  const clientType = form.getFieldValue('clientType');
  const companyType = form.getFieldValue('companyType');

  const hasValue = (fieldName) => {
    const value = form.getFieldValue(fieldName);
    return value !== undefined && value !== null && value !== '';
  };

  const displayValue = (fieldName, defaultText = 'Not provided') => {
    let value = form.getFieldValue(fieldName);
    const selectFields = ['Title', 'Gender', 'Residential_Country', 'State', 'State_Of_Origin'];

    if (selectFields.includes(fieldName)) {
      const getValue =
        fieldName === 'Residential_Country'
          ? getNameFromValue(value, utilities.countryOptions)
          : fieldName === 'State_Of_Origin'
          ? getNameFromValue(value, utilities.stateOptions)
          : getNameFromValue(value, utilities[`${fieldName.toLowerCase()}Options`]);
      value = getValue;
    }

    if (value === undefined || value === null || value === '') {
      return <span className={styles.empty}>{defaultText}</span>;
    }
    return <span className={styles.valueText}>{value}</span>;
  };

  return (
    <div>
      <h3 className={styles.title}>Review Your Information</h3>
      <p className={styles.description}>
        Please review all information before submitting. You can go back to edit any section.
      </p>

      <ClientTypeSection displayValue={displayValue} />

      <ClientDetailsSection
        form={form}
        clientType={clientType}
        displayValue={displayValue}
      />

      {clientType === 'Corporate' && (
        <>
          <DirectorsReviewSection
            directors={directors}
            directorData={directorData}
          />
          <ShareholdersReviewSection
            shareholders={shareholders}
            shareholderData={shareholderData}
          />
        </>
      )}

      <DocumentsReviewSection
        clientType={clientType}
        companyType={companyType}
        files={files}
        kycTypes={kycTypes}
        hasValue={hasValue}
        availableKycTypes={AVAILABLE_KYC_TYPES}
      />

      <BeneficiariesReviewSection
        form={form}
        beneficiaries={beneficiaries}
        clientType={clientType}
      />

      <SubmitSection />
    </div>
  );
};

export default ReviewOnboarding;
