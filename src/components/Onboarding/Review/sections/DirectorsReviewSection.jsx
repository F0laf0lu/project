import { Row, Col, Tag, Collapse } from 'antd';
import { TeamOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../ReviewOnboarding.module.css';

const { Panel } = Collapse;

const DirectorsReviewSection = ({ directors, directorData }) => {
  const renderDocumentStatus = (data, fieldName, label) => {
    const hasDoc = data[fieldName] && data[fieldName].length > 0;
    return (
      <Tag
        icon={hasDoc ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        color={hasDoc ? 'success' : 'default'}
      >
        {label}
      </Tag>
    );
  };

  if (!directors || directors.length === 0) return null;

  return (
    <div className={styles.section}>
      <SectionHeader
        icon={<TeamOutlined />}
        title={`Directors (${directors.length} ${directors.length === 1 ? 'director' : 'directors'} added)`}
      />

      <Collapse accordion={false} expandIconPosition="end" className={styles.collapse}>
        {directors.map((director, index) => {
          const data = directorData[director.id] || {};
          const displayName =
            [data.Title, data.FirstName, data.OtherName, data.LastName]
              .filter(Boolean)
              .join(' ') || `Director ${index + 1}`;

          return (
            <Panel
              header={
                <div className={styles.panelHeader}>
                  <span className={styles.panelName}>{displayName}</span>
                  {data.Email && <Tag color="blue">{data.Email}</Tag>}
                </div>
              }
              key={director.id.toString()}
              className={styles.panel}
            >
              <Row gutter={[16, 16]}>
                {/* Personal Information */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>{displayName}</div>
                </Col>

                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>Date of Birth</div>
                  <div className={styles.fieldValue}>
                    {data.Date_Of_Birth || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>Nationality</div>
                  <div className={styles.fieldValue}>
                    {data.Nationality || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>State of Origin</div>
                  <div className={styles.fieldValue}>
                    {data.State_Of_Origin || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>

                {/* Location Information */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Location Information</div>
                </Col>

                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>Country</div>
                  <div className={styles.fieldValue}>
                    {data.Country || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>State of Residency</div>
                  <div className={styles.fieldValue}>
                    {data.State_Of_Residency || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>City</div>
                  <div className={styles.fieldValue}>
                    {data.City || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>

                {/* Contact Information */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Contact Information</div>
                </Col>

                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>Mobile Number</div>
                  <div className={styles.fieldValue}>
                    {data.Mobile_Number1_Country_Code && data.Mobile_Number1 ? (
                      `${data.Mobile_Number1_Country_Code} ${data.Mobile_Number1}`
                    ) : (
                      <span className={styles.empty}>Not provided</span>
                    )}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>Email</div>
                  <div className={styles.fieldValue}>
                    {data.Email || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>

                {/* Professional Information */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Professional Information</div>
                </Col>

                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>Occupation</div>
                  <div className={styles.fieldValue}>
                    {data.Occupation || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>Source of Wealth</div>
                  <div className={styles.fieldValue}>
                    {data.Source_Of_Wealth || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>BVN</div>
                  <div className={styles.fieldValue}>
                    {data.BVN || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>

                {/* Identification */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Identification</div>
                </Col>

                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>ID Type</div>
                  <div className={styles.fieldValue}>
                    {data.ID_Type || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>ID Number</div>
                  <div className={styles.fieldValue}>
                    {data.ID_Number || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className={styles.fieldLabel}>ID Validity</div>
                  <div className={styles.fieldValue}>
                    {data.Identification_Validity ? (
                      <Tag color={data.Identification_Validity === 'Valid' ? 'success' : 'error'}>
                        {data.Identification_Validity}
                      </Tag>
                    ) : (
                      <span className={styles.empty}>Not provided</span>
                    )}
                  </div>
                </Col>

                {/* Compliance */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Compliance</div>
                </Col>

                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>PEP Status</div>
                  <div className={styles.fieldValue}>
                    {data.PEP_Status ? (
                      <Tag color={data.PEP_Status === 'PEP' ? 'warning' : 'success'}>
                        {data.PEP_Status}
                      </Tag>
                    ) : (
                      <span className={styles.empty}>Not provided</span>
                    )}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>Sanction Screening Status</div>
                  <div className={styles.fieldValue}>
                    {data.Sanction_Screening_Status ? (
                      <Tag
                        color={data.Sanction_Screening_Status === 'Blacklisted' ? 'error' : 'success'}
                      >
                        {data.Sanction_Screening_Status}
                      </Tag>
                    ) : (
                      <span className={styles.empty}>Not provided</span>
                    )}
                  </div>
                </Col>

                {/* Documents Status */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Documents</div>
                </Col>

                <Col xs={24}>
                  <div className={styles.documentTags}>
                    {renderDocumentStatus(data, 'Proof_Of_Address_Document', 'Proof of Address')}
                    {renderDocumentStatus(data, 'Identification_Document', 'ID Document')}
                    {renderDocumentStatus(data, 'Passport_Photograph', 'Passport Photo')}
                    {renderDocumentStatus(data, 'PEP_Approval_Document', 'PEP Approval')}
                    {renderDocumentStatus(data, 'International_Passport', 'International Passport')}
                    {renderDocumentStatus(data, 'Sanction_Screening_Document', 'Sanction Screening')}
                    {renderDocumentStatus(data, 'Safe_Watch', 'Safe Watch')}
                  </div>
                </Col>
              </Row>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default DirectorsReviewSection;
