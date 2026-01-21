import { Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../ReviewOnboarding.module.css';

const ClientTypeSection = ({ displayValue }) => {
  return (
    <div className={styles.section}>
      <SectionHeader icon={<UserOutlined />} title="Client Type" />
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Client Type</div>
            <div className={styles.fieldValue}>{displayValue('clientType')}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ClientTypeSection;
