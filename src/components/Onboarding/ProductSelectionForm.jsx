import { Button, Tag, Select, Card, Row, Col, Statistic, Form, App, Collapse } from 'antd';
import { ShoppingOutlined, PlusOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { AVAILABLE_PRODUCTS, PRODUCT_STATUS_OPTIONS } from '../../data/mockProducts';

const { Option } = Select;
const { Panel } = Collapse;

const ProductSelectionForm = ({
    form,
    products,
    productData,
    onAddProduct,
    onRemoveProduct,
    onFieldChange,
    activeKeys,
    onActiveKeysChange
}) => {
    const { message } = App.useApp();

    const handleRemove = (id) => {
        onRemoveProduct(id);
        message.success('Product removed');
    };

    // Get product display name for accordion header
    const getProductDisplayName = (productId, index) => {
        const data = productData[productId];
        if (data && data.Product_Name) {
            return data.Product_Name;
        }
        return `Product ${index + 1}`;
    };

    // Get completion status for product
    const getProductStatus = (productId) => {
        const data = productData[productId];
        if (!data) return { complete: false, filled: 0, total: 3 };

        const requiredFields = ['Product_Name', 'Status', 'Start_Date'];
        const filled = requiredFields.filter(field => data[field] && data[field] !== '').length;
        const total = requiredFields.length;
        return { complete: filled === total, filled, total };
    };

    const renderProductForm = (product, index) => {
        const productId = product.id;
        const status = getProductStatus(productId);
        const displayName = getProductDisplayName(productId, index);

        // Custom header for each panel
        const panelHeader = (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShoppingOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
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
                <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(productId);
                    }}
                >
                    Remove
                </Button>
            </div>
        );

        return (
            <Panel
                header={panelHeader}
                key={productId.toString()}
                style={{ marginBottom: '16px' }}
            >
                {/* Product Details */}
                <div style={{
                    marginBottom: '20px',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1890ff',
                    borderBottom: '2px solid #e8e8e8',
                    paddingBottom: '8px'
                }}>
                    Product Details
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Product *"
                            name={`Product_Name_${productId}`}
                            rules={[{ required: true, message: 'Please select a product' }]}
                        >
                            <Select
                                placeholder="Select product"
                                size="large"
                                onChange={(value) => onFieldChange(productId, 'Product_Name', value)}
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {AVAILABLE_PRODUCTS.map((product) => (
                                    <Option key={product.Product_ID} value={product.Product_Name}>
                                        {product.Product_Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Status *"
                            name={`Status_${productId}`}
                            rules={[{ required: true, message: 'Please select status' }]}
                            initialValue="Pending"
                        >
                            <Select
                                placeholder="Select status"
                                size="large"
                                onChange={(value) => onFieldChange(productId, 'Status', value)}
                                defaultValue="Pending"
                            >
                                {PRODUCT_STATUS_OPTIONS.map((status) => (
                                    <Option key={status.Value} value={status.Value}>
                                        {status.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Start Date *"
                            name={`Start_Date_${productId}`}
                            rules={[{ required: true, message: 'Please select start date' }]}
                        >
                            <input
                                type="date"
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    padding: '4px 11px',
                                    fontSize: '14px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '6px'
                                }}
                                onChange={(e) => onFieldChange(productId, 'Start_Date', e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        {/* Show selected product description */}
                        {productData[productId]?.Product_Name && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#f6ffed',
                                borderRadius: '6px',
                                marginTop: '29px'
                            }}>
                                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>
                                    Product Description
                                </div>
                                <div style={{ fontSize: '13px', color: '#595959' }}>
                                    {AVAILABLE_PRODUCTS.find(p => p.Product_Name === productData[productId].Product_Name)?.Product_Description || 'No description available'}
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Panel>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                    Select Products
                </h2>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    Add products that this client will be subscribed to. You can add multiple products or skip this step if no products are needed at this time.
                </p>
            </div>

            {/* Products Accordion */}
            {products.length > 0 && (
                <Collapse
                    activeKey={activeKeys}
                    onChange={onActiveKeysChange}
                    accordion={false}
                    expandIconPosition="end"
                    style={{ marginBottom: '24px', backgroundColor: 'transparent' }}
                >
                    {products.map((product, index) => renderProductForm(product, index))}
                </Collapse>
            )}

            {/* Empty State */}
            {products.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '48px',
                    background: '#fafafa',
                    borderRadius: '8px',
                    border: '2px dashed #d9d9d9',
                    marginBottom: '24px'
                }}>
                    <ShoppingOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '16px' }} />
                    <p style={{ color: '#8c8c8c', fontSize: '16px', marginBottom: '8px' }}>
                        No products added yet
                    </p>
                    <p style={{ color: '#bfbfbf', fontSize: '14px', marginBottom: '0' }}>
                        Click the button below to add a product subscription
                    </p>
                </div>
            )}

            {/* Add Product Button */}
            <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddProduct}
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
                Add Product
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
                            title="Total Products"
                            value={products.length}
                            prefix={<ShoppingOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Completed"
                            value={products.filter(p => getProductStatus(p.id).complete).length}
                            suffix={`/ ${products.length}`}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{
                                color: products.length === 0 ? '#8c8c8c' :
                                    products.filter(p => getProductStatus(p.id).complete).length === products.length
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

export default ProductSelectionForm;
