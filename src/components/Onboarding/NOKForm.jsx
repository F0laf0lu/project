import { Input, Select, Row, Col, Form } from 'antd';
import { useState } from 'react';
import { TeamOutlined} from '@ant-design/icons';

const { Option } = Select;


const NOkForm = ({form, utilities}) => {
      const clientType = form.getFieldValue('clientType');
      const nationality = form.getFieldValue('nationality');

      const relationshipType = utilities.relationshipTypeOptions
      const states = utilities.stateOptions
      const titles = utilities.titleOptions
      const gender = utilities.genderOptions
      const countries = utilities.countryOptions
      function capitalize(word) {
        if (word.length === 0) {
          return "";
        }
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Client Details
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Enter the Next of Kin information
          </p>

          {clientType === 'Individual' ? (
            // Individual Client Fields
            <>
              {/* Next of Kin Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  NOK Details
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Title</span>}
                      name="Nok_Title"
                      rules={[
                        { required: true, message: 'Please enter title' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        {
                          titles && titles.map((title, index)=>(
                              <Option key={index} value={title.Value}>{capitalize(title.Name)}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
                      name="Nok_FirstName"
                      rules={[
                        { required: true, message: 'Please enter first name' }
                      ]}
                    >
                      <Input 
                        placeholder="First name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Middle Name</span>}
                      name="Nok_MiddleName"
                    >
                      <Input 
                        placeholder="Middle name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
                      name="Nok_LastName"
                      rules={[
                        { required: true, message: 'Please enter last name' }
                      ]}
                    >
                      <Input 
                        placeholder="Last name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>                  
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Gender</span>}
                      name="Nok_Gender"
                      rules={[
                        { required: true, message: 'Please select gender' }
                      ]}
                    >
                      <Select 
                        placeholder="Select gender" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        {
                          gender && gender.map((gender, index)=>(
                            <Option key={index} value={gender.Value}>{capitalize(gender.Name)}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number</span>}
                      name="Nok_PhoneNumber"
                    >
                      <Input 
                        placeholder="+234-XXX-XXXX-XXX" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                      name="Nok_EmailAddress"
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        placeholder="email@example.com" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Date of Birth</span>}
                      name="Nok_Date_Of_Birth"
                      rules={[
                        { required: true, message: 'Please select date of birth' }
                      ]}
                    >
                      <Input 
                        type="date"
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                      
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Relationship</span>}
                      name="Nok_Relationship"
                      rules={[
                        { required: true, message: 'Please select a relationship' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        {relationshipType && relationshipType.map((type, index)=>(
                          <Option key={index} value={type.Value}>{capitalize(type.Name)}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                    <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                        NOK Address information
                    </h4>
                    <Row gutter={24}>

                    <Col xs={24} md={8}>
                            <Form.Item
                            label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Country</span>}
                            name="Nok_Country"
                            rules={[
                                { required: true, message: 'Please select country' }
                            ]}
                            >
                            <Select 
                              placeholder="Select country" 
                              size="large"
                              style={{ fontSize: '15px' }}
                            >
                              {
                                countries && countries.map((country, index)=>(
                                  <Option key={index} value={country.Value}>{country.Name}</Option>
                                ))
                              }
                            </Select>
                            </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>City</span>}
                        name="Nok_City"
                        >
                        <Input 
                            placeholder="Nok_City" 
                            size="large"
                            style={{ fontSize: '15px' }}
                        />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>State</span>}
                        name="Nok_State"
                        rules={[
                            { required: true, message: 'Please enter state' }
                        ]}
                        >
                        <Select 
                        placeholder="Select state of origin" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        {
                          states && states.map((state, index)=>(
                            <Option key={index} value={state.Value}>{state.Name}</Option>
                          ))
                        }
                      </Select>
                        </Form.Item>
                    </Col>
                    </Row>

                    <Row gutter={24}>
                    <Col xs={24} md={24}>
                        <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                            Address line 1 {nationality === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                        </span>}
                        name="Nok_Address"
                        rules={[
                            { required: true, message: 'Please enter Address' }
                        ]}
                        >
                        <Input 
                            placeholder="Address Line 1" 
                            size="large"
                            style={{ fontSize: '15px' }}
                        />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                            Address line 2 {nationality === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                        </span>}
                        name="Nok_Address2"
                        >
                        <Input 
                            placeholder="Address Line 1" 
                            size="large"
                            style={{ fontSize: '15px' }}
                        />
                        </Form.Item>
                    </Col>
                    </Row>
                </div>
              </div>
            </>
          ) : clientType === 'Corporate' ? (
            // Corporate Client Form
            // <CorporateClientForm  form={form}/>
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '2px dashed #d9d9d9'
                }}>
                <TeamOutlined style={{ fontSize: '64px', color: '#bfbfbf', marginBottom: '16px' }} />
                <h4 style={{ color: '#666', marginBottom: '8px' }}>NOK Not Applicable</h4>
                <p style={{ color: '#999', margin: 0 }}>
                    Nok are only applicable to individual clients <br />
                    Proceed to next step
                </p>
            </div>
          ) : null}
        </div>
      );
    };


    export default NOkForm