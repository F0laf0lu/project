import { Steps } from 'antd';
import styles from './OnboardingSteps.module.css';

const OnboardingSteps = ({ currentStep, steps, clientType }) => {
  if (!clientType) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Steps current={currentStep} items={steps} />
      </div>
    </div>
  );
};

export default OnboardingSteps;
