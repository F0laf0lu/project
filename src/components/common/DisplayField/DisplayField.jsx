import styles from './DisplayField.module.css';

const DisplayField = ({ label, value, emptyText = 'N/A' }) => {
  const displayValue = value !== undefined && value !== null && value !== ''
    ? value
    : <span className={styles.empty}>{emptyText}</span>;

  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{displayValue}</div>
    </div>
  );
};

export default DisplayField;
