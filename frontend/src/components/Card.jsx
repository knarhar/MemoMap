import React from 'react';
import { Layout } from 'antd';

const Card = ({card}) => {

  return (
   <div className="border border-blue-900 rounded-xl p-4 shadow-sm bg-blue-950 w-60 " >
      <h2 className="text-xl font-bold mb-2 text-cyan-600">{card.title}</h2>
      <p className="text-gray-600">{card.description}</p>
   </div>
  )
}

export default Card;
