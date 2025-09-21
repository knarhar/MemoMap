import React, { useState, useEffect } from 'react';
import { Col, Row, Card as AntCard, Spin, Empty, Popconfirm, Button, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { getCard, deleteCard } from '@api/cards.js';
import './cardsPage.css';

import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import AddCard from '@components/AddCard.jsx';
import CardDetailModal from '@components/CardDetailModal.jsx';
import AddCardModal from '@components/AddCardModal.jsx';

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Get unique categories for the modal
  const availableCategories = [...new Set(
    cards.flatMap(card => card.categories_names || [])
  )];

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMM DD, YYYY HH:mm');
  };

  // Fetch cards on mount
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const data = await getCard();
      setCards(data.payload || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  const handleCardUpdate = (updatedCard) => {
    setCards(prev =>
      prev.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };

  const handleAddCard = () => {
    setAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    setAddModalVisible(false);
  };

  const handleCardAdd = (newCard) => {
    setCards(prev => [newCard, ...prev]); // Add new card to the beginning
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Spin size="large" className="text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">My Notes</h1>
          <p className="text-gray-400">{cards.length} card{cards.length !== 1 ? 's' : ''} total</p>
        </div>
        <Empty
          description={<span className="text-gray-400">No cards found</span>}
          className="mt-20"
          imageStyle={{ filter: 'invert(0.7)' }}
        />
        <AddCard onAddCard={handleAddCard} />
        <AddCardModal
          visible={addModalVisible}
          onClose={handleAddModalClose}
          onAdd={handleCardAdd}
          availableCategories={availableCategories}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">My Notes</h1>
        <p className="text-gray-400">{cards.length} card{cards.length !== 1 ? 's' : ''} total</p>
      </div>

      <Row gutter={[24, 24]} align='stretch'>
        {cards.map((card, index) => (
          <Col
            key={card.id}
            xs={24} sm={12} md={8} lg={6} xl={6}
            className="card-col"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <AntCard
              className="card-dark relative h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-750 cursor-pointer"
              styles={{
                body: {
                  padding: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'transparent'
                }
              }}
              onClick={() => handleCardClick(card)}
            >
              {/* Delete button in top-right corner */}
              <Popconfirm
                title={<span className="text-gray-200">Delete this card?</span>}
                description={<span className="text-gray-400">Are you sure you want to delete this card? This action cannot be undone.</span>}
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDelete(card.id);
                }}
                okText="Yes"
                cancelText="No"
                placement="topLeft"
                styles={{
                  body: {
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  },
                  content: {
                    zIndex: 1000
                  }
                }}
              >
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  className="delete-btn absolute top-3 right-3 z-10 text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>

              {/* Card content */}
              <div className="flex flex-col h-full pt-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-100 mb-3 line-clamp-2 min-h-[3rem] leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm flex-grow mb-6 line-clamp-4 leading-relaxed">
                  {card.description}
                </p>

                {/* Footer with categories and date */}
                <div className="flex justify-between items-end mt-auto">
                  {/* Categories on the left */}
                  <div className="flex flex-wrap gap-1 max-w-[60%]">
                    {card.categories_names.map((category, idx) => (
                      <Tag
                        key={`${category}-${idx}`}
                        className="category-tag text-xs mb-0 bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500 transition-colors duration-200"
                      >
                        {category}
                      </Tag>
                    ))}
                  </div>

                  {/* Creation date on the right */}
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2 font-medium">
                    {formatDate(card.created)}
                  </span>
                </div>
              </div>
            </AntCard>
          </Col>
        ))}
      </Row>

      <AddCard onAddCard={handleAddCard} />
      <AddCardModal
        visible={addModalVisible}
        onClose={handleAddModalClose}
        onAdd={handleCardAdd}
        availableCategories={availableCategories}
      />
      {/* Card Detail Modal */}
      <CardDetailModal
        visible={modalVisible}
        onClose={handleModalClose}
        card={selectedCard}
        onUpdate={handleCardUpdate}
        availableCategories={availableCategories}
      />
    </div>
  );
};

export default CardsPage;