import { Button, Space, Tag } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import styles from './ClientHeader.module.css';

const ClientHeader = ({ client, onBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back to Clients
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.name}>{client.name}</h2>
          <div className={styles.tags}>
            <Tag
              color={client.clientType === 'Corporate' ? 'blue' : 'cyan'}
              className={styles.tag}
            >
              {client.clientType}
            </Tag>
            <Tag
              color={client.status === 'Active' ? 'green' : 'default'}
              className={styles.tag}
            >
              {client.status}
            </Tag>
            <Tag color="purple" className={styles.tag}>
              ID: {client.key}
            </Tag>
          </div>
        </div>

        <Space>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Client
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ClientHeader;
