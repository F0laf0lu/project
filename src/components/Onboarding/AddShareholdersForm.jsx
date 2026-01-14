import { Input, Button, Tag, Select, Card, Row, Col, Statistic, Form, App, Collapse, Upload } from 'antd';
import { TeamOutlined, PlusOutlined, DeleteOutlined, CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Panel } = Collapse;

const ShareholderForm = ({
    form,
    utilities,
    shareholders,
    shareholderData,
    onAddShareholder,
    onRemoveShareholder,
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

    const titles = utilities.titleOptions;
    const idCardTypes = utilities.idCardTypeOptions;

    const handleRemove = (id) => {
        if (shareholders.length > 1) {
            onRemoveShareholder(id);
            message.success('Shareholder removed');
        } else {
            message.warning('At least one shareholder is required');
        }
    };

    // Get shareholder display name for accordion header
    const getShareholderDisplayName = (shareholderId, index) => {
        const data = shareholderData[shareholderId];
        if (data && (data.FirstName || data.LastName)) {
            return `${data.FirstName || ''} ${data.LastName || ''}`.trim();
        }
        return `Shareholder ${index + 1}`;
    };

    // Get completion status for Shareholder
    const getShareholderStatus = (shareholderId) => {
        const data = shareholderData[shareholderId];
        if (!data) return { complete: false, filled: 0, total: 10 };

        const requiredFields = [
            'Title',
            'FirstName',
            'LastName',
            'OtherName',
            'ID_Card_Type',
            'Inorporate_Shareholder',
            'Inorporate_Shareholder_Name',
            'Shareholder_Type',
            'Shareholder_Proof_ID',
            'Shareholder_Proof_ID_Name'
        ];
        const filled = requiredFields.filter(field => data[field] && data[field] !== '').length;
        const total = requiredFields.length;
        return { complete: filled === total, filled, total };
    };

    const renderShareholderForm = (shareholder, index) => {
        const shareholderId = shareholder.id;
        const status = getShareholderStatus(shareholderId);
        const displayName = getShareholderDisplayName(shareholderId, index);

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
                {shareholders.length > 1 && (
                    <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(shareholderId);
                        }}
                    >
                        Remove
                    </Button>
                )}
            </div>
        );

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

                if (!base64String) {
                    console.error("Base64 conversion failed - empty result");
                    return false;
                }

                // Store base64 in form for validation
                form.setFieldsValue({
                    [fieldName]: base64String
                });

                const fieldNameWithoutId = fieldName.replace(`shareholder_`, '').replace(`_${shareholderId}`, '');

                // Map form fields to API fields and their corresponding name fields
                // Note: Backend API has "Inorporate" typo - preserve for API compatibility
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
                    // Store BOTH document and filename
                    const updateFields = {
                        [mapping.documentField]: base64String,
                        [mapping.nameField]: fileName
                    };

                    Object.entries(updateFields).forEach(([field, value]) => {
                        onFieldChange(shareholderId, field, value);
                    });

                    message.success(`${fileName} uploaded successfully`);
                } else {
                    console.error("No mapping found for field:", fieldNameWithoutId);
                }

                return false;
            } catch (error) {
                console.error('Error converting file to base64:', error);
                return false;
            }
        };

        return (
            <Panel
                header={panelHeader}
                key={shareholderId.toString()}
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
                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Title</span>}
                            name={`shareholder_Title_${shareholderId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select
                                placeholder="Select title"
                                size="large"
                                onChange={(value) => onFieldChange(shareholderId, 'Title', value)}
                            >
                                {titles && titles.map((title, index) => (
                                    <Option key={index} value={title.Value}>
                                        {capitalize(title.Name)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Other Name</span>}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
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
                <div style={{
                    marginTop: '24px',
                    marginBottom: '20px',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Shareholder Details
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Shareholder Type</span>}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Card Type</span>}
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
                                {idCardTypes && idCardTypes.map((type, index) => (
                                    <Option key={index} value={type.Value}>
                                        {capitalize(type.Name)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Document Uploads */}
                <div style={{
                    marginTop: '24px',
                    marginBottom: '20px',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Document Uploads
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Incorporate Shareholder Document</span>}
                            name={`shareholder_Inorporate_Shareholder_${shareholderId}`}
                            rules={[{ required: true, message: 'Please upload document' }]}
                            getValueFromEvent={() => undefined}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `shareholder_Inorporate_Shareholder_${shareholderId}`)}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Shareholder Proof ID</span>}
                            name={`shareholder_Shareholder_Proof_ID_${shareholderId}`}
                            rules={[{ required: true, message: 'Please upload proof ID' }]}
                            getValueFromEvent={() => undefined}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `shareholder_Shareholder_Proof_ID_${shareholderId}`)}
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
            </Panel>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                    Add Shareholders
                </h2>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    Add one or more shareholders for this corporate client. Click on each shareholder to expand and edit their information.
                </p>
            </div>

            {/* Shareholders Accordion */}
            <Collapse
                activeKey={activeKeys}
                onChange={onActiveKeysChange}
                accordion={false}
                expandIconPosition="end"
                style={{ marginBottom: '24px', backgroundColor: 'transparent' }}
            >
                {shareholders.map((shareholder, index) => renderShareholderForm(shareholder, index))}
            </Collapse>

            {/* Add Shareholder Button */}
            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddShareholder}
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
                Add Shareholder
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
                            title="Total Shareholders"
                            value={shareholders.length}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Completed Forms"
                            value={shareholders.filter(b => getShareholderStatus(b.id).complete).length}
                            suffix={`/ ${shareholders.length}`}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{
                                color: shareholders.filter(b => getShareholderStatus(b.id).complete).length === shareholders.length
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

export default ShareholderForm; 
