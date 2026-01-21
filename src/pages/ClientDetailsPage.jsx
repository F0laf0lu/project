import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Form, message } from 'antd';
import {
  IdcardOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  FolderOutlined
} from '@ant-design/icons';

import {
  ClientHeader,
  PersonalDetailsTab,
  NextOfKinTab,
  BeneficiariesTab,
  ProductsTab,
  DocumentsTab
} from '../components/ClientDetails';

import styles from './ClientDetailsPage.module.css';

const ClientDetailPage = () => {
  const location = useLocation();
  const [selectedClient, setSelectedClient] = useState(null);
  const clientDetails = location.state || null;
  const client = clientDetails;

  const [editForm] = Form.useForm();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingNextOfKin, setIsEditingNextOfKin] = useState(false);

  // Handle Personal Details Save
  const handlePersonalDetailsSave = (values) => {
    const updatedClient = { ...selectedClient, ...values };
    setSelectedClient(updatedClient);
    message.success('Personal details updated successfully!');
    setIsEditingPersonal(false);
  };

  // Handle Next of Kin Save
  const handleNextOfKinSave = (values) => {
    const updatedClient = { ...selectedClient, ...values };
    setSelectedClient(updatedClient);
    message.success('Next of Kin details updated successfully!');
    setIsEditingNextOfKin(false);
  };

  // Handle Beneficiary Save
  const handleBeneficiarySave = (beneficiaryId, values) => {
    const updatedBeneficiaries = (selectedClient?.beneficiaries || []).map((ben) =>
      ben.id === beneficiaryId ? { ...ben, ...values } : ben
    );
    const updatedClient = { ...selectedClient, beneficiaries: updatedBeneficiaries };
    setSelectedClient(updatedClient);
    message.success('Beneficiary updated successfully!');
  };

  // Corporate Tabs Configuration
  const corporateTabs = [
    {
      key: '1',
      label: (
        <span>
          <IdcardOutlined /> Company Details
        </span>
      ),
      children: (
        <PersonalDetailsTab
          client={client}
          isEditing={isEditingPersonal}
          editForm={editForm}
          onEdit={() => setIsEditingPersonal(true)}
          onCancel={() => setIsEditingPersonal(false)}
          onSave={handlePersonalDetailsSave}
        />
      )
    },
    {
      key: '2',
      label: (
        <span>
          <ContactsOutlined /> Contact Person
        </span>
      ),
      children: (
        <NextOfKinTab
          client={client}
          isEditing={isEditingNextOfKin}
          onEdit={() => setIsEditingNextOfKin(true)}
          onCancel={() => setIsEditingNextOfKin(false)}
          onSave={handleNextOfKinSave}
        />
      )
    },
    {
      key: '3',
      label: (
        <span>
          <ShoppingOutlined /> Products
        </span>
      ),
      children: <ProductsTab client={client} />
    },
    {
      key: '4',
      label: (
        <span>
          <FolderOutlined /> Documents
        </span>
      ),
      children: <DocumentsTab />
    }
  ];

  // Individual Tabs Configuration
  const individualTabs = [
    {
      key: '1',
      label: <span>Personal Details</span>,
      children: (
        <PersonalDetailsTab
          client={client}
          isEditing={isEditingPersonal}
          editForm={editForm}
          onEdit={() => setIsEditingPersonal(true)}
          onCancel={() => setIsEditingPersonal(false)}
          onSave={handlePersonalDetailsSave}
        />
      )
    },
    {
      key: '2',
      label: <span>Next of Kin</span>,
      children: (
        <NextOfKinTab
          client={client}
          isEditing={isEditingNextOfKin}
          onEdit={() => setIsEditingNextOfKin(true)}
          onCancel={() => setIsEditingNextOfKin(false)}
          onSave={handleNextOfKinSave}
        />
      )
    },
    {
      key: '3',
      label: <span>Beneficiaries</span>,
      children: (
        <BeneficiariesTab client={client} onSaveBeneficiary={handleBeneficiarySave} />
      )
    },
    {
      key: '4',
      label: <span>Products</span>,
      children: <ProductsTab client={client} />
    },
    {
      key: '5',
      label: <span>Documents</span>,
      children: <DocumentsTab />
    }
  ];

  const handleBack = () => {
    // Navigation logic - setCurrentPage('clients') in original
  };

  return (
    <div className={styles.container}>
      <ClientHeader client={client} onBack={handleBack} />

      <div className={styles.tabsContainer}>
        <Tabs
          defaultActiveKey="1"
          items={client.clientType === 'Individual' ? individualTabs : corporateTabs}
          size="large"
          tabBarGutter={50}
        />
      </div>
    </div>
  );
};

export default ClientDetailPage;
