import React from 'react';
import { useSelector } from 'react-redux';
const xyz = () => {
  const cart = useSelector((state) => state.cart);
  console.log('Cart', cart);
  return <div>XYZ</div>;
};

export default xyz;
