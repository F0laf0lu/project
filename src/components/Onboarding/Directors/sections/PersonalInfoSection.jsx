import { Row, Col, Form, Input, Select } from 'antd';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../DirectorsForm.module.css';

const { Option } = Select;

const PersonalInfoSection = ({ directorId, titles, states, countries, onFieldChange, capitalize }) => {
  return (
    <>
      <SectionHeader title="Personal Information" variant="secondary" />

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Seqnum</span>}
            name={`director_SeQNum_${directorId}`}
          >
            <Input
              disabled
              placeholder="SeQNum"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'SeQNum', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Title</span>}
            name={`director_Title_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              placeholder="Select title"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Title', value)}
            >
              {titles?.map((title, index) => (
                <Option key={index} value={title.Value}>
                  {capitalize(title.Name)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>First Name</span>}
            name={`director_FirstName_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="First Name"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'FirstName', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Other Name</span>}
            name={`director_OtherName_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Other Name"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'OtherName', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Lastname</span>}
            name={`director_LastName_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Last Name"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'LastName', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>State Of Origin</span>}
            name={`director_State_Of_Origin_${directorId}`}
            rules={[{ required: true, message: 'Please enter state' }]}
          >
            <Select
              showSearch
              placeholder="Select state"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'State_Of_Origin', value)}
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
            label={<span className={styles.label}>Date Of Birth</span>}
            name={`director_Date_Of_Birth_${directorId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              type="date"
              size="large"
              onChange={(e) => onFieldChange(directorId, 'Date_Of_Birth', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<span className={styles.label}>Nationality</span>}
            name={`director_Nationality_${directorId}`}
            rules={[{ required: true, message: 'Please select nationality' }]}
          >
            <Select
              showSearch
              placeholder="Select nationality"
              size="large"
              onChange={(value) => onFieldChange(directorId, 'Nationality', value)}
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
      </Row>
    </>
  );
};

export default PersonalInfoSection;
