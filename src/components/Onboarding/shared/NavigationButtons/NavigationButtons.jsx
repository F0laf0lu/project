import { Button, Space, Form } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './NavigationButtons.module.css';

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onCancel,
  onPrevious,
  onNext,
  isLoading
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <Form.Item className={styles.container}>
      <Space className={styles.space}>
        <Button onClick={onCancel} size="large" className={styles.cancelButton}>
          Cancel
        </Button>

        <Space size="large">
          {!isFirstStep && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onPrevious}
              size="large"
              className={styles.navButton}
            >
              Previous
            </Button>
          )}

          {!isLastStep ? (
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={onNext}
              size="large"
              className={styles.primaryButton}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={<CheckOutlined />}
              size="large"
              className={styles.submitButton}
            >
              Complete Onboarding
            </Button>
          )}
        </Space>
      </Space>
    </Form.Item>
  );
};

export default NavigationButtons;
