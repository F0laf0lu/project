import { CheckCircleOutlined } from '@ant-design/icons';
import styles from '../ReviewOnboarding.module.css';

const SubmitSection = () => {
  return (
    <div className={styles.submitSection}>
      <h4 className={styles.submitTitle}>
        <CheckCircleOutlined /> Ready to Submit
      </h4>
      <p className={styles.submitText}>
        Please review all information above. If everything is correct, click{' '}
        <strong>"Complete Onboarding"</strong> to submit. You can use the{' '}
        <strong>"Previous"</strong> button to go back and make changes to any section.
      </p>
    </div>
  );
};

export default SubmitSection;
