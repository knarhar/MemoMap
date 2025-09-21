import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AddCard = ({ onAddCard }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleAddCard = () => {
     // Trigger the add card modal
    if (onAddCard) {
      onAddCard();
    }
  };

  return (
    <Tooltip 
      title="Add new card" 
      placement="left"
      classNames={{ root: "add-card-tooltip" }}
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        onClick={handleAddCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          add-card-btn-fixed
          w-16 h-16 
          flex items-center justify-center
          bg-gray-700 hover:bg-gray-600 
          border-2 border-gray-600 hover:border-gray-500
          shadow-2xl hover:shadow-3xl
          transition-all duration-300 ease-out
          ${isHovered ? 'transform scale-110' : ''}
        `}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          backgroundColor: '#374151',
          borderColor: '#4b5563',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* <PlusOutlined 
          className={`
            text-gray-100 text-xl font-bold
            transition-all duration-300
            ${isHovered ? 'rotate-90' : ''}
          `} 
        /> */}
      </Button>
    </Tooltip>
  );
};

export default AddCard;