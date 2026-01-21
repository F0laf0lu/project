import { Row, Col, Form, Input } from 'antd';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../DirectorsForm.module.css';

const ContactInfoSection = ({ directorId, onFieldChange }) => {
  return (
    <div className={styles.section}>
      <SectionHeader title="Contact Information" variant="secondary" />

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Form.Item
            label={<span className={styles.label}>Country Code</span>}
            name={`director_Mobile_Number1_Country_Code_${directorId}`}
            rules={[{ required: true, message: 'Please enter mobile number' }]}
          >
            <Input
              placeholder="+234"
              size="large"
              onChange={(e) =>
                onFieldChange(directorId, 'Mobile_Number1_Country_Code', e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={<span className={styles.label}>Mobile number</span>}
            name={`director_Mobile_Number1_${directorId}`}
            rules={[{ required: true, message: 'Please enter mobile number' }]}
          >
            <Input
              placeholder="8010001000"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Mobile_Number1', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={<span className={styles.label}>Email Address</span>}
            name={`director_Email_${directorId}`}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              placeholder="email@example.com"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Email', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default ContactInfoSection;
