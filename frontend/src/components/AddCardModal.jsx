import React, { useState } from 'react';
import { 
  Modal, 
  Input, 
  Button, 
  Select, 
  message, 
  Typography 
} from 'antd';
import { 
  PlusOutlined, 
  SaveOutlined, 
  TagOutlined 
} from '@ant-design/icons';
import { createCard } from '../api/cards';

const { TextArea } = Input;
const { Title } = Typography;

const AddCardModal = ({ 
  visible, 
  onClose, 
  onAdd,
  availableCategories = [] 
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: []
  });

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      message.error('Title is required');
      return;
    }

    setLoading(true);
    try {
      // Prepare data for API (matching your expected format)
      const cardData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        categories: formData.categories
      };

      data = createCard(cardData);

      const newCard = data.payload;
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        categories: []
      });
      
      // Add card to parent component
      if (onAdd) {
        onAdd(newCard);
      }
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error('Error creating card:', error);
      message.error('Failed to create card');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form and close
    setFormData({
      title: '',
      description: '',
      categories: []
    });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      className="add-card-modal"
      styles={{
        content: {
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '12px',
          padding: 0
        },
        header: {
          backgroundColor: 'transparent',
          borderBottom: 'none',
          padding: '24px 24px 0'
        },
        body: {
          padding: '0 24px 24px'
        }
      }}
      title={
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center">
            <PlusOutlined className="text-white text-sm" />
          </div>
          <Title 
            level={3} 
            className="text-gray-100 mb-0"
            style={{ color: '#f3f4f6', margin: 0 }}
          >
            Create New Card
          </Title>
        </div>
      }
    >
      <div className="add-card-content">
        {/* Title Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter card title..."
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            style={{
              backgroundColor: '#374151',
              borderColor: '#4b5563',
              color: '#f3f4f6'
            }}
            size="large"
            maxLength={100}
            showCount
          />
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <TextArea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter card description..."
            rows={6}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            style={{
              backgroundColor: '#374151',
              borderColor: '#4b5563',
              color: '#f3f4f6'
            }}
            maxLength={500}
            showCount
          />
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <TagOutlined />
            Categories
          </label>
          <Select
            mode="tags"
            value={formData.categories}
            onChange={(value) => handleInputChange('categories', value)}
            placeholder="Add or select categories..."
            className="w-full"
            size="large"
            style={{ 
              width: '100%'
            }}
            styles={{
              selector: {
                backgroundColor: '#374151 !important',
                borderColor: '#4b5563 !important',
                color: '#f3f4f6 !important'
              },
              popup: {
                backgroundColor: '#374151',
                border: '1px solid #4b5563'
              }
            }}
            classNames={{
              popup: "category-select-dropdown"
            }}
            maxTagCount={10}
          >
            {availableCategories.map(category => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
          <div className="text-xs text-gray-500 mt-1">
            You can type new categories or select existing ones
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <Button
            onClick={handleCancel}
            disabled={loading}
            style={{
              backgroundColor: '#4b5563',
              borderColor: '#6b7280',
              color: '#e5e7eb'
            }}
            className="hover:opacity-90"
            size="large"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={handleSubmit}
            disabled={!formData.title.trim()}
            style={{
              backgroundColor: formData.title.trim() ? '#2563eb' : '#374151',
              borderColor: formData.title.trim() ? '#2563eb' : '#4b5563',
              color: formData.title.trim() ? '#ffffff' : '#9ca3af'
            }}
            size="large"
          >
            {loading ? 'Creating...' : 'Create Card'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCardModal;