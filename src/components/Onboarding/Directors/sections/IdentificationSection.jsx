import { Row, Col, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../DirectorsForm.module.css';

const IdentificationSection = ({ directorId, onFieldChange, handleUpload }) => {
  return (
    <div className={styles.section}>
      <SectionHeader title="Identification Information" variant="secondary" />

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>BVN</span>}
            name={`director_BVN_${directorId}`}
            rules={[{ required: true, message: 'Please enter BVN' }]}
          >
            <Input
              placeholder="BVN"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'BVN', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Identification Type</span>}
            name={`director_ID_Type_${directorId}`}
            rules={[{ required: true, message: 'Please select Id type' }]}
          >
            <Select
              showSearch
              placeholder="Select ID Type"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'ID_Type', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Valid">Driver's Licence</Select.Option>
              <Select.Option value="Invalid">NIMC</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Identification Number</span>}
            name={`director_ID_Number_${directorId}`}
          >
            <Input
              placeholder="Identification Number"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'ID_Number', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Identification Expiry Date</span>}
            name={`director_Id_Card_Expiry_Date_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              type="date"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Id_Card_Expiry_Date', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Identification Validity</span>}
            name={`director_Identification_Validity_${directorId}`}
            rules={[{ required: true, message: 'Please select Identification validity' }]}
          >
            <Select
              showSearch
              placeholder="Select ID Type"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Identification_Validity', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Valid">Valid</Select.Option>
              <Select.Option value="Invalid">Invalid</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label={<span className={styles.label}>Identification Document Upload</span>}
            name={`director_Identification_Document_${directorId}`}
            rules={[{ required: true, message: 'Please enter Address' }]}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_Identification_Document_${directorId}`)
              }
              showUploadList={false}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            label={<span className={styles.label}>Passport Photograph Upload</span>}
            name={`director_Passport_Photograph_${directorId}`}
            rules={[{ required: true, message: 'Please upload Passport Photograph' }]}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_Passport_Photograph_${directorId}`)
              }
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default IdentificationSection;
