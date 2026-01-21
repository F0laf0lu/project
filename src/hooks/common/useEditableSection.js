import { useState, useCallback } from 'react';
import { Form, message } from 'antd';

/**
 * Custom hook for managing editable sections with form state.
 * Consolidates edit mode logic for personal details, next of kin, beneficiaries, etc.
 *
 * @param {Object} options - Configuration options
 * @param {Object} options.initialValues - Initial form values
 * @param {Function} options.onSave - Callback when save is triggered with form values
 * @param {string} options.successMessage - Success message to display on save
 * @returns {Object} - Hook state and handlers
 */
const useEditableSection = ({
  initialValues = {},
  onSave,
  successMessage = 'Changes saved successfully!'
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = useCallback(() => {
    form.setFieldsValue(initialValues);
    setIsEditing(true);
  }, [form, initialValues]);

  const cancelEditing = useCallback(() => {
    form.resetFields();
    setIsEditing(false);
  }, [form]);

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (onSave) {
        await onSave(values);
      }
      message.success(successMessage);
      setIsEditing(false);
      return values;
    } catch (error) {
      if (error.errorFields) {
        message.error('Please fill in all required fields');
      }
      throw error;
    }
  }, [form, onSave, successMessage]);

  const submitForm = useCallback(() => {
    form.submit();
  }, [form]);

  const updateInitialValues = useCallback((newValues) => {
    if (isEditing) {
      form.setFieldsValue(newValues);
    }
  }, [form, isEditing]);

  return {
    form,
    isEditing,
    startEditing,
    cancelEditing,
    handleSave,
    submitForm,
    updateInitialValues
  };
};

export default useEditableSection;
