import { PaymentMethod, type CheckoutFormValues } from '../../models/Checkout';
import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { formatCardNumber, formatExpiryDate } from '../../utils.ts';

interface CheckoutPaymentCardProps {
  form: any;
}

const CheckoutPaymentCard = ({ form }: CheckoutPaymentCardProps) => {
  return (
    <Box>
      <Typography variant={'h2'}>Payment Details</Typography>

      <form.Field name="paymentMethod">
        {(field: any) => (
          <Box>
            <Typography>Payment Method:</Typography>
            <RadioGroup
              defaultValue={PaymentMethod.CreditCard}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <FormControlLabel
                control={<Radio />}
                label={'Credit Card'}
                value={PaymentMethod.CreditCard}
              />
              <FormControlLabel control={<Radio />} label={'PayPal'} value={PaymentMethod.PayPal} />
            </RadioGroup>
          </Box>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state: { values: CheckoutFormValues }) => state.values.paymentMethod}
      >
        {(paymentMethod: CheckoutFormValues['paymentMethod']) =>
          paymentMethod === PaymentMethod.CreditCard ? (
            <fieldset style={{ width: '390px' }}>
              <legend>Credit Card Information</legend>
              <form.Field name="cardNumber">
                {(field: any) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      error={!!field.state.meta.errors.length}
                      helperText={field.state.meta.errors[0]}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const { formatted } = formatCardNumber(e.target.value);
                        field.handleChange(formatted);
                      }}
                      label={'Card Number:'}
                      fullWidth
                    />
                  </Box>
                )}
              </form.Field>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <form.Field name="cvv">
                  {(field: any) => (
                    <Box>
                      <TextField
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        error={!!field.state.meta.errors.length}
                        helperText={field.state.meta.errors[0]}
                        onChange={(e) => field.handleChange(e.target.value)}
                        label={'CVV:'}
                        fullWidth
                      />
                    </Box>
                  )}
                </form.Field>
                <form.Field name="expiryDate">
                  {(field: any) => (
                    <Box>
                      <TextField
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        error={!!field.state.meta.errors.length}
                        helperText={field.state.meta.errors[0]}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          field.handleChange(formatted);
                        }}
                        placeholder="MM/YY"
                        label={'Expiry Date:'}
                        fullWidth
                      />
                    </Box>
                  )}
                </form.Field>
              </Box>
            </fieldset>
          ) : (
            <fieldset style={{ width: '390px' }}>
              <legend>PayPal Information</legend>

              <form.Field name="paypalEmail">
                {(field: any) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      error={!!field.state.meta.errors.length}
                      helperText={field.state.meta.errors[0]}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      label={'PayPal Email:'}
                      fullWidth
                    />
                  </Box>
                )}
              </form.Field>
            </fieldset>
          )
        }
      </form.Subscribe>
    </Box>
  );
};

export default CheckoutPaymentCard;
