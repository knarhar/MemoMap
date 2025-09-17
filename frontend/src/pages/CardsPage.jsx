import getCard from '../api.js';
import React from 'react';
import {useState, useEffect} from 'react';
import Card from '@components/Card.jsx';

import { Col, Divider, Row, Card as AntCard } from 'antd';


const CardsPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
  getCard()
    .then((data) => {
      console.log(data.payload); // <-- add this
      setCards(data.payload);
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);


  if (loading) return <p>Loading cards...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const style = { background: '#fff', padding: 16, textAlign: 'center' };

 return (
    <Row gutter={[16, { xs: 16, sm: 24, md: 32, lg: 40 }]}>
  {cards.map((card) => (
    <Col key={card.id} >
      <AntCard      
        className='bg-blue-950'
        
        title={card.title}
        variant='borderless'
        style={{
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        //   background: '#454a4cff',
          width: 250,
          alignItems: 'baseline'
        }}
      >
        <p>{card.description}</p>
      </AntCard>
    </Col>
  ))}
</Row>
  );
}

export default CardsPage;
