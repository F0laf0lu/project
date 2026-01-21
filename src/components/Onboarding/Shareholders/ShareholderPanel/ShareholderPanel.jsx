import { Row, Col, Form, Input, Select, Button, Tag, Upload } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import SectionHeader from '../../../common/SectionHeader';
import styles from './ShareholderPanel.module.css';

const { Panel } = Collapse;
const { Option } = Select;

const ShareholderPanel = ({
  shareholder,
  index,
  shareholderData,
  shareholders,
  form,
  utilities,
  onFieldChange,
  onRemove,
  message
}) => {
  const shareholderId = shareholder.id;
  const titles = utilities.titleOptions;
  const idCardTypes = utilities.idCardTypeOptions;

  const capitalize = (word) => {
    if (!word || word.length === 0) return '';
    return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const getShareholderDisplayName = () => {
    const data = shareholderData[shareholderId];
    if (data && (data.FirstName || data.LastName)) {
      return `${data.FirstName || ''} ${data.LastName || ''}`.trim();
    }
    return `Shareholder ${index + 1}`;
  };

  const getShareholderStatus = () => {
    const data = shareholderData[shareholderId];
    if (!data) return { complete: false, filled: 0, total: 10 };

    const requiredFields = [
      'Title', 'FirstName', 'LastName', 'OtherName', 'ID_Card_Type',
      'Inorporate_Shareholder', 'Inorporate_Shareholder_Name',
      'Shareholder_Type', 'Shareholder_Proof_ID', 'Shareholder_Proof_ID_Name'
    ];
    const filled = requiredFields.filter((field) => data[field] && data[field] !== '').length;
    const total = requiredFields.length;
    return { complete: filled === total, filled, total };
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (file, fieldName) => {
    try {
      const base64String = await getBase64(file);
      const fileName = file.name;

      if (!base64String) return false;

      form.setFieldsValue({ [fieldName]: base64String });

      const fieldNameWithoutId = fieldName.replace(`shareholder_`, '').replace(`_${shareholderId}`, '');

      const fieldMapping = {
        'Inorporate_Shareholder': {
          documentField: 'Inorporate_Shareholder',
          nameField: 'Inorporate_Shareholder_Name'
        },
        'Shareholder_Proof_ID': {
          documentField: 'Shareholder_Proof_ID',
          nameField: 'Shareholder_Proof_ID_Name'
        }
      };

      const mapping = fieldMapping[fieldNameWithoutId];

      if (mapping) {
        const updateFields = {
          [mapping.documentField]: base64String,
          [mapping.nameField]: fileName
        };

        Object.entries(updateFields).forEach(([field, value]) => {
          onFieldChange(shareholderId, field, value);
        });

        message.success(`${fileName} uploaded successfully`);
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const status = getShareholderStatus();
  const displayName = getShareholderDisplayName();

  const panelHeader = (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.name}>{displayName}</span>
        {status.complete ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Complete
          </Tag>
        ) : (
          <Tag color="processing">
            {status.filled}/{status.total} fields completed
          </Tag>
        )}
      </div>
      {shareholders.length > 1 && (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(shareholderId);
          }}
        >
          Remove
        </Button>
      )}
    </div>
  );

  return (
    <Panel header={panelHeader} key={shareholderId.toString()} className={styles.panel}>
      {/* Personal Information */}
      <SectionHeader title="Personal Information" variant="secondary" />

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label={<span className={styles.label}>Title</span>}
            name={`shareholder_Title_${shareholderId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select
              placeholder="Select title"
              size="large"
              onChange={(value) => onFieldChange(shareholderId, 'Title', value)}
            >
              {titles?.map((title, idx) => (
                <Option key={idx} value={title.Value}>
                  {capitalize(title.Name)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span className={styles.label}>First Name</span>}
            name={`shareholder_FirstName_${shareholderId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="First Name"
              size="large"
              onChange={(e) => onFieldChange(shareholderId, 'FirstName', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span className={styles.label}>Other Name</span>}
            name={`shareholder_OtherName_${shareholderId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Other Name"
              size="large"
              onChange={(e) => onFieldChange(shareholderId, 'OtherName', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span className={styles.label}>Last Name</span>}
            name={`shareholder_LastName_${shareholderId}`}
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Last Name"
              size="large"
              onChange={(e) => onFieldChange(shareholderId, 'LastName', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Shareholder Details */}
      <div className={styles.section}>
        <SectionHeader title="Shareholder Details" variant="secondary" />

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span className={styles.label}>Shareholder Type</span>}
              name={`shareholder_Shareholder_Type_${shareholderId}`}
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                placeholder="Select shareholder type"
                size="large"
                onChange={(value) => onFieldChange(shareholderId, 'Shareholder_Type', value)}
              >
                <Option value="Individual">Individual</Option>
                <Option value="Corporate">Corporate</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span className={styles.label}>ID Card Type</span>}
              name={`shareholder_ID_Card_Type_${shareholderId}`}
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                showSearch
                placeholder="Select ID type"
                size="large"
                onChange={(value) => onFieldChange(shareholderId, 'ID_Card_Type', value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {idCardTypes?.map((type, idx) => (
                  <Option key={idx} value={type.Value}>
                    {capitalize(type.Name)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Document Uploads */}
      <div className={styles.section}>
        <SectionHeader title="Document Uploads" variant="secondary" />

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span className={styles.label}>Incorporate Shareholder Document</span>}
              name={`shareholder_Inorporate_Shareholder_${shareholderId}`}
              rules={[{ required: true, message: 'Please upload document' }]}
              getValueFromEvent={() => undefined}
            >
              <Upload
                beforeUpload={(file) =>
                  handleUpload(file, `shareholder_Inorporate_Shareholder_${shareholderId}`)
                }
                showUploadList={false}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              >
                <Button icon={<UploadOutlined />} size="large">
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span className={styles.label}>Shareholder Proof ID</span>}
              name={`shareholder_Shareholder_Proof_ID_${shareholderId}`}
              rules={[{ required: true, message: 'Please upload proof ID' }]}
              getValueFromEvent={() => undefined}
            >
              <Upload
                beforeUpload={(file) =>
                  handleUpload(file, `shareholder_Shareholder_Proof_ID_${shareholderId}`)
                }
                showUploadList={false}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              >
                <Button icon={<UploadOutlined />} size="large">
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Panel>
  );
};

export default ShareholderPanel;
