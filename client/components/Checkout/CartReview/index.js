import React from 'react';

import Cart from '../../Cart';
import StepBtn from '../StepBtn';
const index = ({ handleBack, handleNext }) => {
  return (
    <>
      <Cart fromCheckoutPage />
      <StepBtn handleBack={handleBack} handleNext={handleNext} />
    </>
  );
};

export default index;
