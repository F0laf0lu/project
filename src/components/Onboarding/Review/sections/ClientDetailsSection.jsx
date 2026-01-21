import { Row, Col } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import DisplayField from '../../../common/DisplayField';
import styles from '../ReviewOnboarding.module.css';

const ClientDetailsSection = ({ form, clientType, displayValue }) => {
  return (
    <div className={styles.section}>
      <SectionHeader icon={<IdcardOutlined />} title="Client Details" />

      {clientType === 'Individual' ? (
        <>
          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Personal Information</h5>
            <Row gutter={[16, 12]}>
              <Col xs={12} md={6}>
                <div className={styles.fieldLabel}>Full Name</div>
                <div className={styles.fieldValue}>
                  {displayValue('Title', '')} {displayValue('FirstName', '')}{' '}
                  {displayValue('middleName', '')} {displayValue('LastName', 'N/A')}
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.fieldLabel}>Gender</div>
                <div className={styles.fieldValue}>{displayValue('Gender')}</div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.fieldLabel}>Date of Birth</div>
                <div className={styles.fieldValue}>{displayValue('DATE_OF_BIRTH')}</div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.fieldLabel}>Occupation</div>
                <div className={styles.fieldValue}>{displayValue('Occupation')}</div>
              </Col>
            </Row>
          </div>

          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Contact Information</h5>
            <Row gutter={[16, 12]}>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{displayValue('Email')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Mobile Phone</div>
                <div className={styles.fieldValue}>{displayValue('Mobile_Phone')}</div>
              </Col>
            </Row>
          </div>

          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Address Information</h5>
            <Row gutter={[16, 12]}>
              <Col xs={24} md={12}>
                <div className={styles.fieldLabel}>Address Line 1</div>
                <div className={styles.fieldValue}>{displayValue('Address1')}</div>
              </Col>
              <Col xs={24} md={12}>
                <div className={styles.fieldLabel}>Address Line 2</div>
                <div className={styles.fieldValue}>{displayValue('Address2')}</div>
              </Col>
            </Row>
            <Row gutter={[16, 12]} style={{ marginTop: '20px' }}>
              <Col xs={24} md={12}>
                <div className={styles.fieldLabel}>Country</div>
                <div className={styles.fieldValue}>{displayValue('Residential_Country')}</div>
              </Col>
              <Col xs={24} md={12}>
                <div className={styles.fieldLabel}>State</div>
                <div className={styles.fieldValue}>{displayValue('State')}</div>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Company Information</h5>
            <Row gutter={[16, 12]}>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Company Name</div>
                <div className={styles.fieldValue}>{displayValue('companyName')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>RC Number</div>
                <div className={styles.fieldValue}>{displayValue('rcNumber')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>TIN</div>
                <div className={styles.fieldValue}>{displayValue('tin')}</div>
              </Col>
              <Col xs={12} md={12}>
                <div className={styles.fieldLabel}>Company Type</div>
                <div className={styles.fieldValue}>{displayValue('companyType')}</div>
              </Col>
              <Col xs={12} md={12}>
                <div className={styles.fieldLabel}>Nature of Business</div>
                <div className={styles.fieldValue}>{displayValue('natureOfBusiness')}</div>
              </Col>
            </Row>
          </div>

          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Contact Person</h5>
            <Row gutter={[16, 12]}>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>
                  {displayValue('contactFirstName', '')}{' '}
                  {displayValue('contactMiddleName', '')}{' '}
                  {displayValue('contactLastName', 'N/A')}
                </div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{displayValue('email')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Phone</div>
                <div className={styles.fieldValue}>{displayValue('phone')}</div>
              </Col>
            </Row>
          </div>

          <div className={styles.subsection}>
            <h5 className={styles.subsectionTitle}>Compliance</h5>
            <Row gutter={[16, 12]}>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Risk Classification</div>
                <div className={styles.fieldValue}>{displayValue('riskClassification')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>Sanction Status</div>
                <div className={styles.fieldValue}>{displayValue('sanctionStatus')}</div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.fieldLabel}>PEP Status</div>
                <div className={styles.fieldValue}>{displayValue('pepStatus')}</div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientDetailsSection;
