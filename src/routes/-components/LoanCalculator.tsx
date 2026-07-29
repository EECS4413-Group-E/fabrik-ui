import { useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

type LoanCalculatorProps = {
  orderTotal: number;
  onChange: (installments: number) => void;
};

const TERM_OPTIONS = [2, 3, 4, 5, 6];

const INTEREST_RATE_PER_INSTALLMENT = 0.03;

const LoanCalculator = ({ orderTotal, onChange }: LoanCalculatorProps) => {
  const [payInInstallments, setPayInInstallments] = useState(false);
  const [installments, setInstallments] = useState(2);

  const totalRepaid = orderTotal * (1 + INTEREST_RATE_PER_INSTALLMENT * (installments - 1));

  const monthlyPayment = totalRepaid / installments;

  const totalInterest = totalRepaid - orderTotal;

  const handleToggle = (checked: boolean) => {
    setPayInInstallments(checked);
    onChange(checked ? installments : 0);
  };

  const handleInstallmentsChange = (value: number) => {
    setInstallments(value);
    onChange(value);
  };

  return (
    <Box>
      <Divider sx={{ my: 4 }} />

      <Typography variant="h3" sx={{ mb: 1 }}>
        Pay in Installments
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Optional. Spread the cost over monthly payments instead of paying the full amount today.
        Store points cannot be used with installments.
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={payInInstallments}
            onChange={(event) => handleToggle(event.target.checked)}
          />
        }
        label="I'd like to pay in installments"
      />

      {payInInstallments && (
        <Box sx={{ mt: 2 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="installments-label">Installments</InputLabel>

            <Select
              labelId="installments-label"
              label="Installments"
              value={installments}
              onChange={(event) => handleInstallmentsChange(Number(event.target.value))}
            >
              {TERM_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} payments
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Typography>
              Monthly payment: <strong>${monthlyPayment.toFixed(2)}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Total ${totalRepaid.toFixed(2)} · Interest ${totalInterest.toFixed(2)} (
              {(INTEREST_RATE_PER_INSTALLMENT * 100).toFixed(0)}% per installment)
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            The first payment is charged today, the rest monthly to the card or PayPal account
            entered above.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LoanCalculator;
