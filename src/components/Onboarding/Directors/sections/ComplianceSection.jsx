import { Row, Col, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../DirectorsForm.module.css';

const ComplianceSection = ({ directorId, onFieldChange, handleUpload }) => {
  return (
    <div className={styles.section}>
      <SectionHeader title="Other Information" variant="secondary" />

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Occupation</span>}
            name={`director_Occupation_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Enter occupation"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Occupation', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Source of Wealth</span>}
            name={`director_Source_Of_Wealth_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Enter Source Of Wealth"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Source_Of_Wealth', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>PEP Status</span>}
            name={`director_PEP_Status_${directorId}`}
            rules={[{ required: true, message: 'Please select PEP Status' }]}
          >
            <Select
              showSearch
              placeholder="Select PEP status"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'PEP_Status', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="PEP">PEP</Select.Option>
              <Select.Option value="Non PEP">Non PEP</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>PEP Approval Status</span>}
            name={`director_PEP_Approval_Status_${directorId}`}
            rules={[{ required: true, message: 'Please select PEP Status' }]}
          >
            <Select
              showSearch
              placeholder="Select PEP Approval Status"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'PEP_Approval_Status', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Approved">Approved</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Sanction Screening Status</span>}
            name={`director_Sanction_Screening_Status_${directorId}`}
            rules={[{ required: true, message: 'Please select Sanction Screening Status' }]}
          >
            <Select
              showSearch
              placeholder="Select PEP status"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Sanction_Screening_Status', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Blacklisted">Blacklisted</Select.Option>
              <Select.Option value="Not Blacklisted">Not Blacklisted</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>PEP Approval Document Upload</span>}
            name={`director_PEP_Approval_Document_${directorId}`}
            rules={[{ required: true, message: 'Please enter Address' }]}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_PEP_Approval_Document_${directorId}`)
              }
              showUploadList={false}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>International Passport Upload</span>}
            name={`director_International_Passport_${directorId}`}
            rules={[{ required: true, message: 'Please upload Passport Photograph' }]}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_International_Passport_${directorId}`)
              }
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Sanction Screening Document Upload</span>}
            name={`director_Sanction_Screening_${directorId}`}
            rules={[{ required: true, message: 'Please upload Sanction Screening' }]}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_Sanction_Screening_${directorId}`)
              }
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={<span className={styles.label}>Safe Watch Document Upload</span>}
            name={`director_Safe_Watch_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Upload
              beforeUpload={(file) => handleUpload(file, `director_Safe_Watch_${directorId}`)}
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

export default ComplianceSection;
