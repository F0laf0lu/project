import { Card, Row, Col, Button, Space } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  UploadOutlined
} from '@ant-design/icons';
import styles from './DocumentsTab.module.css';

const DocumentsTab = () => {
  const documents = [
    { name: 'Passport Photograph', uploaded: true, date: '2024-01-15', size: '2.3 MB' },
    { name: 'Identification Document', uploaded: true, date: '2024-01-15', size: '1.8 MB' },
    { name: 'Proof of Address', uploaded: true, date: '2024-01-16', size: '3.1 MB' },
    { name: 'Sanction Screening', uploaded: true, date: '2024-01-16', size: '456 KB' },
    { name: 'Adverse Media Search', uploaded: false, date: null, size: null },
    { name: 'Appointment Letter', uploaded: true, date: '2024-01-17', size: '1.2 MB' }
  ];

  const uploadedCount = documents.filter((d) => d.uploaded).length;
  const completionPercentage = Math.round((uploadedCount / documents.length) * 100);

  return (
    <Card bordered={false} className={styles.container}>
      <h4 className={styles.title}>Required Documents</h4>

      <div className={styles.list}>
        {documents.map((doc, index) => (
          <Card
            key={index}
            size="small"
            className={doc.uploaded ? styles.docCardUploaded : styles.docCardPending}
          >
            <Row gutter={[16, 8]} align="middle">
              <Col flex="none">
                {doc.uploaded ? (
                  <CheckCircleOutlined className={styles.iconSuccess} />
                ) : (
                  <CloseCircleOutlined className={styles.iconWarning} />
                )}
              </Col>
              <Col flex="auto">
                <div className={styles.docName}>{doc.name}</div>
                {doc.uploaded && (
                  <div className={styles.docMeta}>
                    Uploaded on {doc.date} • {doc.size}
                  </div>
                )}
                {!doc.uploaded && (
                  <div className={styles.docMetaPending}>Not uploaded yet</div>
                )}
              </Col>
              <Col flex="none">
                {doc.uploaded ? (
                  <Space>
                    <Button type="link" icon={<EyeOutlined />} size="small">
                      View
                    </Button>
                    <Button type="link" icon={<DownloadOutlined />} size="small">
                      Download
                    </Button>
                  </Space>
                ) : (
                  <Button type="primary" icon={<UploadOutlined />} size="small">
                    Upload
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        ))}
      </div>

      <div className={styles.summary}>
        <Row gutter={16}>
          <Col span={12}>
            <div className={styles.summaryText}>
              <strong>Uploaded:</strong> {uploadedCount} of {documents.length}
            </div>
          </Col>
          <Col span={12} className={styles.summaryRight}>
            <div className={styles.summaryText}>
              <strong>Completion:</strong> {completionPercentage}%
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DocumentsTab;
