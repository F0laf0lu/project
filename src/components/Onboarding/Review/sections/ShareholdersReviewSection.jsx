import { Row, Col, Tag, Collapse } from 'antd';
import { TeamOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../ReviewOnboarding.module.css';

const { Panel } = Collapse;

const ShareholdersReviewSection = ({ shareholders, shareholderData }) => {
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

  if (!shareholders || shareholders.length === 0) return null;

  return (
    <div className={styles.section}>
      <SectionHeader
        icon={<TeamOutlined />}
        title={`Shareholders (${shareholders.length} ${shareholders.length === 1 ? 'shareholder' : 'shareholders'} added)`}
      />

      <Collapse accordion={false} expandIconPosition="end" className={styles.collapse}>
        {shareholders.map((shareholder, index) => {
          const data = shareholderData[shareholder.id] || {};
          const displayName =
            [data.Title, data.FirstName, data.OtherName, data.LastName]
              .filter(Boolean)
              .join(' ') || `Shareholder ${index + 1}`;

          return (
            <Panel
              header={
                <div className={styles.panelHeader}>
                  <span className={styles.panelName}>{displayName}</span>
                  {data.Shareholder_Type && (
                    <Tag color={data.Shareholder_Type === 'Individual' ? 'blue' : 'purple'}>
                      {data.Shareholder_Type}
                    </Tag>
                  )}
                </div>
              }
              key={shareholder.id.toString()}
              className={styles.panel}
            >
              <Row gutter={[16, 16]}>
                {/* Shareholder Information */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>{displayName}</div>
                </Col>

                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>Shareholder Type</div>
                  <div className={styles.fieldValue}>
                    {data.Shareholder_Type ? (
                      <Tag color={data.Shareholder_Type === 'Individual' ? 'blue' : 'purple'}>
                        {data.Shareholder_Type}
                      </Tag>
                    ) : (
                      <span className={styles.empty}>Not provided</span>
                    )}
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className={styles.fieldLabel}>ID Card Type</div>
                  <div className={styles.fieldValue}>
                    {data.ID_Card_Type || <span className={styles.empty}>Not provided</span>}
                  </div>
                </Col>

                {/* Documents Status */}
                <Col xs={24}>
                  <div className={styles.reviewSubheader}>Documents</div>
                </Col>

                <Col xs={24}>
                  <div className={styles.documentTags}>
                    {renderDocumentStatus(data, 'Inorporate_Shareholder', 'Incorporate Shareholder')}
                    {renderDocumentStatus(data, 'Shareholder_Proof_ID', 'Proof ID')}
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

export default ShareholdersReviewSection;
