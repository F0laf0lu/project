import { useEffect } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, Space, Tag } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import DisplayField from '../../common/DisplayField';
import SectionHeader from '../../common/SectionHeader';
import styles from './PersonalDetailsTab.module.css';

const PersonalDetailsTab = ({
  client,
  isEditing,
  editForm,
  onEdit,
  onCancel,
  onSave
}) => {
  useEffect(() => {
    if (isEditing) {
      editForm.setFieldsValue({
        title: client.title || 'Mr.',
        firstName: client.firstName || client.name.split(' ')[0],
        middleName: client.middleName || '',
        lastName: client.lastName || client.name.split(' ').slice(1).join(' '),
        gender: client.gender || '',
        dateOfBirth: client.dateOfBirth || '',
        occupation: client.occupation || '',
        email: client.email,
        phone: client.phone,
        mobileNumber2: client.mobileNumber2 || '',
        bvn: client.bvn || '',
        identificationType: client.identificationType || '',
        address: client.address || '',
        country: client.country || '',
        stateOfResidency: client.stateOfResidency || '',
        riskClassification: client.riskClassification || 'Low',
        pepStatus: client.pepStatus || 'Non-PEP'
      });
    }
  }, [isEditing, client, editForm]);

  return (
    <Card bordered={false} className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>Personal Information</h4>
        {!isEditing ? (
          <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" icon={<CheckOutlined />} onClick={() => editForm.submit()}>
              Save
            </Button>
          </Space>
        )}
      </div>

      {isEditing ? (
        <Form form={editForm} layout="vertical" onFinish={onSave}>
          <SectionHeader title="Personal Information" variant="secondary" />
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Title" name="title">
                <Select>
                  <Select.Option value="Mr.">Mr.</Select.Option>
                  <Select.Option value="Mrs.">Mrs.</Select.Option>
                  <Select.Option value="Miss">Miss</Select.Option>
                  <Select.Option value="Dr.">Dr.</Select.Option>
                  <Select.Option value="Prof.">Prof.</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Middle Name" name="middleName">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Gender" name="gender">
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Occupation" name="occupation">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Mobile Number 1" name="phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Mobile Number 2" name="mobileNumber2">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="BVN" name="bvn">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Identification Type" name="identificationType">
                <Select>
                  <Select.Option value="NIN">NIN</Select.Option>
                  <Select.Option value="Driver's License">Driver's License</Select.Option>
                  <Select.Option value="Passport">Passport</Select.Option>
                  <Select.Option value="Voter's Card">Voter's Card</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className={styles.section}>
            <SectionHeader title="Address Information" variant="secondary" />
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item label="Address" name="address">
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="State" name="stateOfResidency">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className={styles.section}>
            <SectionHeader title="Compliance Information" variant="secondary" />
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Risk Classification" name="riskClassification">
                  <Select>
                    <Select.Option value="Low">Low</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="High">High</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="PEP Status" name="pepStatus">
                  <Select>
                    <Select.Option value="Non-PEP">Non-PEP</Select.Option>
                    <Select.Option value="PEP">PEP</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      ) : (
        <>
          <SectionHeader title="Personal Information" variant="secondary" />
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Title" value={client.title || 'Mr.'} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField
                label="First Name"
                value={client.firstName || client.name.split(' ')[0]}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Middle Name" value={client.middleName} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField
                label="Last Name"
                value={client.lastName || client.name.split(' ').slice(1).join(' ')}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Gender" value={client.gender} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Date of Birth" value={client.dateOfBirth} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Occupation" value={client.occupation} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Email" value={client.email} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Mobile Number 1" value={client.phone} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Mobile Number 2" value={client.mobileNumber2} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="BVN" value={client.bvn} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <DisplayField label="Identification Type" value={client.identificationType} />
            </Col>
          </Row>

          <div className={styles.section}>
            <SectionHeader title="Address Information" variant="secondary" />
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <DisplayField label="Address" value={client.address} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <DisplayField label="Country" value={client.country} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <DisplayField label="State" value={client.stateOfResidency} />
              </Col>
            </Row>
          </div>

          <div className={styles.section}>
            <SectionHeader title="Compliance Information" variant="secondary" />
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>Risk Classification</div>
                  <div className={styles.fieldValue}>
                    <Tag
                      color={
                        client.riskClassification === 'High'
                          ? 'red'
                          : client.riskClassification === 'Medium'
                          ? 'orange'
                          : 'green'
                      }
                    >
                      {client.riskClassification || 'Low'}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>PEP Status</div>
                  <div className={styles.fieldValue}>
                    <Tag color={client.pepStatus === 'PEP' ? 'red' : 'green'}>
                      {client.pepStatus || 'Non-PEP'}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <DisplayField label="Join Date" value={client.joinDate} />
              </Col>
            </Row>
          </div>
        </>
      )}
    </Card>
  );
};

export default PersonalDetailsTab;
