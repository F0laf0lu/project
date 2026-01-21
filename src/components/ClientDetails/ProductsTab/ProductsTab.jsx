import { Card, Row, Col, Button, Tag } from 'antd';
import { EyeOutlined, PlusOutlined, ShoppingOutlined } from '@ant-design/icons';
import styles from './ProductsTab.module.css';

const ProductsTab = ({ client }) => {
  return (
    <Card bordered={false} className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>Subscribed Products</h4>
      </div>

      <Card size="small" className={styles.productCard}>
        <Row gutter={[16, 12]}>
          <Col xs={24} md={8}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Product Name</div>
              <div className={styles.productName}>
                {client.product || 'No product assigned'}
              </div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Status</div>
              <Tag color="green">Active</Tag>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Start Date</div>
              <div className={styles.fieldValue}>{client.joinDate}</div>
            </div>
          </Col>
          <Col xs={24} md={6} className={styles.actionsCol}>
            <Button type="link" icon={<EyeOutlined />}>
              View Details
            </Button>
          </Col>
        </Row>
      </Card>

      <div className={styles.addProduct}>
        <ShoppingOutlined className={styles.addProductIcon} />
        <p className={styles.addProductText}>Want to add more products?</p>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Product
        </Button>
      </div>
    </Card>
  );
};

export default ProductsTab;
