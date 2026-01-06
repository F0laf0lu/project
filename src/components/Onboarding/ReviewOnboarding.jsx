import { Space, Tag, Select, List, Row, Col } from 'antd';

import { UserOutlined, TeamOutlined,FileTextOutlined,IdcardOutlined,CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { getValueFromName, getNameFromValue } from '../../utils/utils';


const ReviewOnboarding = ({form, beneficiaries, files, kycTypes, utilities}) => {
      const clientType = form.getFieldValue('clientType');
      const companyType = form.getFieldValue('companyType');


      // console.log(form.getFieldsValue())


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

      
      // Helper to check if a field has value
      const hasValue = (fieldName) => {
        const value = form.getFieldValue(fieldName);
        return value !== undefined && value !== null && value !== '';
      };

      const getKycTypeName = (kycId) => {
        const kycType = availableKycTypes.find(kyc => kyc.Kyc_ID === kycId);
        return kycType ? kycType.Kyc_Type : 'Unknown';
      };

      // Helper to display field value
      const displayValue = (fieldName, defaultText = 'Not provided') => {
        let value = form.getFieldValue(fieldName);
        const selectFields = ['Title', 'Gender', 'Residential_Country', 'State', 'State_Of_Origin']
        if (selectFields.includes(fieldName)){ 
          const getValue = fieldName === 'Residential_Country' 
                ? getNameFromValue(value, utilities.countryOptions)
                : fieldName === 'State_Of_Origin'
                    ? getNameFromValue(value, utilities.stateOptions)
                    : getNameFromValue(value, utilities[`${fieldName.toLowerCase()}Options`]);
         value = getValue
        }

        if (value === undefined || value === null || value === '') {
          return <span style={{ color: '#bfbfbf' }}>{defaultText}</span>;
        }
        return <span style={{ color: '#262626' }}>{value}</span>;
      };

      // Helper to render document status
      const renderDocStatus = (fieldName, label) => {
        const hasDoc = hasValue(fieldName);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {hasDoc ? (
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
            )}
            <span style={{ color: hasDoc ? '#262626' : '#999', fontSize: '14px' }}>
              {label}
            </span>
          </div>
        );
      };

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '24px', 
            marginBottom: '16px',
            fontWeight: '600'
          }}>
            Review Your Information
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Please review all information before submitting. You can go back to edit any section.
          </p>

          {/* Step 1 & 2: Client Type and Product */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <UserOutlined /> Client Type
            </h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Client Type</div>
                  <div style={{ fontSize: '15px', fontWeight: '500' }}>
                    {displayValue('clientType')}
                  </div>
                </div>
              </Col>
              {/* <Col xs={24} md={12}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Selected Product</div>
                  <div style={{ fontSize: '15px', fontWeight: '500' }}>
                    {displayValue('product')}
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>

          {/* Step 3: Client Details */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IdcardOutlined /> Client Details
            </h4>

            {clientType === 'Individual' ? (
              // Individual Client Review
              <>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Personal Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Full Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>
                        {displayValue('Title', '')} {displayValue('FirstName', '')} {displayValue('middleName', '')} {displayValue('LastName', 'N/A')}
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Gender</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Gender')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Date of Birth</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('DATE_OF_BIRTH')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Occupation</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Occupation')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Contact Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Email</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Email')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Mobile Phone</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Mobile_Phone')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Address Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={24} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Address Line 1</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Address1')}</div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Address Line 2</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Address2')}</div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 12]} style={{marginTop:"20px"}}>
                    <Col xs={24} md={12}>
                        <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Country</div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('Residential_Country')}</div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div style={{ color: '#8c8c8c', fontSize: '12px' }}>State</div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('State')}</div>
                      </Col>
                  </Row>
                </div>
              </>
            ) : (
              // Corporate Client Review
              <>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Company Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Company Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('companyName')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>RC Number</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('rcNumber')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>TIN</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('tin')}</div>
                    </Col>
                    <Col xs={12} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Company Type</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('companyType')}</div>
                    </Col>
                    <Col xs={12} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Nature of Business</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('natureOfBusiness')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Contact Person
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>
                        {displayValue('contactFirstName', '')} {displayValue('contactMiddleName', '')} {displayValue('contactLastName', 'N/A')}
                      </div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Email</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('email')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Phone</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('phone')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Compliance
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Risk Classification</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('riskClassification')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Sanction Status</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('sanctionStatus')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>PEP Status</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('pepStatus')}</div>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </div>

          {/* Step 4: Documents */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FileTextOutlined /> Uploaded Documents ({files.length})
            </h4>

            {clientType === 'Corporate' ? (
              <div>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    {renderDocStatus('incorporationCertificate', 'Incorporation Certificate')}
                    {['Limited Liability', 'Limited by Guarantee', 'Unlimited Liability', 'Public Limited Company'].includes(companyType) && 
                      renderDocStatus('memart', 'Memorandum & Articles of Association')}
                    {companyType === 'Incorporated Trustee' && 
                      renderDocStatus('constitution', 'Constitution')}
                    {renderDocStatus('companyProofOfAddress', 'Company Proof of Address')}
                    {renderDocStatus('cacStatusReport', 'CAC Status Report')}
                    {renderDocStatus('appointmentLetter', 'Appointment Letter')}
                    {renderDocStatus('legalSearch', 'Legal Search')}
                  </Col>
                  <Col xs={24} md={12}>
                    {renderDocStatus('companySanctionScreening', 'Company Sanction Screening')}
                    {renderDocStatus('adverseMediaSearch', 'Adverse Media Search')}
                    {renderDocStatus('identificationDocument', 'Identification Document')}
                    {renderDocStatus('contactSanctionScreening', 'Contact Person Sanction Screening')}
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                  {files.length > 0 && (
                    <div style={{ marginTop: '32px' }}>
                        <List
                            dataSource={files}
                            renderItem={(file, index) => (
                                <List.Item
                                    key={index}>
                                    <List.Item.Meta
                                        title={
                                            <Space direction="vertical" size={4}>
                                                <span style={{ fontWeight: '500' }}>{file.name}</span>
                                                <Tag color="blue">{getKycTypeName(kycTypes[index])}</Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
                
              </div>
            )}
          </div>

          {/* Step 5: Beneficiaries */}
          {clientType === 'Individual' && beneficiaries.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '2px solid #e8e8e8'
            }}>
              <h4 style={{ 
                color: '#1890ff', 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <TeamOutlined /> Beneficiaries ({beneficiaries.length})
              </h4>

              {beneficiaries.map((beneficiary, index) => {
                // const firstName = form.getFieldValue(`ben_${beneficiary.id}_firstName`);
                const firstName = form.getFieldValue(`Beneficiary_FirstName_${beneficiary.id}`);
                const lastName = form.getFieldValue(`Beneficiary_LastName_${beneficiary.id}`);
                const relationship = form.getFieldValue(`Beneficiary_Relationship_${beneficiary.id}`);
                
                return (
                  <div 
                    key={beneficiary.id}
                    style={{ 
                      marginBottom: index < beneficiaries.length - 1 ? '16px' : '0',
                      paddingBottom: index < beneficiaries.length - 1 ? '16px' : '0',
                      borderBottom: index < beneficiaries.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                        Beneficiary {index + 1}: {firstName || 'N/A'} {lastName || ''}
                      </span>
                      {relationship && (
                        <Tag color="blue" style={{ marginLeft: '8px' }}>{relationship}</Tag>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Final Summary */}
          <div style={{
            background: '#f0f5ff',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #1890ff',
            marginTop: '32px'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              marginBottom: '16px', 
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircleOutlined /> Ready to Submit
            </h4>
            <p style={{ color: '#262626', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
              Please review all information above. If everything is correct, click <strong>"Complete Onboarding"</strong> to submit. 
              You can use the <strong>"Previous"</strong> button to go back and make changes to any section.
            </p>
          </div>
        </div>
      );
    };

export default ReviewOnboarding