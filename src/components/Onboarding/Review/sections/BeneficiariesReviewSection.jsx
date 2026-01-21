import { Tag } from 'antd';
import { TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SectionHeader from '../../../common/SectionHeader';
import styles from '../ReviewOnboarding.module.css';

const BeneficiariesReviewSection = ({ form, beneficiaries, clientType }) => {
  if (clientType !== 'Individual' || beneficiaries.length === 0) return null;

  return (
    <div className={styles.section}>
      <SectionHeader
        icon={<TeamOutlined />}
        title={`Beneficiaries (${beneficiaries.length})`}
      />

      {beneficiaries.map((beneficiary, index) => {
        const firstName = form.getFieldValue(`Beneficiary_FirstName_${beneficiary.id}`);
        const lastName = form.getFieldValue(`Beneficiary_LastName_${beneficiary.id}`);
        const relationship = form.getFieldValue(`Beneficiary_Relationship_${beneficiary.id}`);

        return (
          <div
            key={beneficiary.id}
            className={`${styles.beneficiaryItem} ${
              index < beneficiaries.length - 1 ? styles.withBorder : ''
            }`}
          >
            <div className={styles.beneficiaryRow}>
              <CheckCircleOutlined className={styles.iconSuccess} />
              <span className={styles.beneficiaryName}>
                Beneficiary {index + 1}: {firstName || 'N/A'} {lastName || ''}
              </span>
              {relationship && (
                <Tag color="blue" style={{ marginLeft: '8px' }}>
                  {relationship}
                </Tag>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BeneficiariesReviewSection;
