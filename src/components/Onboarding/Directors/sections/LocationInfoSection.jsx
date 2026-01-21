import { Row, Col, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../DirectorsForm.module.css';

const { Option } = Select;

const LocationInfoSection = ({ directorId, countries, states, onFieldChange, handleUpload }) => {
  return (
    <div className={styles.section}>
      <SectionHeader title="Location Information" variant="secondary" />

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Country</span>}
            name={`director_Country_${directorId}`}
            rules={[{ required: true, message: 'Please select country' }]}
          >
            <Select
              showSearch
              placeholder="Select country"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Country', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {countries?.map((country, index) => (
                <Option key={index} value={country.Value}>
                  {country.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>City</span>}
            name={`director_City_${directorId}`}
          >
            <Input
              placeholder="City"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'City', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>State</span>}
            name={`director_State_Of_Residency_${directorId}`}
            rules={[{ required: true, message: 'Please enter state' }]}
          >
            <Select
              showSearch
              placeholder="Select state"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'State_Of_Residency', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {states?.map((state, index) => (
                <Option key={index} value={state.Value}>
                  {state.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Proof of Address Type</span>}
            name={`director_Prof_Of_Address_Type_${directorId}`}
            rules={[{ required: true, message: 'Please select address type' }]}
          >
            <Select
              showSearch
              placeholder="Select Address proof document"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Prof_Of_Address_Type', value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="utility_bill">Utility Bill</Option>
              <Option value="bank_statement">Bank Statement</Option>
              <Option value="direvers_licence">Driver's Licence</Option>
              <Option value="nimc">NIMC</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={<span className={styles.label}>Proof of Address Document</span>}
            name={`director_Proof_Of_Address_Document_${directorId}`}
            rules={[{ required: true, message: 'Please enter Address' }]}
            getValueFromEvent={() => undefined}
          >
            <Upload
              beforeUpload={(file) =>
                handleUpload(file, `director_Proof_Of_Address_Document_${directorId}`)
              }
              showUploadList={false}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default LocationInfoSection;
