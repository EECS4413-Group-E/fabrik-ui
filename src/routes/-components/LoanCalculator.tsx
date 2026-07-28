import { useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

type LoanCalculatorProps = {
  orderTotal: number;
  onChange: (installments: number) => void;
};

const TERM_OPTIONS = [3, 6, 12, 24];

const ANNUAL_INTEREST_RATE = 0.12;

const LoanCalculator = ({ orderTotal, onChange }: LoanCalculatorProps) => {
  const [payInInstallments, setPayInInstallments] = useState(false);
  const [termMonths, setTermMonths] = useState(6);

  const monthlyRate = ANNUAL_INTEREST_RATE / 12;

  const monthlyPayment =
    (orderTotal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

  const totalRepaid = monthlyPayment * termMonths;

  const totalInterest = totalRepaid - orderTotal;

  const handleToggle = (checked: boolean) => {
    setPayInInstallments(checked);
    onChange(checked ? termMonths : 0);
  };

  const handleTermChange = (months: number) => {
    setTermMonths(months);
    onChange(months);
  };

  return (
    <Box>
      <Divider sx={{ my: 4 }} />

      <Typography variant="h3" sx={{ mb: 1 }}>
        Pay in Installments
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Optional. Spread the cost over monthly payments instead of paying the
        full amount today.
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
          <TextField
            select
            label="Term"
            value={termMonths}
            onChange={(event) => handleTermChange(Number(event.target.value))}
            sx={{ width: 200 }}
          >
            {TERM_OPTIONS.map((months) => (
              <MenuItem key={months} value={months}>
                {months} months
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ mt: 2 }}>
            <Typography>
              Monthly payment: <strong>${monthlyPayment.toFixed(2)}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Total repaid ${totalRepaid.toFixed(2)} · Interest $
              {totalInterest.toFixed(2)} at{' '}
              {(ANNUAL_INTEREST_RATE * 100).toFixed(0)}% APR
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Each monthly payment will be charged to the card or PayPal account
            entered above.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LoanCalculator;