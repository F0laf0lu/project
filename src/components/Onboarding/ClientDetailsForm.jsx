import { useState } from 'react';
import { Input, Select, Row, Col, Form, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select;


import CorporateClientForm from '../CorporateclientForm';
import { useAuth } from '../../contexts/AuthContext';


const ClientDetails = ({form, utilities}) => {
  const clientType = form.getFieldValue('clientType');
  const nationality = form.getFieldValue('nationality');

  const {token} = useAuth()


  const [emailChecking, setEmailChecking] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const [mobileNoChecking, setmobileNoChecking] = useState(false);
  const [mobileNoStatus, setmobileNoStatus] = useState('');


  const [bvnChecking, setbvnChecking] = useState(false);
  const [bvnStatus, setbvnStatus] = useState('');


  const countries = utilities.countryOptions
  const titles = utilities.titleOptions
  const states = utilities.stateOptions
  const gender = utilities.genderOptions
  const maritalStatus = utilities.maritalStatusOptions
  const employers = utilities.employersOptions
  const idType = utilities.idCardTypeOptions

  const BASE_URL = "https://webdev.stanbicibtcpension.com:7789/api"

  


  const checkEmailUnique = async (email)=>{
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;

    setEmailChecking(true)
    setEmailStatus('')

    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/VerifyEmail`, {
        method:"POST",
        headers:{
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
          Email:email
        })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      if (data.Data) {
        setEmailStatus('error');
        form.setFields([{
          name:"Email",
          errors:[`${data.Message}`]
        }])
      }
      else{
        setEmailStatus('success')
        form.setFields([{
          name: 'Email',
          errors: []
        }]);
      }
    } 
    catch (error) {
      console.error('Email check failed:', error);
    }
    finally{
      setEmailChecking(false);
    }
  }

  const checkMobileNumberUnique = async (mobileNumber)=>{

    if (!mobileNumber) return

    setmobileNoChecking(true)
    setmobileNoStatus('')

    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/VerifyMobileNumber`, {
        method:"POST",
        headers:{
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
          MobileNumber:mobileNumber
        })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      if (data.Data) {
        setmobileNoStatus('error');
        form.setFields([{
          name:"Mobile_Phone",
          errors:[`${data.Message}`]
        }])
      }
      else{
        setmobileNoStatus('success')
        form.setFields([{
          name: 'Mobile_Phone',
          errors: []
        }]);
      }
    } 
    catch (error) {
      console.error('mobile number check failed:', error);
    }
    finally{
      setmobileNoChecking(false);
    }
  }

  const checkBVNUnique = async (bvn)=>{

    if(!bvn) return

    setbvnChecking(true)
    setbvnStatus('')

    try {
      const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/VerifyBVN`, {
        method:"POST",
        headers:{
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
          BVN:bvn
        })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      if (data.Data) {
        setbvnStatus('error');
        form.setFields([{
          name:"Email",
          errors:[`${data.Message}`]
        }])
      }
      else{
        setbvnStatus('success')
        form.setFields([{
          name: 'BVN',
          errors: []
        }]);
      }
    } 
    catch (error) {
      console.error('BVN check failed:', error);
    }
    finally{
      setbvnChecking(false);
    }
  }

  const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedEmailCheck = debounce(checkEmailUnique, 500);
  const debouncedBvnCheck = debounce(checkBVNUnique, 500)
  const debouncedMobileNoCheck = debounce(checkMobileNumberUnique, 500)



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
        Enter the {clientType?.toLowerCase() || 'client'} information
      </p>

      {clientType === 'Individual' ? (
        // Individual Client Fields
        <>
          {/* Personal Information */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Personal Information
            </h4>
            
            <Row gutter={24}>
              <Col xs={24} md={8} lg={4}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Title</span>}
                  name="Title"
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

              <Col xs={24} md={8} lg={7}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
                  name="FirstName"
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

              <Col xs={24} md={8} lg={6}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Other Name</span>}
                  name="OtherName"
                >
                  <Input 
                    placeholder="Other Name" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12} lg={7}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
                  name="LastName"
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
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Gender</span>}
                  name="Gender"
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

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Date of Birth</span>}
                  name="DATE_OF_BIRTH"
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
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marital Status</span>}
                  name="Maritial_Status"
                  rules={[
                    { required: true, message: 'Please select marital status' }
                  ]}
                >
                  <Select 
                    placeholder="Select marital status" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  >
                    {maritalStatus && maritalStatus.map((status, index)=>(
                        <Option key={index} value={status.Value}>{capitalize(status.Name)}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Nationality</span>}
                  name="Nationality"
                  rules={[
                    { required: true, message: 'Please select nationality' }
                  ]}
                >
                  <Select 
                    placeholder="Select nationality" 
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
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>State of origin</span>}
                  name="State_Of_Origin"
                  rules={[
                    { required: true, message: 'Please select state of orgin' }
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
          </div>

          {/* Contact and Address Information */}
          <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Contact and Address information
            </h4>
            
            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item
                  label={
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    Mobile number 
                  </span>}
                  name="Mobile_Phone"
                  validateStatus={mobileNoStatus}
                  rules={[
                    { required: true, message: 'Please enter mobile number' }
                  ]}
                >
                  <Input 
                    placeholder="08010001000" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    onChange={(e) => debouncedMobileNoCheck(e.target.value)}
                    suffix={mobileNoChecking ? (<Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />) : (null)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item 
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                  name="Email"
                  validateStatus={emailStatus}
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    placeholder="email@example.com" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    onChange={(e) => debouncedEmailCheck(e.target.value)}
                    suffix={emailChecking ? (<Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />) : (null)}
                  />
                </Form.Item>
              </Col>

            </Row>

            <Row gutter={24}>
              <Col xs={24} md={8}>
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
                        onChange={() => {
                          form.setFieldsValue({ stateOfResidency: undefined, lga: undefined });
                        }}
                      >
                        {
                          countries && countries.map((country, index)=>(
                            <Option value={country.Value}>{country.Name}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>City</span>}
                  name="City"
                >
                  <Input 
                    placeholder="City" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>State</span>}
                  name="State"
                  rules={[
                    { required: true, message: 'Please enter state' }
                  ]}
                >
                  <Select 
                    placeholder="Select state of residence" 
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
                  name="Address1"
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
                    Address line 2 {nationality === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                  </span>}
                  name="Address2"
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

          {/* Identification Information */}
          <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Identification Information
            </h4>

            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>BVN</span>}
                  name="BVN"
                  validateStatus={bvnStatus}
                  rules={[
                    { required: true, message: 'Please enter BVN' },
                    { pattern: /^\d{11}$/, message: 'BVN must be 11 digits' }
                  ]}
                >
                  <Input 
                    placeholder="11-digit BVN" 
                    size="large"
                    maxLength={11}
                    style={{ fontSize: '15px' }}
                    onChange={(e) => debouncedBvnCheck(e.target.value)}
                    suffix={bvnChecking ? (<Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />) : (null)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Type</span>}
                  name="ID_Type"
                  rules={[
                    { required: true, message: 'Please select ID type' }
                  ]}
                >
                  <Select 
                    placeholder="Select ID type" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    onChange={() => {
                      form.setFieldsValue({ 
                        identificationNumber: undefined,
                        issuingAuthority: undefined,
                        identificationExpiry: undefined
                      });
                    }}
                  >
                    {idType && idType.map((type, value)=>(
                      <Option value={type.Value}>{capitalize(type.Name)}</Option>
                    ))} 
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Number</span>}
                  name="ID_Number"
                  rules={[
                    { required: true, message: 'Please enter ID number' }
                  ]}
                >
                  <Input 
                    placeholder="ID number" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Expiry Date</span>}
                  name="Id_Expiry_Date"
                  rules={[
                    { required: true, message: 'Please select ID Expiry Date' }
                  ]}
                >
                  <Input 
                    type="date"
                    size="large"
                    style={{ fontSize: '15px' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Other Information */}
          <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Employment Information
            </h4>
            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Form.Item
                  label = { <span style={{ fontSize: '15px', fontWeight: '500'}}> Employer </span>  }
                  name="Employer"
                  rules={[
                    {required:true, message:"Provide the employer information"}
                  ]}
                >
                  <Select 
                    placeholder="Select Employer" 
                    size="large"
                    style={{ fontSize: '15px' }}
                  >
                    {
                      employers && employers.map((employer, index)=>(
                        <Option key={index} value={employer.Seqnum}>{employer.Name}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Button>Add new Employer</Button>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label = { <span style={{ fontSize: '15px', fontWeight: '500'}}> Occupation </span>  }
                  name="Occupation"
                  rules={[
                    {required:true, message:"Occupation is required"}
                  ]}
                >
                  <Input
                    placeholder="Please enter occupation"
                    size='large'
                    style={{ fontSize: '15px' }}
                  />
                  
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label = { <span style={{ fontSize: '15px', fontWeight: '500'}}> Designation </span>  }
                  name="Designation"
                  rules={[
                    {required:true, message:"Provide the client's designation"}
                  ]}
                >
                  <Input
                    placeholder="Enter client's designation"
                    size='large'
                    style={{ fontSize: '15px' }}
                  />
                  
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Consent and Compliance */}
          <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Consent
            </h4>

            <Row gutter={24}>
              <Col xs={24} md={6}>
                <Form.Item
                  label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Data Privacy</span>}
                  name="Data_Privacy"
                  rules={[
                    { required: true, message: 'Required' }
                  ]}
                >
                  <Select 
                    placeholder="Select" 
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
      ) : clientType === 'Corporate' ? (
        <CorporateClientForm  form={form}/>
      ) : null}
    </div>
  );
};


export default ClientDetails