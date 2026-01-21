import { useState } from 'react';
import { Card, Button, Form } from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import BeneficiaryCard from './BeneficiaryCard';
import styles from './BeneficiariesTab.module.css';

const BeneficiariesTab = ({ client, onSaveBeneficiary }) => {
  const [form] = Form.useForm();
  const [editingBeneficiaryId, setEditingBeneficiaryId] = useState(null);

  const beneficiaries = client.beneficiaries || [
    { id: 1, name: 'Jane Doe', relationship: 'Daughter', percentage: '40%', phone: '+234-803-111-2222' },
    { id: 2, name: 'John Doe Jr.', relationship: 'Son', percentage: '35%', phone: '+234-803-333-4444' },
    { id: 3, name: 'Mary Doe', relationship: 'Sister', percentage: '25%', phone: '+234-803-555-6666' }
  ];

  const handleEdit = (beneficiary) => {
    setEditingBeneficiaryId(beneficiary.id);
    form.setFieldsValue({
      name: beneficiary.name,
      relationship: beneficiary.relationship,
      percentage: beneficiary.percentage.replace('%', ''),
      phone: beneficiary.phone
    });
  };

  const handleCancelEdit = () => {
    setEditingBeneficiaryId(null);
    form.resetFields();
  };

  const handleSave = (values) => {
    if (onSaveBeneficiary) {
      onSaveBeneficiary(editingBeneficiaryId, {
        ...values,
        percentage: values.percentage + '%'
      });
    }
    setEditingBeneficiaryId(null);
  };

  const totalPercentage = beneficiaries.reduce(
    (acc, b) => acc + parseInt(b.percentage),
    0
  );

  return (
    <Card bordered={false} className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>Beneficiaries List ({beneficiaries.length})</h4>
        <Button type="primary" icon={<PlusOutlined />} size="small">
          Add Beneficiary
        </Button>
      </div>

      {beneficiaries.length === 0 ? (
        <div className={styles.empty}>
          <TeamOutlined className={styles.emptyIcon} />
          <p className={styles.emptyText}>No beneficiaries added yet</p>
        </div>
      ) : (
        <div className={styles.list}>
          {beneficiaries.map((beneficiary, index) => (
            <BeneficiaryCard
              key={beneficiary.id}
              beneficiary={beneficiary}
              index={index}
              isEditing={editingBeneficiaryId === beneficiary.id}
              form={form}
              onEdit={() => handleEdit(beneficiary)}
              onCancel={handleCancelEdit}
              onSave={handleSave}
              onRemove={() => {}}
            />
          ))}
        </div>
      )}

      <div className={styles.summary}>
        <p className={styles.summaryText}>
          <strong>Total Distribution:</strong> {totalPercentage}%
          {totalPercentage === 100
            ? ' ✓ Complete'
            : ' ⚠️ Incomplete - Total should be 100%'}
        </p>
      </div>
    </Card>
  );
};

export default BeneficiariesTab;
