import { Box } from '@mui/material';
import PriceRow from './PriceRow.tsx';

const PricingSummary = ({
  subTotal,
  totalPrice,
  harmonizedSalesTaxRate,
  pointsPrice,
}: {
  subTotal: number;
  totalPrice: number;
  harmonizedSalesTaxRate: number;
  pointsPrice: number;
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <PriceRow label="Subtotal" value={subTotal} />
      {pointsPrice > 0 && <PriceRow label="Points Discount" value={pointsPrice} />}
      <PriceRow label= "HST" value={harmonizedSalesTaxRate}/>
      <PriceRow label="Total Price" value={totalPrice} />
    </Box>
  );
};

export default PricingSummary;
