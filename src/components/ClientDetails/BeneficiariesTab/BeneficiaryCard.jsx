import { Card, Form, Input, Select, Row, Col, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './BeneficiariesTab.module.css';

const BeneficiaryCard = ({
  beneficiary,
  index,
  isEditing,
  form,
  onEdit,
  onCancel,
  onSave,
  onRemove
}) => {
  if (isEditing) {
    return (
      <Card size="small" className={styles.cardEditing}>
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Row gutter={[16, 12]}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
                className={styles.formItem}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6} md={5}>
              <Form.Item
                label="Relationship"
                name="relationship"
                rules={[{ required: true }]}
                className={styles.formItem}
              >
                <Select>
                  <Select.Option value="Spouse">Spouse</Select.Option>
                  <Select.Option value="Son">Son</Select.Option>
                  <Select.Option value="Daughter">Daughter</Select.Option>
                  <Select.Option value="Father">Father</Select.Option>
                  <Select.Option value="Mother">Mother</Select.Option>
                  <Select.Option value="Brother">Brother</Select.Option>
                  <Select.Option value="Sister">Sister</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Item
                label="Percentage"
                name="percentage"
                rules={[{ required: true }]}
                className={styles.formItem}
              >
                <Input type="number" min="0" max="100" suffix="%" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true }]}
                className={styles.formItem}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={3} className={styles.actionsCol}>
              <Space>
                <Button size="small" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="primary" size="small" icon={<CheckOutlined />} htmlType="submit">
                  Save
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }

  return (
    <Card size="small" className={styles.card}>
      <Row gutter={[16, 12]}>
        <Col xs={24} sm={12} md={6}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Beneficiary {index + 1}</div>
            <div className={styles.fieldValueBold}>{beneficiary.name}</div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={5}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Relationship</div>
            <Tag color="blue">{beneficiary.relationship}</Tag>
          </div>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Percentage</div>
            <div className={styles.fieldValuePrimary}>{beneficiary.percentage}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Phone</div>
            <div className={styles.fieldValue}>{beneficiary.phone}</div>
          </div>
        </Col>
        <Col xs={24} md={3} className={styles.actionsCol}>
          <Space>
            <Button type="link" icon={<EditOutlined />} size="small" onClick={onEdit}>
              Edit
            </Button>
            <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={onRemove}>
              Remove
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BeneficiaryCard;
