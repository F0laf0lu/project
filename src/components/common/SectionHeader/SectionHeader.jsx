import styles from './SectionHeader.module.css';

const SectionHeader = ({
  icon,
  title,
  subtitle,
  variant = 'primary' // 'primary' | 'secondary'
}) => {
  return (
    <div className={`${styles.header} ${styles[variant]}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
