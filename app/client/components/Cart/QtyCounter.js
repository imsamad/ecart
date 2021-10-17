import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function BadgeVisibility({
  decrement,
  increment,
  productQty,
  countInStock,
}) {
  return (
    <ButtonGroup size="small">
      <Button onClick={decrement} disabled={productQty === 1}>
        <RemoveIcon fontSize="small" />
      </Button>
      <Button>{productQty}</Button>

      <Button onClick={increment} disabled={productQty === countInStock}>
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
