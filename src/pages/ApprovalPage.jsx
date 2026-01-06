





const ApprovalsContent = () => {
    // Handler to view approval details
    const handleViewApproval = (approval) => {
      setSelectedApproval(approval);
      setCurrentPage('approvalDetail');
    };

    // Handler to approve client
    const handleApproveClient = (approval) => {
      const newClient = {
        key: String(initialData.length + data.length + 1),
        name: approval.clientType === 'Corporate' 
          ? approval.companyName 
          : `${approval.firstName} ${approval.lastName}`,
        contactPerson: approval.clientType === 'Corporate' 
          ? `${approval.contactFirstName} ${approval.contactLastName}`
          : `${approval.firstName} ${approval.lastName}`,
        email: approval.email,
        phone: approval.phone || approval.mobileNumber1,
        clientType: approval.clientType,
        product: approval.product,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        ...approval // Include all original data
      };

      // Add to active clients
      initialData.unshift(newClient);
      setData([newClient, ...data]);

      // Remove from pending approvals
      setPendingApprovals(pendingApprovals.filter(item => item.id !== approval.id));

      message.success(`Client "${newClient.name}" approved and added to active clients!`);
      setCurrentPage('clients');
    };

    // Handler to reject client
    const handleRejectClient = (approvalId, reason) => {
      setPendingApprovals(pendingApprovals.filter(item => item.id !== approvalId));
      message.warning(`Client submission rejected. Reason: ${reason || 'No reason provided'}`);
    };

    const approvalColumns = [
      {
        title: 'Submitted Date',
        dataIndex: 'submittedDate',
        key: 'submittedDate',
        width: '12%',
        sorter: (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate),
      },
      {
        title: 'Client Name',
        key: 'clientName',
        width: '18%',
        render: (_, record) => (
          <span style={{ fontWeight: '500' }}>
            {record.clientType === 'Corporate' 
              ? record.companyName 
              : `${record.firstName} ${record.lastName}`}
          </span>
        ),
        sorter: (a, b) => {
          const nameA = a.clientType === 'Corporate' ? a.companyName : `${a.firstName} ${a.lastName}`;
          const nameB = b.clientType === 'Corporate' ? b.companyName : `${b.firstName} ${b.lastName}`;
          return nameA.localeCompare(nameB);
        },
      },
      {
        title: 'Client Type',
        dataIndex: 'clientType',
        key: 'clientType',
        width: '12%',
        render: (clientType) => (
          <Tag color={clientType === 'Corporate' ? 'blue' : 'cyan'}>
            {clientType}
          </Tag>
        ),
        filters: [
          { text: 'Individual', value: 'Individual' },
          { text: 'Corporate', value: 'Corporate' },
        ],
        onFilter: (value, record) => record.clientType === value,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: '15%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '18%',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '13%',
        render: (status) => (
          <Tag color="orange" icon={<ClockCircleOutlined />}>
            {status}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        width: '12%',
        render: (_, record) => (
          <Space size="small">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewApproval(record)}
              style={{ padding: '4px 8px' }}
            >
              Review
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <Spin spinning={tableLoading} size="large" tip="Loading approvals...">
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{ 
                color: '#1890ff', 
                marginBottom: '8px',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                <CheckCircleFilled style={{ marginRight: '12px' }} />
                Pending Approvals
              </h2>
              <p style={{ color: '#666', margin: 0 }}>
                Review and approve client onboarding submissions
              </p>
            </div>
            <Card bordered={false} style={{ background: '#f0f5ff' }}>
              <Statistic
                title="Pending Reviews"
                value={pendingApprovals.length}
                valueStyle={{ color: '#1890ff', fontSize: '32px' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </div>

          {pendingApprovals.length === 0 ? (
            <div style={{
              background: '#fafafa',
              padding: '64px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '2px dashed #d9d9d9',
              marginTop: '24px'
            }}>
              <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a', marginBottom: '16px' }} />
              <h3 style={{ color: '#595959', marginBottom: '8px' }}>All Caught Up!</h3>
              <p style={{ color: '#999', margin: 0 }}>
                There are no pending client approvals at this time.
              </p>
            </div>
          ) : (
            <>
              <Table
                columns={approvalColumns}
                dataSource={pendingApprovals}
                rowKey="id"
                loading={tableLoading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} pending approvals`,
                  pageSizeOptions: ['5', '10', '20', '50'],
                }}
                style={{
                  background: 'white'
                }}
                bordered
              />

              <div style={{
                background: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '6px',
                padding: '16px',
                marginTop: '24px',
                display: 'flex',
                gap: '12px'
              }}>
                <ClockCircleOutlined style={{ color: '#fa8c16', fontSize: '20px', marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#d46b08' }}>Approval Required</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#ad6800', fontSize: '14px' }}>
                    Click "Review" to view full submission details and approve or reject each client onboarding request.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Spin>
    );
  };