import { Input, Button, Tag, Select, Card, Row, Col, Statistic, Form, App, Collapse, Upload } from 'antd';
import { TeamOutlined, PlusOutlined, DeleteOutlined, CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Panel } = Collapse;

const DirectorForm = ({
    form, 
    utilities, 
    directors,
    directorData,
    onAddDirector,
    onRemoveDirector,
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

    const handleRemove = (id) => {
        if (directors.length > 1) {
            onRemoveDirector(id);
            message.success('Director removed');
        } else {
            message.warning('At least one director is required');
        }
    };

    // Get director display name for accordion header
    const getDirectorDisplayName = (directorId, index) => {
        const data = directorData[directorId];
        if (data && (data.Director_FirstName || data.Director_LastName)) {
            return `${data.Director_FirstName || ''} ${data.Director_LastName || ''}`.trim();
        }
        return `Director ${index + 1}`;
    };

    // Get completion status for Director
    const getDirectorStatus = (directorId) => {
        const data = directorData[directorId];
        if (!data) return { complete: false, filled: 0, total: 10 };
        
        const requiredFields = [
            'SeQNum',
            'FirstName',
            'LastName',
            'OtherName',
            'Country',
            'State_Of_Residency',
            'Prof_Of_Address_Type',
            'Nationality',
            'Date_Of_Birth',
            'State_Of_Origin',
            'Occupation',
            'Source_Of_Wealth',
            'PEP_Status',
            'ID_Number',
            'ID_Type',
            'Id_Card_Expiry_Date',
            'Identification_Document',
            'Identification_Validity',
            'Mobile_Numbner1_Country_Code',
            'Mobile_Number1',
            'BVN',
        ];
        const filled = requiredFields.filter(field => data[field] && data[field] !== '').length;
        const total = requiredFields.length;
        return { complete: filled === total, filled, total };
    };

    const renderDirectorForm = (director, index) => {
        const directorId = director.id;
        const status = getDirectorStatus(directorId);
        const displayName = getDirectorDisplayName(directorId, index);
        
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
                {directors.length > 1 && (
                    <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(directorId);
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

                const fieldNameWithoutId = fieldName.replace(`_${directorId}`, '');

                // Map form fields to API fields and their corresponding name fields
                // Note: Backend API has inconsistent naming (_Name vs _name, and field name differences)
                const fieldMapping = {
                    'Proof_Of_Address_Document': {
                        documentField: 'Proof_Of_Address_Document',
                        nameField: 'Proof_Of_Address_Document_Name'
                    },
                    'Identification_Document': {
                        documentField: 'Identification_Document',
                        nameField: 'Identification_Document_Name'
                    },
                    'Passport_Photograph': {
                        documentField: 'Passport_Photograph',
                        nameField: 'Passport_Photograph_Name'
                    },
                    'PEP_Approval_Document': {
                        documentField: 'PEP_Approval_Document',
                        nameField: 'PEP_Approval_Document_Name'
                    },
                    'International_Passport': {
                        documentField: 'International_Passport',
                        nameField: 'International_Passport_name' // lowercase 'n' in API
                    },
                    'Sanction_Screening': {
                        documentField: 'Sanction_Screening_Document', // API expects 'Document' suffix
                        nameField: 'Sanction_Screening_Document_Name'
                    },
                    'Safe_Watch': {
                        documentField: 'Safe_Watch',
                        nameField: 'SafeWatch_Name' // Different format in API
                    }
                };

                const mapping = fieldMapping[fieldNameWithoutId];

                if (mapping) {
                    // Store BOTH document and filename
                    // Note: Using forEach to call onFieldChange twice, but with functional setState
                    // in the hook, this properly merges both updates
                    const updateFields = {
                        [mapping.documentField]: base64String,
                        [mapping.nameField]: fileName
                    };

                    Object.entries(updateFields).forEach(([field, value]) => {
                        onFieldChange(directorId, field, value);
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
                key={directorId.toString()}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Seqnum </span>}  
                            name={`SeQNum_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Title</span>} 
                            name={`Title_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select 
                                placeholder="Select title"
                                size="large"
                                onChange={(value) => onFieldChange(directorId, 'Title', value)}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> First Name</span>} 
                            name={`FirstName_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Other Name</span>} 
                            name={`OtherName_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Lastname </span>} 
                            name={`Director_LastName_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                placeholder="Last Name"
                                size="large"
                                onChange={(e) => onFieldChange(directorId, 'Director_LastName', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> State Of Origin </span>} 
                            name={`State_Of_Origin_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Date Of Birth</span>} 
                            name={`Date_Of_Birth_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Nationality </span>} 
                            name={`Nationality_${directorId}`}
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
                                {countries && countries.map((country, index) => (
                                    <Option key={index} value={country.Value}>
                                        {country.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Location Information */}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Country</span>} 
                            name={`Country_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> City</span>} 
                            name={`City_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> State </span>} 
                            name={`State_Of_Residency_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Proof of Address Type</span>} 
                            name={`Prof_Of_Address_Type_${directorId}`}
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
                                <Select.Option value="utility_bill">Utility Bill</Select.Option>
                                <Select.Option value="bank_statement">Bank Statement</Select.Option>
                                <Select.Option value="direvers_licence">Driver's Licence</Select.Option>
                                <Select.Option value="nimc">NIMC</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Proof of Address Document</span>} 
                            name={`Proof_Of_Address_Document_${directorId}`}
                            rules={[{ required: true, message: 'Please enter Address' }]}
                            getValueFromEvent={() => undefined}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `Proof_Of_Address_Document_${directorId}`)}
                                showUploadList={false}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        
                    </Col>
                </Row>

                {/* Contact Information */}
                <div style={{ 
                    marginTop: '24px',
                    marginBottom: '20px', 
                    fontSize: '15px', 
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Contact Information
                </div>
                <Row gutter={24}>
                    <Col xs={24} md={8}>
                        <Form.Item
                        label={
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>
                            Country Code
                        </span>}
                        name="Mobile_Number1_Country_Code"
                        rules={[
                            { required: true, message: 'Please enter mobile number' }
                        ]}
                        >
                        <Input 
                            placeholder="+234" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={(e) => onFieldChange(directorId, 'Mobile_Number1_Country_Code', e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                        label={
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>
                            Mobile number 
                        </span>}
                        name="Mobile_Number1"
                        rules={[
                            { required: true, message: 'Please enter mobile number' }
                        ]}
                        >
                        <Input 
                            placeholder="8010001000" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={(e) => onFieldChange(directorId, 'Mobile_Number1', e.target.value)}
                        />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item 
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                        name="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                        >
                        <Input 
                            placeholder="email@example.com" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={(e) => onFieldChange(directorId, 'Email', e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Identification Information */}
                <div style={{ 
                    marginTop: '24px',
                    marginBottom: '20px', 
                    fontSize: '15px', 
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Identification Information
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> BVN </span>} 
                            name={`BVN_${directorId}`}
                            rules={[{ required: true, message: 'Please enter BVN' }]}
                        >
                            <Input 
                                placeholder="BVN"
                                size="large"
                                onChange={(e) => onFieldChange(directorId, 'BVN', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Identification Type </span>} 
                            name={`Country_${directorId}`}
                            rules={[{ required: true, message: 'Please select birth country' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select ID Type"
                                size="large"
                                onChange={(value) => onFieldChange(directorId, 'ID_Type', value)}
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
                    
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Identification Number </span>} 
                            name={`ID_Number_${directorId}`}
                        >
                            <Input 
                                placeholder="Identification Number"
                                size="large"
                                onChange={(e) => onFieldChange(directorId, 'ID_Number', e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Expiry Date</span>} 
                            name={`Id_Card_Expiry_Date_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input 
                                type="date"
                                size="large"
                                onChange={(e) => onFieldChange(directorId, 'Id_Card_Expiry_Date', e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Identification Validity </span>} 
                            name={`Identification_Validity_${directorId}`}
                            rules={[{ required: true, message: 'Please select Identification validity' }]}
                        >
                            <Select 
                                showSearch
                                placeholder="Select ID Type"
                                size="large"
                                onChange={(value) => onFieldChange(directorId, 'Identification_Validity', value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Select.Option value="Valid">Valid</Select.Option>
                                <Select.Option value="Invalid">Invalid</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}> 
                    <Col span={16}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Document Upload</span>} 
                            name={`Identification_Document_${directorId}`}
                            rules={[{ required: true, message: 'Please enter Address' }]}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `Identification_Document_${directorId}`)}
                                showUploadList={false}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>   
                    <Col span={16}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Passport Photograph Upload</span>} 
                            name={`Passport_Photograph_${directorId}`}
                            rules={[{ required: true, message: 'Please upload Passport Photograph' }]}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `Passport_Photograph_${directorId}`)}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Compliance Information */}
                <div style={{ 
                    marginTop: '24px',
                    marginBottom: '20px', 
                    fontSize: '15px', 
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Other Information
                </div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Occupation</span>} 
                            name={`Occupation_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                        <Input 
                            placeholder="Enter occupation" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={(e) => onFieldChange(directorId, 'Occupation', e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Source of Wealth </span>} 
                            name={`Source_Of_Wealth_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                        <Input 
                            placeholder="Enter Source Of Wealth" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={(e) => onFieldChange(directorId, 'Source_Of_Wealth', e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> PEP Status </span>} 
                            name={`PEP_Status_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> PEP Approval Status </span>} 
                            name={`PEP_Approval_Status_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Sanction Screening Status </span>} 
                            name={`Sanction_Screening_Status_${directorId}`}
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
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>PEP Approval Document Upload</span>} 
                            name={`PEP_Approval_Document_${directorId}`}
                            rules={[{ required: true, message: 'Please enter Address' }]}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `PEP_Approval_Document_${directorId}`)}
                                showUploadList={false}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>   
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>International Passport Upload</span>} 
                            name={`International_Passport_${directorId}`}
                            rules={[{ required: true, message: 'Please upload Passport Photograph' }]}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `International_Passport_${directorId}`)}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Sanction Screening Document Upload</span>} 
                            name={`Sanction_Screening_${directorId}`}
                            rules={[{ required: true, message: 'Please upload Sanction Screening' }]}
                        >
                            <Upload
                                beforeUpload={(file) => handleUpload(file, `Sanction_Screening_${directorId}`)}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item 
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}> Safe Watch Document Upload</span>} 
                            name={`Safe_Watch_${directorId}`}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                        <Upload
                                beforeUpload={(file) => handleUpload(file, `Safe_Watch_${directorId}`)}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<UploadOutlined />}>
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
                    Add Directors
                </h2>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    Add one or more directors for this client. Click on each director to expand and edit their information.
                </p>
            </div>

            {/* directors Accordion */}
            <Collapse 
                activeKey={activeKeys}
                onChange={onActiveKeysChange}
                accordion={false}
                expandIconPosition="end"
                style={{ marginBottom: '24px', backgroundColor: 'transparent' }}
            >
                {directors.map((director, index) => renderDirectorForm(director, index))}
            </Collapse>

            {/* Add Director Button */}
            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddDirector}
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
                Add Director
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
                            title="Total directors"
                            value={directors.length}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Completed Forms"
                            value={directors.filter(b => getDirectorStatus(b.id).complete).length}
                            suffix={`/ ${directors.length}`}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ 
                                color: directors.filter(b => getDirectorStatus(b.id).complete).length === directors.length 
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

export default DirectorForm;