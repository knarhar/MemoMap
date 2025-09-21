import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Input, 
  Button, 
  Tag, 
  Select, 
  message, 
  Space, 
  Divider,
  Typography 
} from 'antd';
import { 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  TagOutlined,
  CalendarOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { updateCard } from '../api/cards';

const { TextArea } = Input;
const { Title } = Typography;

const CardDetailModal = ({ 
  visible, 
  onClose, 
  card, 
  onUpdate,
  availableCategories = [] 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setSaving] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: []
  });

  // Initialize both current card and form data when card changes
  useEffect(() => {
    if (card) {
      const cardData = {
        id: card.id || null,
        title: card.title || '',
        description: card.description || '',
        categories: card.categories_names || []
      };
      setCurrentCard(card);
      setFormData(cardData);
    }
  }, [card]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      message.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      updateCard(formData.id);
      setIsEditing(false);
      
      // Create updated card object
      const updatedCard = {
        ...currentCard,
        title: formData.title,
        description: formData.description,
        categories_names: formData.categories
      };
      
      // Update the current card state in modal
      setCurrentCard(updatedCard);
      
      // Update the card in parent component
      if (onUpdate) {
        onUpdate(updatedCard);
      }
    } catch (error) {
      console.error('Error updating card:', error);
      message.error('Failed to update card');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to current card values (which might be updated)
    if (currentCard) {
      setFormData({
        title: currentCard.title || '',
        description: currentCard.description || '',
        categories: currentCard.categories_names || []
      });
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    handleCancel();
    onClose();
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM DD, YYYY [at] HH:mm');
  };

  if (!currentCard) return null;

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
      centered
      className="card-detail-modal"
      styles={{
        content: {
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '12px'
        },
        header: {
          backgroundColor: 'transparent',
          borderBottom: 'none'
        },
        body: {
          padding: '24px'
        }
      }}
      closeIcon={
        <CloseOutlined className="text-gray-400 hover:text-gray-200 text-lg" />
      }
    >
      <div className="card-detail-content">
        {/* Header with edit toggle */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <Title 
              level={3} 
              className="text-gray-100 mb-0"
              style={{ color: '#f3f4f6', margin: 0 }}
            >
              Card Details
            </Title>
          </div>
          
          <Button
            type={isEditing ? "default" : "primary"}
            icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            style={isEditing ? {
              backgroundColor: '#4b5563',
              borderColor: '#6b7280',
              color: '#e5e7eb'
            } : {
              backgroundColor: '#2563eb',
              borderColor: '#2563eb'
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          {isEditing ? (
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter card title..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              style={{
                backgroundColor: '#374151',
                borderColor: '#4b5563',
                color: '#f3f4f6'
              }}
              size="large"
            />
          ) : (
            <div className="text-xl font-semibold text-gray-100 p-3 bg-gray-800 rounded-lg border border-gray-700">
              {currentCard.title}
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          {isEditing ? (
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter card description..."
              rows={6}
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              style={{
                backgroundColor: '#374151',
                borderColor: '#4b5563',
                color: '#f3f4f6'
              }}
            />
          ) : (
            <div className="text-gray-200 p-4 bg-gray-800 rounded-lg border border-gray-700 min-h-[120px] whitespace-pre-wrap">
              {currentCard.description || 'No description provided'}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <TagOutlined />
            Categories
          </label>
          {isEditing ? (
            <Select
              mode="tags"
              value={formData.categories}
              onChange={(value) => setFormData(prev => ({ ...prev, categories: value }))}
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
            >
              {availableCategories.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentCard.categories_names && currentCard.categories_names.length > 0 ? (
                currentCard.categories_names.map((category, index) => (
                  <Tag
                    key={index}
                    className="px-3 py-1 bg-gray-600 border-gray-500 text-gray-200 rounded-full"
                    style={{
                      backgroundColor: '#4b5563',
                      borderColor: '#6b7280',
                      color: '#e5e7eb'
                    }}
                  >
                    {category}
                  </Tag>
                ))
              ) : (
                <span className="text-gray-400 italic">No categories assigned</span>
              )}
            </div>
          )}
        </div>

        <Divider className="border-gray-700 my-6" />

        {/* Metadata */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <CalendarOutlined />
            <span>Created: {formatDate(currentCard.created)}</span>
          </div>
        </div>

        {/* Save Button (only visible when editing) */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleCancel}
              style={{
                backgroundColor: '#4b5563',
                borderColor: '#6b7280',
                color: '#e5e7eb'
              }}
              className="hover:opacity-90"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={handleSave}
              style={{
                backgroundColor: '#2563eb',
                borderColor: '#2563eb'
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CardDetailModal;