import { Button, Card, Row, Col, Statistic, Collapse, App } from 'antd';
import { TeamOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ShareholderPanel from './ShareholderPanel';
import styles from './ShareholdersForm.module.css';

const ShareholdersForm = ({
  form,
  utilities,
  shareholders,
  shareholderData,
  onAddShareholder,
  onRemoveShareholder,
  onFieldChange,
  activeKeys,
  onActiveKeysChange
}) => {
  const { message } = App.useApp();

  const handleRemove = (id) => {
    if (shareholders.length > 1) {
      onRemoveShareholder(id);
      message.success('Shareholder removed');
    } else {
      message.warning('At least one shareholder is required');
    }
  };

  const getShareholderStatus = (shareholderId) => {
    const data = shareholderData[shareholderId];
    if (!data) return { complete: false, filled: 0, total: 10 };

    const requiredFields = [
      'Title', 'FirstName', 'LastName', 'OtherName', 'ID_Card_Type',
      'Inorporate_Shareholder', 'Inorporate_Shareholder_Name',
      'Shareholder_Type', 'Shareholder_Proof_ID', 'Shareholder_Proof_ID_Name'
    ];
    const filled = requiredFields.filter((field) => data[field] && data[field] !== '').length;
    const total = requiredFields.length;
    return { complete: filled === total, filled, total };
  };

  const completedCount = shareholders.filter((s) => getShareholderStatus(s.id).complete).length;

  return (
    <div>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Add Shareholders</h2>
        <p className={styles.subtitle}>
          Add one or more shareholders for this corporate client. Click on each shareholder to
          expand and edit their information.
        </p>
      </div>

      <Collapse
        activeKey={activeKeys}
        onChange={onActiveKeysChange}
        accordion={false}
        expandIconPosition="end"
        className={styles.collapse}
      >
        {shareholders.map((shareholder, index) => (
          <ShareholderPanel
            key={shareholder.id}
            shareholder={shareholder}
            index={index}
            shareholderData={shareholderData}
            shareholders={shareholders}
            form={form}
            utilities={utilities}
            onFieldChange={onFieldChange}
            onRemove={handleRemove}
            message={message}
          />
        ))}
      </Collapse>

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAddShareholder}
        size="large"
        className={styles.addButton}
      >
        Add Shareholder
      </Button>

      <Card className={styles.summaryCard}>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <Statistic
              title="Total Shareholders"
              value={shareholders.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Completed Forms"
              value={completedCount}
              suffix={`/ ${shareholders.length}`}
              prefix={<CheckCircleOutlined />}
              valueStyle={{
                color: completedCount === shareholders.length ? '#52c41a' : '#faad14'
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ShareholdersForm;
