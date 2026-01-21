import { Button, Tag } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import {
  PersonalInfoSection,
  LocationInfoSection,
  ContactInfoSection,
  IdentificationSection,
  ComplianceSection
} from '../sections';
import styles from './DirectorPanel.module.css';

const { Panel } = Collapse;

const DirectorPanel = ({
  director,
  index,
  directorData,
  directors,
  form,
  utilities,
  onFieldChange,
  onRemove
}) => {
  const directorId = director.id;
  const { countries, titles, states } = {
    countries: utilities.countryOptions,
    titles: utilities.titleOptions,
    states: utilities.stateOptions
  };

  const capitalize = (word) => {
    if (!word || word.length === 0) return '';
    return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const getDirectorDisplayName = () => {
    const data = directorData[directorId];
    if (data && (data.FirstName || data.LastName)) {
      return `${data.FirstName || ''} ${data.LastName || ''}`.trim();
    }
    return `Director ${index + 1}`;
  };

  const getDirectorStatus = () => {
    const data = directorData[directorId];
    if (!data) return { complete: false, filled: 0, total: 21 };

    const requiredFields = [
      'SeQNum', 'FirstName', 'LastName', 'OtherName', 'Country',
      'State_Of_Residency', 'Prof_Of_Address_Type', 'Nationality',
      'Date_Of_Birth', 'State_Of_Origin', 'Occupation', 'Source_Of_Wealth',
      'PEP_Status', 'ID_Number', 'ID_Type', 'Id_Card_Expiry_Date',
      'Identification_Document', 'Identification_Validity',
      'Mobile_Numbner1_Country_Code', 'Mobile_Number1', 'BVN'
    ];
    const filled = requiredFields.filter((field) => data[field] && data[field] !== '').length;
    const total = requiredFields.length;
    return { complete: filled === total, filled, total };
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (file, fieldName) => {
    try {
      const base64String = await getBase64(file);
      const fileName = file.name;
      if (!base64String) return false;

      form.setFieldsValue({ [fieldName]: base64String });

      const fieldNameWithoutId = fieldName.replace(`director_`, '').replace(`_${directorId}`, '');

      const fieldMapping = {
        'Proof_Of_Address_Document': {
          documentField: 'Proof_Of_Address_Document',
          nameField: 'Proof_Of_Address_Document_Name'
        },
        'Identification_Document': {
          documentField: 'Identification_Document',
          nameField: 'Identification_Document_Name'
        },
        'Passport_Photograph': {
          documentField: 'Passport_Photograph',
          nameField: 'Passport_Photograph_Name'
        },
        'PEP_Approval_Document': {
          documentField: 'PEP_Approval_Document',
          nameField: 'PEP_Approval_Document_Name'
        },
        'International_Passport': {
          documentField: 'International_Passport',
          nameField: 'International_Passport_name'
        },
        'Sanction_Screening': {
          documentField: 'Sanction_Screening_Document',
          nameField: 'Sanction_Screening_Document_Name'
        },
        'Safe_Watch': {
          documentField: 'Safe_Watch',
          nameField: 'SafeWatch_Name'
        }
      };

      const mapping = fieldMapping[fieldNameWithoutId];
      if (mapping) {
        const updateFields = {
          [mapping.documentField]: base64String,
          [mapping.nameField]: fileName
        };
        Object.entries(updateFields).forEach(([field, value]) => {
          onFieldChange(directorId, field, value);
        });
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const status = getDirectorStatus();
  const displayName = getDirectorDisplayName();

  const panelHeader = (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.name}>{displayName}</span>
        {status.complete ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Complete
          </Tag>
        ) : (
          <Tag color="processing">
            {status.filled}/{status.total} fields completed
          </Tag>
        )}
      </div>
      {directors.length > 1 && (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(directorId);
          }}
        >
          Remove
        </Button>
      )}
    </div>
  );

  return (
    <Panel header={panelHeader} key={directorId.toString()} className={styles.panel}>
      <PersonalInfoSection
        directorId={directorId}
        titles={titles}
        states={states}
        countries={countries}
        onFieldChange={onFieldChange}
        capitalize={capitalize}
      />
      <LocationInfoSection
        directorId={directorId}
        countries={countries}
        states={states}
        onFieldChange={onFieldChange}
        handleUpload={handleUpload}
      />
      <ContactInfoSection directorId={directorId} onFieldChange={onFieldChange} />
      <IdentificationSection
        directorId={directorId}
        onFieldChange={onFieldChange}
        handleUpload={handleUpload}
      />
      <ComplianceSection
        directorId={directorId}
        onFieldChange={onFieldChange}
        handleUpload={handleUpload}
      />
    </Panel>
  );
};

export default DirectorPanel;
