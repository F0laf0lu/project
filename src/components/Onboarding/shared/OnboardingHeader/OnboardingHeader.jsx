import { PlusOutlined } from '@ant-design/icons';
import styles from './OnboardingHeader.module.css';

const OnboardingHeader = ({ title = 'Onboard New Client', subtitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <PlusOutlined className={styles.icon} />
          {title}
        </h2>
        <p className={styles.subtitle}>
          {subtitle || 'Complete the steps to add a new client to the system'}
        </p>
      </div>
    </div>
  );
};

export default OnboardingHeader;
