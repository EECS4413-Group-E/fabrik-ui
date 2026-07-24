import { PaymentMethod, type CheckoutFormValues } from '../../models/Checkout';
import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

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
            <fieldset>
              <legend>Credit Card Information</legend>

              <form.Field
                name="cardNumber"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return 'Card number is required';
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      label={'Card Number:'}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <Box key={err}>{err}</Box>
                    ))}
                  </Box>
                )}
              </form.Field>
              <form.Field
                name="expiryDate"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return 'Expiry date is required';
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="MM/YY"
                      label={'Expiry Date:'}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <Box key={err}>{err}</Box>
                    ))}
                  </Box>
                )}
              </form.Field>
              <form.Field
                name="cvv"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return 'CVV is required';
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      label={'CVV:'}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <Box key={err}>{err}</Box>
                    ))}
                  </Box>
                )}
              </form.Field>
            </fieldset>
          ) : (
            <fieldset>
              <legend>PayPal Information</legend>

              <form.Field
                name="paypalEmail"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return 'PayPal email is required';
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      label={'PayPal Email:'}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <Box key={err}>{err}</Box>
                    ))}
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
