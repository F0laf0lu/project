import { Button, Space, Card } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './EditableCard.module.css';

const EditableCard = ({
  title,
  icon,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  children,
  editButtonText = 'Edit',
  saveButtonText = 'Save',
  cancelButtonText = 'Cancel'
}) => {
  return (
    <Card bordered={false} className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h4>
        <div className={styles.actions}>
          {!isEditing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onEdit}
            >
              {editButtonText}
            </Button>
          ) : (
            <Space>
              <Button onClick={onCancel}>
                {cancelButtonText}
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={onSave}
              >
                {saveButtonText}
              </Button>
            </Space>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </Card>
  );
};

export default EditableCard;
