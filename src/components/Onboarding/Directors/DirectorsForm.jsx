import { Button, Card, Row, Col, Statistic, Collapse, App } from 'antd';
import { TeamOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import DirectorPanel from './DirectorPanel';
import styles from './DirectorsForm.module.css';

const DirectorsForm = ({
  form,
  utilities,
  directors,
  directorData,
  onAddDirector,
  onRemoveDirector,
  onFieldChange,
  activeKeys,
  onActiveKeysChange
}) => {
  const { message } = App.useApp();

  const handleRemove = (id) => {
    if (directors.length > 1) {
      onRemoveDirector(id);
      message.success('Director removed');
    } else {
      message.warning('At least one director is required');
    }
  };

  const getDirectorStatus = (directorId) => {
    const data = directorData[directorId];
    if (!data) return { complete: false, filled: 0, total: 21 };

    const requiredFields = [
      'SeQNum', 'FirstName', 'LastName', 'OtherName', 'Country',
      'State_Of_Residency', 'Prof_Of_Address_Type', 'Nationality',
      'Date_Of_Birth', 'State_Of_Origin', 'Occupation', 'Source_Of_Wealth',
      'PEP_Status', 'ID_Number', 'ID_Type', 'Id_Card_Expiry_Date',
      'Identification_Document', 'Identification_Validity',
      'Mobile_Numbner1_Country_Code', 'Mobile_Number1', 'BVN'
    ];
    const filled = requiredFields.filter((field) => data[field] && data[field] !== '').length;
    const total = requiredFields.length;
    return { complete: filled === total, filled, total };
  };

  const completedCount = directors.filter((d) => getDirectorStatus(d.id).complete).length;

  return (
    <div>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>Add Directors</h2>
        <p className={styles.subtitle}>
          Add one or more directors for this client. Click on each director to expand and edit
          their information.
        </p>
      </div>

      <Collapse
        activeKey={activeKeys}
        onChange={onActiveKeysChange}
        accordion={false}
        expandIconPosition="end"
        className={styles.collapse}
      >
        {directors.map((director, index) => (
          <DirectorPanel
            key={director.id}
            director={director}
            index={index}
            directorData={directorData}
            directors={directors}
            form={form}
            utilities={utilities}
            onFieldChange={onFieldChange}
            onRemove={handleRemove}
          />
        ))}
      </Collapse>

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAddDirector}
        size="large"
        className={styles.addButton}
      >
        Add Director
      </Button>

      <Card className={styles.summaryCard}>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <Statistic
              title="Total directors"
              value={directors.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Completed Forms"
              value={completedCount}
              suffix={`/ ${directors.length}`}
              prefix={<CheckCircleOutlined />}
              valueStyle={{
                color: completedCount === directors.length ? '#52c41a' : '#faad14'
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DirectorsForm;
