import { Space, Select, Row, Col, Form } from 'antd';
import { UserOutlined,TeamOutlined} from '@ant-design/icons';
const { Option } = Select;


function ClientType() {

    return(
        <div>
            <h3 style={{ 
                color: '#1890ff', 
                fontSize: '20px', 
                marginBottom: '24px',
                fontWeight: '600'
            }}>
                Select Client Type
            </h3>
            <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
                Choose whether this is an individual or corporate client
            </p>

            <Row gutter={24}>
                <Col span={8}>
                <Form.Item
                    label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Client Type</span>}
                    name="clientType"
                    rules={[
                        {required: true, message: 'Please select a client type'}
                    ]}
                >
                    <Select 
                    placeholder="Select client type" 
                    size="large"
                    style={{ fontSize: '15px' }}
                    >
                    <Option value="Individual">
                        <Space>
                        <UserOutlined style={{ color: '#1890ff' }} />
                        <span>Individual</span>
                        </Space>
                    </Option>
                    <Option value="Corporate">
                        <Space>
                        <TeamOutlined style={{ color: '#1890ff' }} />
                        <span>Corporate</span>
                        </Space>
                    </Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>
        </div>
    )
}
    

export default ClientType