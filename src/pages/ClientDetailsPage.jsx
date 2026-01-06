import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Input, Button, Space, Tag, Tabs, Select, Layout, Menu, Avatar, Dropdown, Card, Row, Col, Statistic, Spin, Form, message, Steps, Upload } from 'antd';
import { 
  TeamOutlined,
  IdcardOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  FolderOutlined,
  UserOutlined,
  HeartOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  CheckOutlined

} from '@ant-design/icons';



  const ClientDetailPage = () => {
    const location = useLocation();
    const [selectedClient, setSelectedClient] = useState(null);

    const clientDetails = location.state || null


    // if (!selectedClient) {
    //   return <div>No client selected</div>;
    // }

    const client = clientDetails;
    const [editForm] = Form.useForm();
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingNextOfKin, setIsEditingNextOfKin] = useState(false);
    const [editingBeneficiaryId, setEditingBeneficiaryId] = useState(null);



    

    // Handle Personal Details Save
    const handlePersonalDetailsSave = (values) => {
      // Update the client data
      const updatedClient = { ...selectedClient, ...values };
      setSelectedClient(updatedClient);
      
      // Update in the main data array
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Personal details updated successfully!');
      setIsEditingPersonal(false);
    };

    // Handle Next of Kin Save
    const handleNextOfKinSave = (values) => {
      const updatedClient = { ...selectedClient, ...values };
      setSelectedClient(updatedClient);
      
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Next of Kin details updated successfully!');
      setIsEditingNextOfKin(false);
    };

    // Handle Beneficiary Save
    const handleBeneficiarySave = (beneficiaryId, values) => {
      // Update beneficiary in client data
      const updatedBeneficiaries = (selectedClient.beneficiaries || []).map(ben =>
        ben.id === beneficiaryId ? { ...ben, ...values } : ben
      );
      
      const updatedClient = { ...selectedClient, beneficiaries: updatedBeneficiaries };
      setSelectedClient(updatedClient);
      
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Beneficiary updated successfully!');
      setEditingBeneficiaryId(null);
    };

    // Personal Details Tab Content
    const PersonalDetailsTab = () => {
      // Initialize form with current values when editing starts
      useEffect(() => {
        if (isEditingPersonal) {
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
      }, [isEditingPersonal]);

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Personal Information
            </h4>
            {!isEditingPersonal ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => setIsEditingPersonal(true)}
              >
                Edit
              </Button>
            ) : (
              <Space>
                <Button onClick={() => setIsEditingPersonal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => editForm.submit()}
                >
                  Save
                </Button>
              </Space>
            )}
          </div>

          {isEditingPersonal ? (
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handlePersonalDetailsSave}
            >
              <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                Personal Information
              </h5>
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

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Address Information
                </h5>
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

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance Information
                </h5>
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
            // View Mode - existing display code
            <>
              <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                Personal Information
              </h5>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Title</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.title || 'Mr.'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>First Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.firstName || client.name.split(' ')[0]}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Middle Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.middleName || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Last Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.lastName || client.name.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Gender</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.gender || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Date of Birth</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.dateOfBirth || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Occupation</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.occupation || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.email}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Mobile Number 1</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.phone}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Mobile Number 2</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.mobileNumber2 || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>BVN</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.bvn || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Identification Type</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.identificationType || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
              </Row>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Address Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Address</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.address || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Country</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.country || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>State</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.stateOfResidency || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Risk Classification</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        <Tag color={client.riskClassification === 'High' ? 'red' : client.riskClassification === 'Medium' ? 'orange' : 'green'}>
                          {client.riskClassification || 'Low'}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>PEP Status</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        <Tag color={client.pepStatus === 'PEP' ? 'red' : 'green'}>
                          {client.pepStatus || 'Non-PEP'}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Join Date</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.joinDate}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Card>
      );
    };

    // Next of Kin Tab Content
    const NextOfKinTab = () => {
      const [nextOfKinForm] = Form.useForm();

      // Initialize form when editing starts
      useEffect(() => {
        if (isEditingNextOfKin) {
          nextOfKinForm.setFieldsValue({
            nextOfKinName: client.nextOfKinName || '',
            nextOfKinRelationship: client.nextOfKinRelationship || '',
            nextOfKinPhone: client.nextOfKinPhone || '',
            nextOfKinEmail: client.nextOfKinEmail || '',
            nextOfKinAddress: client.nextOfKinAddress || ''
          });
        }
      }, [isEditingNextOfKin]);

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Next of Kin Information
            </h4>
            {!isEditingNextOfKin ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => setIsEditingNextOfKin(true)}
              >
                Edit
              </Button>
            ) : (
              <Space>
                <Button onClick={() => setIsEditingNextOfKin(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => nextOfKinForm.submit()}
                >
                  Save
                </Button>
              </Space>
            )}
          </div>

          {isEditingNextOfKin ? (
            <Form
              form={nextOfKinForm}
              layout="vertical"
              onFinish={handleNextOfKinSave}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Full Name" name="nextOfKinName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Relationship" name="nextOfKinRelationship" rules={[{ required: true }]}>
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
                  <Form.Item label="Phone Number" name="nextOfKinPhone" rules={[{ required: true }]}>
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
            // View Mode
            <>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Full Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinName || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Relationship</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinRelationship || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Phone Number</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinPhone || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinEmail || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinAddress || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
              </Row>

              <div style={{
                background: '#f0f5ff',
                padding: '16px',
                borderRadius: '6px',
                marginTop: '24px',
                border: '1px solid #d6e4ff'
              }}>
                <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
                  <strong>Note:</strong> Next of kin information is used for emergency contact purposes and will be notified in case of any urgent matters.
                </p>
              </div>
            </>
          )}
        </Card>
      );
    };

    // Beneficiaries Tab Content
    const BeneficiariesTab = () => {
      const [beneficiaryForm] = Form.useForm();
      
      // Mock beneficiaries data - in real app, this would come from the client record
      const beneficiaries = client.beneficiaries || [
        { id: 1, name: 'Jane Doe', relationship: 'Daughter', percentage: '40%', phone: '+234-803-111-2222' },
        { id: 2, name: 'John Doe Jr.', relationship: 'Son', percentage: '35%', phone: '+234-803-333-4444' },
        { id: 3, name: 'Mary Doe', relationship: 'Sister', percentage: '25%', phone: '+234-803-555-6666' }
      ];

      // Initialize form when editing a beneficiary
      const handleEdit = (beneficiary) => {
        setEditingBeneficiaryId(beneficiary.id);
        beneficiaryForm.setFieldsValue({
          name: beneficiary.name,
          relationship: beneficiary.relationship,
          percentage: beneficiary.percentage.replace('%', ''),
          phone: beneficiary.phone
        });
      };

      const handleCancelEdit = () => {
        setEditingBeneficiaryId(null);
        beneficiaryForm.resetFields();
      };

      const handleSaveBeneficiary = (values) => {
        handleBeneficiarySave(editingBeneficiaryId, {
          ...values,
          percentage: values.percentage + '%'
        });
      };

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Beneficiaries List ({beneficiaries.length})
            </h4>
            <Button type="primary" icon={<PlusOutlined />} size="small">
              Add Beneficiary
            </Button>
          </div>

          {beneficiaries.length === 0 ? (
            <div style={{
              background: '#fafafa',
              padding: '48px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '2px dashed #d9d9d9'
            }}>
              <TeamOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '12px' }} />
              <p style={{ color: '#999', margin: 0 }}>No beneficiaries added yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {beneficiaries.map((beneficiary, index) => (
                <Card 
                  key={beneficiary.id}
                  size="small"
                  style={{ 
                    background: editingBeneficiaryId === beneficiary.id ? '#f0f5ff' : '#fafafa',
                    border: editingBeneficiaryId === beneficiary.id ? '2px solid #1890ff' : '1px solid #e8e8e8'
                  }}
                >
                  {editingBeneficiaryId === beneficiary.id ? (
                    // Edit Mode
                    <Form
                      form={beneficiaryForm}
                      layout="vertical"
                      onFinish={handleSaveBeneficiary}
                    >
                      <Row gutter={[16, 12]}>
                        <Col xs={24} sm={12} md={6}>
                          <Form.Item label="Name" name="name" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={6} md={5}>
                          <Form.Item label="Relationship" name="relationship" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
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
                          <Form.Item label="Percentage" name="percentage" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input type="number" min="0" max="100" suffix="%" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Form.Item label="Phone" name="phone" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '8px' }}>
                          <Space>
                            <Button size="small" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                            <Button type="primary" size="small" icon={<CheckOutlined />} htmlType="submit">
                              Save
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    // View Mode
                    <Row gutter={[16, 12]}>
                      <Col xs={24} sm={12} md={6}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Beneficiary {index + 1}</div>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: '#262626' }}>
                            {beneficiary.name}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} md={5}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Relationship</div>
                          <Tag color="blue">{beneficiary.relationship}</Tag>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} md={4}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Percentage</div>
                          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1890ff' }}>
                            {beneficiary.percentage}
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Phone</div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                            {beneficiary.phone}
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Space>
                          <Button 
                            type="link" 
                            icon={<EditOutlined />} 
                            size="small"
                            onClick={() => handleEdit(beneficiary)}
                          >
                            Edit
                          </Button>
                          <Button type="link" danger icon={<DeleteOutlined />} size="small">Remove</Button>
                        </Space>
                      </Col>
                    </Row>
                  )}
                </Card>
              ))}
            </div>
          )}

          <div style={{
            background: '#f0f5ff',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            border: '1px solid #d6e4ff'
          }}>
            <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
              <strong>Total Distribution:</strong> {beneficiaries.reduce((acc, b) => acc + parseInt(b.percentage), 0)}%
              {beneficiaries.reduce((acc, b) => acc + parseInt(b.percentage), 0) === 100 ? 
                ' ✓ Complete' : ' ⚠️ Incomplete - Total should be 100%'}
            </p>
          </div>
        </Card>
      );
    };

    // Products Tab Content
    const ProductsTab = () => (
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
            Subscribed Products
          </h4>
        </div>

        <Card
          size="small"
          style={{ 
            background: '#fafafa',
            border: '2px solid #e8e8e8',
            marginBottom: '16px'
          }}
        >
          <Row gutter={[16, 12]}>
            <Col xs={24} md={8}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Product Name</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1890ff' }}>
                  {client.product || 'No product assigned'}
                </div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Status</div>
                <Tag color="green">Active</Tag>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Start Date</div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                  {client.joinDate}
                </div>
              </div>
            </Col>
            <Col xs={24} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button type="link" icon={<EyeOutlined />}>View Details</Button>
            </Col>
          </Row>
        </Card>

        <div style={{
          background: '#f9f9f9',
          padding: '32px',
          textAlign: 'center',
          borderRadius: '6px',
          border: '2px dashed #d9d9d9',
          marginTop: '24px'
        }}>
          <ShoppingOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '12px' }} />
          <p style={{ color: '#999', margin: '0 0 16px 0', fontSize: '14px' }}>
            Want to add more products?
          </p>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </div>
      </Card>
    );

    // Uploaded Documents Tab Content
    const DocumentsTab = () => {
      const documents = [
        { name: 'Passport Photograph', uploaded: true, date: '2024-01-15', size: '2.3 MB' },
        { name: 'Identification Document', uploaded: true, date: '2024-01-15', size: '1.8 MB' },
        { name: 'Proof of Address', uploaded: true, date: '2024-01-16', size: '3.1 MB' },
        { name: 'Sanction Screening', uploaded: true, date: '2024-01-16', size: '456 KB' },
        { name: 'Adverse Media Search', uploaded: false, date: null, size: null },
        { name: 'Appointment Letter', uploaded: true, date: '2024-01-17', size: '1.2 MB' }
      ];

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>
            Required Documents
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documents.map((doc, index) => (
              <Card
                key={index}
                size="small"
                style={{
                  background: doc.uploaded ? '#f6ffed' : '#fff2e8',
                  border: doc.uploaded ? '1px solid #b7eb8f' : '1px solid #ffd591'
                }}
              >
                <Row gutter={[16, 8]} align="middle">
                  <Col flex="none">
                    {doc.uploaded ? (
                      <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    ) : (
                      <CloseCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                    )}
                  </Col>
                  <Col flex="auto">
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {doc.name}
                    </div>
                    {doc.uploaded && (
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        Uploaded on {doc.date} • {doc.size}
                      </div>
                    )}
                    {!doc.uploaded && (
                      <div style={{ fontSize: '12px', color: '#d46b08' }}>
                        Not uploaded yet
                      </div>
                    )}
                  </Col>
                  <Col flex="none">
                    {doc.uploaded ? (
                      <Space>
                        <Button type="link" icon={<EyeOutlined />} size="small">View</Button>
                        <Button type="link" icon={<DownloadOutlined />} size="small">Download</Button>
                      </Space>
                    ) : (
                      <Button type="primary" icon={<UploadOutlined />} size="small">Upload</Button>
                    )}
                  </Col>
                </Row>
              </Card>
            ))}
          </div>

          <div style={{
            background: '#f0f5ff',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            border: '1px solid #d6e4ff'
          }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <strong>Uploaded:</strong> {documents.filter(d => d.uploaded).length} of {documents.length}
                </div>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <strong>Completion:</strong> {Math.round((documents.filter(d => d.uploaded).length / documents.length) * 100)}%
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      );
    };

    // Define tabs for Individual client
    // Corporate Tabs Configuration
    const corporateTabs = [
      {
        key: '1',
        label: (
          <span>
            <IdcardOutlined /> Company Details
          </span>
        ),
        children: <PersonalDetailsTab /> // Reuse for company info
      },
      {
        key: '2',
        label: (
          <span>
            <ContactsOutlined /> Contact Person
          </span>
        ),
        children: <NextOfKinTab /> // Reuse for contact person
      },
      {
        key: '3',
        label: (
          <span>
            <ShoppingOutlined /> Products
          </span>
        ),
        children: <ProductsTab />
      },
      {
        key: '4',
        label: (
          <span>
            <FolderOutlined /> Documents
          </span>
        ),
        children: <DocumentsTab />
      }
    ];

    // Individual Tabs Configuration
    const individualTabs = [
      {
        key: '1',
        label: (
          <span>
            Personal Details
          </span>
        ),
        children: <PersonalDetailsTab />
      },
      {
        key: '2',
        label: (
          <span>
             Next of Kin
          </span>
        ),
        children: <NextOfKinTab />
      },
      {
        key: '3',
        label: (
          <span>
            Beneficiaries
          </span>
        ),
        children: <BeneficiariesTab />
      },
      {
        key: '4',
        label: (
          <span>
             Products
          </span>
        ),
        children: <ProductsTab />
      },
      {
        key: '5',
        label: (
          <span>
             Documents
          </span>
        ),
        children: <DocumentsTab />
      }
    ];

    return (
      <div style={{
        background: '#f0f5ff',
        minHeight: 'calc(100vh - 120px)',
        padding: '40px'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setCurrentPage('clients')}
            >
              Back to Clients
            </Button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ 
                color: '#1890ff', 
                fontSize: '28px',
                fontWeight: '600',
                margin: '0 0 12px 0'
              }}>
                {client.name}
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Tag color={client.clientType === 'Corporate' ? 'blue' : 'cyan'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {client.clientType}
                </Tag>
                <Tag color={client.status === 'Active' ? 'green' : 'default'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {client.status}
                </Tag>
                <Tag color="purple" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  ID: {client.key}
                </Tag>
              </div>
            </div>
            
            <Space>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Client
              </Button>
            </Space>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '24px'
        }}>
          <Tabs 
            defaultActiveKey="1" 
            items={client.clientType === 'Individual' ? individualTabs : corporateTabs}
            size="large"
            tabBarGutter={50}
          />
        </div>
      </div>
    );
  };

export default ClientDetailPage