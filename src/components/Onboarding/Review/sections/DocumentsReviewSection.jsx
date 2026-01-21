import { Row, Col, List, Space, Tag } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../ReviewOnboarding.module.css';

const DocumentsReviewSection = ({
  clientType,
  companyType,
  files,
  kycTypes,
  hasValue,
  availableKycTypes
}) => {
  const getKycTypeName = (kycId) => {
    const kycType = availableKycTypes.find((kyc) => kyc.Kyc_ID === kycId);
    return kycType ? kycType.Kyc_Type : 'Unknown';
  };

  const renderDocStatus = (fieldName, label) => {
    const hasDoc = hasValue(fieldName);
    return (
      <div className={styles.docStatus}>
        {hasDoc ? (
          <CheckCircleOutlined className={styles.iconSuccess} />
        ) : (
          <CloseCircleOutlined className={styles.iconError} />
        )}
        <span className={hasDoc ? styles.docLabel : styles.docLabelMuted}>{label}</span>
      </div>
    );
  };

  return (
    <div className={styles.section}>
      <SectionHeader
        icon={<FileTextOutlined />}
        title={`Uploaded Documents (${files.length})`}
      />

      {clientType === 'Corporate' ? (
        <div>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              {renderDocStatus('incorporationCertificate', 'Incorporation Certificate')}
              {['Limited Liability', 'Limited by Guarantee', 'Unlimited Liability', 'Public Limited Company'].includes(companyType) &&
                renderDocStatus('memart', 'Memorandum & Articles of Association')}
              {companyType === 'Incorporated Trustee' &&
                renderDocStatus('constitution', 'Constitution')}
              {renderDocStatus('companyProofOfAddress', 'Company Proof of Address')}
              {renderDocStatus('cacStatusReport', 'CAC Status Report')}
              {renderDocStatus('appointmentLetter', 'Appointment Letter')}
              {renderDocStatus('legalSearch', 'Legal Search')}
            </Col>
            <Col xs={24} md={12}>
              {renderDocStatus('companySanctionScreening', 'Company Sanction Screening')}
              {renderDocStatus('adverseMediaSearch', 'Adverse Media Search')}
              {renderDocStatus('identificationDocument', 'Identification Document')}
              {renderDocStatus('contactSanctionScreening', 'Contact Person Sanction Screening')}
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          {files.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <List
                dataSource={files}
                renderItem={(file, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={
                        <Space direction="vertical" size={4}>
                          <span className={styles.fileName}>{file.name}</span>
                          <Tag color="blue">{getKycTypeName(kycTypes[index])}</Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentsReviewSection;
