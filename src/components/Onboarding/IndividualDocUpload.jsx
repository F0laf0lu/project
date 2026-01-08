import { useState } from 'react';
import { Button, Space, Tag, Select, App, Row, Col, Form, message, Upload, List } from 'antd';
import { FileTextOutlined,UploadOutlined,DeleteOutlined} from '@ant-design/icons';


const { Option } = Select;


const UploadDocForm = ({form, onAddFile, onRemoveFile, files, kycTypes, isResuming, resumeKycTypes, resumeFiles})=>{

    const [selectedKycType, setSelectedKycType] = useState(null)

    const availableKycTypes = [
        {
            "Kyc_ID": "01",
            "Kyc_Type": "Passport photograph of Settlor"
        },
        {
            "Kyc_ID": "02",
            "Kyc_Type": "Valid means of identification of Settlor"
        },
        {
            "Kyc_ID": "03",
            "Kyc_Type": "Utility bill not older than 3 months for Settlor (Address Verification)"
        },
        {
            "Kyc_ID": "04",
            "Kyc_Type": "Completed Email Indemnity Form"
        },
        {
            "Kyc_ID": "05",
            "Kyc_Type": "Simple Will Agreement"
        },
        {
            "Kyc_ID": "06",
            "Kyc_Type": "Comprehensive Will Agreement"
        },
        {
            "Kyc_ID": "07",
            "Kyc_Type": "Confirmation of Previous Wills"
        },
        {
            "Kyc_ID": "08",
            "Kyc_Type": "Passport photograph of beneficiary"
        },
        {
            "Kyc_ID": "09",
            "Kyc_Type": "Birth certificate of beneficiary"
        },
        {
            "Kyc_ID": "10",
            "Kyc_Type": "Others"
        }
    ];

    const corporateKYCTypes = [
        {
            "Kyc_ID": "01",
            "Kyc_Type": "CAC Certificate"
        },
        {
            "Kyc_ID": "02",
            "Kyc_Type": "Memorandum of Association and Articles of Association"
        },
        {
            "Kyc_ID": "03",
            "Kyc_Type": "Constitution"
        },
        {
            "Kyc_ID": "04",
            "Kyc_Type": "Proof of address"
        },
        {
            "Kyc_ID": "05",
            "Kyc_Type": "Enhanced Due Diligence"
        },
        {
            "Kyc_ID": "06",
            "Kyc_Type": "Appointment Letter/Letter of Authorization"
        },
        {
            "Kyc_ID": "07",
            "Kyc_Type": "Sanction Screening Document"
        },
        {
            "Kyc_ID": "08",
            "Kyc_Type": "SCUML Certificate"
        },
        {
            "Kyc_ID": "09",
            "Kyc_Type": "Legal Search"
        },
        {
            "Kyc_ID": "10",
            "Kyc_Type": "Adverse Media/Google Search"
        }
    ];

    const handleUpload = (file) => {
        if (!selectedKycType) {
            message.error('Please select a KYC document type first');
            return false;
        }
        onAddFile(file, selectedKycType)
        message.success(`${file.name} uploaded successfully`);

        form.setFieldsValue({
            kyc_type: null
        });
        setSelectedKycType(null);
        return false;
    };

    const handleRemove = (index) => {
        onRemoveFile(index, isResuming)
        message.success('File removed successfully');
    };

    const getKycTypeName = (kycId, clientType) => {
        const kycType = clientType == "Individual" ? (availableKycTypes.find(kyc => kyc.Kyc_ID === kycId)) : corporateKYCTypes.find(kyc => kyc.Kyc_ID === kycId)
        return kycType ? kycType.Kyc_Type : 'Unknown';
    };


    return(
        <>
            <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Upload Required Documents
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Upload all required documents for client onboarding
          </p>

                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                    Personal Identification Documents
                    </h4>
                </div>


                <Row gutter={24}>
                    <Col xs={24} md={16}>
                        <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>KYC Document</span>}
                        name="kyc_type"
                        >
                        <Select 
                            placeholder="Select document type" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            value={selectedKycType}
                            onChange={(value) => setSelectedKycType(value)}
                        >
                            { form.getFieldsValue().clientType == "Individual" ?
                                (availableKycTypes.map((kyc, index)=>(
                                    <Option key={index} value={kyc.Kyc_ID}>{kyc.Kyc_Type}</Option>
                                ))) : (corporateKYCTypes.map((kyc, index)=>(
                                    <Option key={index} value={kyc.Kyc_ID}>{kyc.Kyc_Type}</Option>
                                ))) 
                            }

                        </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                        <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}></span>}
                            name="kyc_file"
                        >
                            <Upload
                                beforeUpload={handleUpload}
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

                {/* Uploaded Files List */}
                {files.length > 0 && (
                    <div style={{ marginTop: '32px' }}>
                        <h4 style={{ 
                            color: '#1890ff', 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            marginBottom: '16px' 
                        }}>
                            Uploaded Documents ({files.length})
                        </h4>
                        
                        <List
                            bordered
                            dataSource={files}
                            renderItem={(file, index) => (
                                <List.Item
                                    key={index}
                                    actions={[
                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                        title={
                                            <Space direction="vertical" size={4}>
                                                <span style={{ fontWeight: '500' }}>{file.name}</span>
                                                <Tag color="blue">{getKycTypeName(kycTypes[index], form.getFieldsValue().clientType)}</Tag>
                                            </Space>
                                        }
                                        description={`Size: ${(file.size / 1024).toFixed(2)} KB`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}

                {/* Previously uploaded doc */}
                {isResuming && (
                <div style={{ marginTop: '32px' }}>
                    <h4 style={{ 
                        color: '#1890ff', 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        marginBottom: '16px' 
                    }}>
                        Previously Uploaded Documents ({resumeFiles.length})
                    </h4>
                    
                    <List
                        bordered
                        dataSource={resumeFiles}
                        renderItem={(file, index) => (
                            <List.Item
                                key={index}
                                // actions={[
                                //     <Button
                                //         type="text"
                                //         danger
                                //         icon={<DeleteOutlined />}
                                //         onClick={() => handleRemove(index)}
                                //     >
                                //         Remove
                                //     </Button>
                                // ]}
                            >
                                <List.Item.Meta
                                    avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                                    title={
                                        <Space direction="vertical" size={4}>
                                            <span style={{ fontWeight: '500' }}>{file.name}</span>
                                            <Tag color="blue">{getKycTypeName(resumeKycTypes[index])}</Tag>
                                        </Space>
                                    }
                                    description={`Size: ${file.size}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>)}
          </div>
        
        </>
    )
}



export default UploadDocForm