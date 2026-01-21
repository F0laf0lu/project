import { useEffect } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import DisplayField from '../../common/DisplayField';
import styles from './NextOfKinTab.module.css';

const NextOfKinTab = ({
  client,
  isEditing,
  onEdit,
  onCancel,
  onSave
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        nextOfKinName: client.nextOfKinName || '',
        nextOfKinRelationship: client.nextOfKinRelationship || '',
        nextOfKinPhone: client.nextOfKinPhone || '',
        nextOfKinEmail: client.nextOfKinEmail || '',
        nextOfKinAddress: client.nextOfKinAddress || ''
      });
    }
  }, [isEditing, client, form]);

  return (
    <Card bordered={false} className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>Next of Kin Information</h4>
        {!isEditing ? (
          <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" icon={<CheckOutlined />} onClick={() => form.submit()}>
              Save
            </Button>
          </Space>
        )}
      </div>

      {isEditing ? (
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Full Name" name="nextOfKinName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Relationship"
                name="nextOfKinRelationship"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="Spouse">Spouse</Select.Option>
                  <Select.Option value="Father">Father</Select.Option>
                  <Select.Option value="Mother">Mother</Select.Option>
                  <Select.Option value="Son">Son</Select.Option>
                  <Select.Option value="Daughter">Daughter</Select.Option>
                  <Select.Option value="Brother">Brother</Select.Option>
                  <Select.Option value="Sister">Sister</Select.Option>
                  <Select.Option value="Friend">Friend</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Phone Number"
                name="nextOfKinPhone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Email" name="nextOfKinEmail" rules={[{ type: 'email' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Address" name="nextOfKinAddress">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Full Name" value={client.nextOfKinName} emptyText="Not provided" />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField
                label="Relationship"
                value={client.nextOfKinRelationship}
                emptyText="Not provided"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField
                label="Phone Number"
                value={client.nextOfKinPhone}
                emptyText="Not provided"
              />
            </Col>
            <Col xs={24} md={12}>
              <DisplayField label="Email" value={client.nextOfKinEmail} emptyText="Not provided" />
            </Col>
            <Col xs={24} md={12}>
              <DisplayField
                label="Address"
                value={client.nextOfKinAddress}
                emptyText="Not provided"
              />
            </Col>
          </Row>

          <div className={styles.note}>
            <p className={styles.noteText}>
              <strong>Note:</strong> Next of kin information is used for emergency contact purposes
              and will be notified in case of any urgent matters.
            </p>
          </div>
        </>
      )}
    </Card>
  );
};

export default NextOfKinTab;
