import { Input, Button, Tag, Select, Card, Row, Col, Statistic, Form, App, Collapse } from 'antd';
import { TeamOutlined, PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Panel } = Collapse;

const BeneficiaryForm = ({
    form, 
    utilities, 
    beneficiaries,
    beneficiaryData,
    onAddBeneficiary,
    onRemoveBeneficiary,
    onFieldChange,
    activeKeys,
    onActiveKeysChange
}) => {
    const { message } = App.useApp();

    function capitalize(word) {
        if (word.length === 0) {
            return "";
        }
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    const countries = utilities.countryOptions;
    const titles = utilities.titleOptions;
    const states = utilities.stateOptions;
    const gender = utilities.genderOptions;
    const relationshipType = utilities.relationshipTypeOptions;

    const handleRemove = (id) => {
        if (beneficiaries.length > 1) {
            onRemoveBeneficiary(id);
            message.success('Beneficiary removed');
        } else {
            message.warning('At least one beneficiary is required');
        }
    };

    // Get beneficiary display name for accordion header
    const getBeneficiaryDisplayName = (beneficiaryId, index) => {
        const data = beneficiaryData[beneficiaryId];
        if (data && (data.Beneficiary_FirstName || data.Beneficiary_LastName)) {
            return `${data.Beneficiary_FirstName || ''} ${data.Beneficiary_LastName || ''}`.trim();
        }
        return `Beneficiary ${index + 1}`;
    };

    // Get completion status for beneficiary
    const getBeneficiaryStatus = (beneficiaryId) => {
        const data = beneficiaryData[beneficiaryId];
        if (!data) return { complete: false, filled: 0, total: 10 };
        
        const requiredFields = [
            'Eaccount',
            'Beneficiary_FirstName',
            'Beneficiary_LastName',
            'Beneficiary_Gender',
            'Beneficiary_DoB',
            'Beneficiary_Nationality',
            'Beneficiary_Birth_Country',
            'Beneficiary_State',
            'Beneficiary_Country',
            'Beneficiary_Address'
        ];
        const filled = requiredFields.filter(field => data[field] && data[field] !== '').length;
        const total = requiredFields.length;
        return { complete: filled === total, filled, total };
    };

    const renderBeneficiaryForm = (beneficiary, index) => {
        const beneficiaryId = beneficiary.id;
        const status = getBeneficiaryStatus(beneficiaryId);
        const displayName = getBeneficiaryDisplayName(beneficiaryId, index);
        
        // Custom header for each panel
        const panelHeader = (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>
                        {displayName}
                    </span>
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
                {beneficiaries.length > 1 && (
                    <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(beneficiaryId);
                        }}
                    >
                        Remove
                    </Button>
                )}
            </div>
        );
        
        return (
            <Panel 
                header={panelHeader} 
                key={beneficiaryId.toString()}
                style={{ marginBottom: '16px' }}
            >
                {/* Personal Information */}
                <div style={{ 
                    marginBottom: '20px', 
                    fontSize: '15px', 
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Personal Information
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="EA Account *" 
                            name={`Eaccount_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                placeholder="EA Account"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Eaccount', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Title" 
                            name={`Beneficiary_Title_${beneficiaryId}`}
                        >
                            <Select 
                                placeholder="Select title"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Title', value)}
                            >
                                {titles && titles.map((title, index) => (
                                    <Option key={index} value={title.Value}>
                                        {capitalize(title.Name)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="First Name *" 
                            name={`Beneficiary_FirstName_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                placeholder="First Name"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_FirstName', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Middle Name" 
                            name={`Beneficiary_MiddleName_${beneficiaryId}`}
                        >
                            <Input 
                                placeholder="Middle Name"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_MiddleName', e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item 
                            label="Last Name *" 
                            name={`Beneficiary_LastName_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                placeholder="Last Name"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_LastName', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Gender *" 
                            name={`Beneficiary_Gender_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select 
                                placeholder="Select gender"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Gender', value)}
                            >
                                {gender && gender.map((g, index) => (
                                    <Option key={index} value={g.Value}>
                                        {capitalize(g.Name)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item 
                            label="Date of Birth *" 
                            name={`Beneficiary_DoB_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                type="date"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_DoB', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Relationship to Settlor" 
                            name={`Beneficiary_Relationship_${beneficiaryId}`}
                        >
                            <Select 
                                placeholder="Select relationship"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Relationship', value)}
                            >
                                {relationshipType && relationshipType.map((type, index) => (
                                    <Option key={index} value={type.Value}>
                                        {capitalize(type.Name)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item 
                            label="Nationality *" 
                            name={`Beneficiary_Nationality_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Please select nationality' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select nationality"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Nationality', value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countries && countries.map((country, index) => (
                                    <Option key={index} value={country.Value}>
                                        {country.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ 
                    marginTop: '24px',
                    marginBottom: '20px', 
                    fontSize: '15px', 
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Location Information
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="Birth Country *" 
                            name={`Beneficiary_Birth_Country_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Please select birth country' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select birth country"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Birth_Country', value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countries && countries.map((country, index) => (
                                    <Option key={index} value={country.Value}>
                                        {country.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item 
                            label="City" 
                            name={`Beneficiary_City_${beneficiaryId}`}
                        >
                            <Input 
                                placeholder="City"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_City', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label="State *" 
                            name={`Beneficiary_State_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Please enter state' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select state"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_State', value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {states && states.map((state, index) => (
                                    <Option key={index} value={state.Value}>
                                        {state.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item 
                            label="Country *" 
                            name={`Beneficiary_Country_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Please select country' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select country"
                                size="large"
                                onChange={(value) => onFieldChange(beneficiaryId, 'Beneficiary_Country', value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countries && countries.map((country, index) => (
                                    <Option key={index} value={country.Value}>
                                        {country.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item 
                            label="Address Line 1 *" 
                            name={`Beneficiary_Address_${beneficiaryId}`}
                            rules={[{ required: true, message: 'Please enter Address' }]}
                        >
                            <Input 
                                placeholder="Address"
                                size="large"
                                onChange={(e) => onFieldChange(beneficiaryId, 'Beneficiary_Address', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Panel>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                    Add Beneficiaries
                </h2>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    Add one or more beneficiaries for this client. Click on each beneficiary to expand and edit their information.
                </p>
            </div>

            {/* Beneficiaries Accordion */}
            <Collapse 
                activeKey={activeKeys}
                onChange={onActiveKeysChange}
                accordion={false}
                expandIconPosition="end"
                style={{ marginBottom: '24px', backgroundColor: 'transparent' }}
            >
                {beneficiaries.map((beneficiary, index) => renderBeneficiaryForm(beneficiary, index))}
            </Collapse>

            {/* Add Beneficiary Button */}
            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddBeneficiary}
                size="large"
                style={{
                    width: '100%',
                    height: '60px',
                    fontSize: '16px',
                    borderColor: '#1890ff',
                    color: '#1890ff',
                    marginBottom: '24px',
                    fontWeight: '500'
                }}
            >
                Add Another Beneficiary
            </Button>

            {/* Summary Card */}
            <Card 
                style={{ 
                    backgroundColor: '#f0f5ff', 
                    borderColor: '#1890ff',
                    borderWidth: '2px'
                }}
            >
                <Row gutter={16} align="middle">
                    <Col span={12}>
                        <Statistic
                            title="Total Beneficiaries"
                            value={beneficiaries.length}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Completed Forms"
                            value={beneficiaries.filter(b => getBeneficiaryStatus(b.id).complete).length}
                            suffix={`/ ${beneficiaries.length}`}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ 
                                color: beneficiaries.filter(b => getBeneficiaryStatus(b.id).complete).length === beneficiaries.length 
                                    ? '#52c41a' 
                                    : '#faad14' 
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BeneficiaryForm;