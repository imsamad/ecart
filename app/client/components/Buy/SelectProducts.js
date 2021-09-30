import React from 'react';
import Cart from '../Cart';
import StepBtn from './StepBtn';
const SelectProducts = ({ handleNext, handleBack }) => {
  return (
    <>
      <Cart fromSelect handleNext={handleNext} handleBack={handleBack} />
      <StepBtn handleBack={handleBack} handleNext={handleNext} />
    </>
  );
};

export default SelectProducts;
