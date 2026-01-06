import { Input, Select, Row, Col, Form } from 'antd';
import { useState } from 'react';

const { Option } = Select;



const CorporateClientForm = ({form})=>{

    return(
        <>
            {/* Company Information */}
            <div style={{ marginBottom: '32px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                Company Information
            </h4>
            
            <Row gutter={24}>
                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Company Name</span>}
                    name="Corporate_Client"
                    rules={[
                    { required: true, message: 'Please enter company name' }
                    ]}
                >
                    <Input 
                    placeholder="Enter company name" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    />
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>RC Number</span>}
                    name="RC_Number"
                    rules={[
                    { required: true, message: 'Please enter RC number' }
                    ]}
                >
                    <Input 
                    placeholder="Enter RC number" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    />
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>TIN (Tax Identification Number)</span>}
                    name="Tin"
                    rules={[
                    { required: true, message: 'Please enter TIN' }
                    ]}
                >
                    <Input 
                    placeholder="Enter TIN" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    />
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Business Type</span>}
                    name="Business_Type"
                    rules={[
                    { required: true, message: 'Please select company type' }
                    ]}
                >
                    <Select 
                    placeholder="Select company type" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Limited Liability">Limited Liability</Option>
                    <Option value="Unlimited Liability">Unlimited Liability</Option>
                    <Option value="Limited by Guarantee">Limited by Guarantee</Option>
                    <Option value="Public Limited Company">Public Limited Company</Option>
                    <Option value="Incorporated Trustee">Incorporated Trustee</Option>
                    <Option value="Sole Proprietorship">Sole Proprietorship</Option>
                    <Option value="Partnership">Partnership</Option>
                    <Option value="Government Entity">Government Entity</Option>
                    <Option value="Embassies and Consulates">Embassies and Consulates</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Business Sector</span>}
                    name="Business_Sector"
                    rules={[
                    { required: true, message: 'Please select nature of business' }
                    ]}
                >
                    <Select 
                    placeholder="Select nature of business" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    >
                    <Option value="Jewelry">Jewelry</Option>
                    <Option value="Car Dealers">Car Dealers</Option>
                    <Option value="Luxury Goods">Luxury Goods</Option>
                    <Option value="Audit Firms">Audit Firms</Option>
                    <Option value="Tax Consultants">Tax Consultants</Option>
                    <Option value="Clearing and Forwarding">Clearing and Forwarding</Option>
                    <Option value="Hotels">Hotels</Option>
                    <Option value="Casinos">Casinos</Option>
                    <Option value="Supermarkets">Supermarkets</Option>
                    <Option value="Law Firms">Law Firms</Option>
                    <Option value="Accountants">Accountants</Option>
                    <Option value="Trust Services">Trust Services</Option>
                    <Option value="Estate Valuators">Estate Valuators</Option>
                    <Option value="Mortgage Brokers">Mortgage Brokers</Option>
                    <Option value="Real Estate">Real Estate</Option>
                    <Option value="Hospitality">Hospitality</Option>
                    <Option value="Construction">Construction</Option>
                    <Option value="Mechanized Farming">Mechanized Farming</Option>
                    <Option value="Consulting">Consulting</Option>
                    <Option value="Furniture Making">Furniture Making</Option>
                    </Select>
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Risk Classification</span>}
                    name="Risk_Classification"
                    rules={[
                    { required: true, message: 'Please select risk classification' }
                    ]}
                >
                    <Select 
                    placeholder="Select risk classification" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Low">Low</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="High">High</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Residential Country</span>}
                      name="Residential_Country"
                      rules={[
                        { required: true, message: 'Please select country' }
                      ]}
                    >
                      <Select 
                        placeholder="Select country" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        // onChange={() => {
                        //   form.setFieldsValue({ stateOfResidency: undefined, lga: undefined });
                        // }}
                      >
                        {/* {
                          countries && countries.map((country, index)=>(
                            <Option value={country.Value}>{country.Name}</Option>
                          ))
                        } */}
                      </Select>
                    </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>State</span>}
                  name="Residential_State"
                  rules={[
                    { required: true, message: 'Please enter state' }
                  ]}
                >
                  <Select 
                    placeholder="Select state of residence" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  >
                    {/* {
                      states && states.map((state, index)=>(
                        <Option key={index} value={state.Value}>{state.Name}</Option>
                      ))
                    } */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={24}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                    Address line 1 
                  </span>}
                  name="Residential_Address"
                  rules={[
                    { required: true, message: 'Please enter state of origin' }
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
                    Address line 2 
                  </span>}
                  name="Residential_Address2"
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

            {/* Contact Person Information */}
            <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                Contact Person Information
            </h4>

            <Row gutter={24}>

                <Col xs={24} md={8}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Name</span>}
                    name="Name_Of_Contact_Person"
                >
                    <Input 
                    placeholder="Enter contact person name" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    />
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number</span>}
                    name="Contact_Number"
                    rules={[
                    { required: true, message: 'Please enter mobile number' }
                    ]}
                >
                    <Input 
                    placeholder="+234-XXX-XXXX-XXX" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    />
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                    name="Contact_Email_Address"
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
            </Row>
            </div>

            {/* Consent and Compliance */}
            <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                Consent and Compliance
            </h4>

            <Row gutter={24}>
                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Data Privacy Consent</span>}
                    name="Data_Privacy"
                    rules={[
                    { required: true, message: 'Please select data privacy consent' }
                    ]}
                >
                    <Select 
                    placeholder="Select consent" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                    </Select>
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marketing Consent</span>}
                    name="Marketing_Consent"
                    rules={[
                    { required: true, message: 'Please select marketing consent' }
                    ]}
                >
                    <Select 
                    placeholder="Select consent" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                    </Select>
                </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Corporate Search</span>}
                    name="Corporate_Search"
                    rules={[
                    { required: true, message: 'Please select corporate search' }
                    ]}
                >
                    <Select 
                    placeholder="Select corporate search" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>
            </div>
        </>
    )
}


export default CorporateClientForm