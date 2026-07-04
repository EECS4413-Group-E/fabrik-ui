import { PaymentMethod, type CheckoutFormValues } from "../../models/Checkout";

interface CheckoutPaymentCardProps {
  form: any;
}

const CheckoutPaymentCard = ({ form }: CheckoutPaymentCardProps) => {
  return (
    <section>
      <h2>Payment Details</h2>

      <form.Field
        name="userId"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value) {
              return "User ID is required";
            }

            return undefined;
          },
        }}
      >
        {(field: any) => (
          <div>
            <label htmlFor={field.name}>User ID:</label>
            <br />
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              size={45}
            />
            {field.state.meta.errors.map((err: string) => (
              <div key={err}>{err}</div>
            ))}
          </div>
        )}
      </form.Field>

      <br />

      <form.Field name="paymentMethod">
        {(field: any) => (
          <div>
            <p>Payment Method:</p>

            <label>
              <input
                type="radio"
                name={field.name}
                value={PaymentMethod.CreditCard}
                checked={field.state.value === PaymentMethod.CreditCard}
                onBlur={field.handleBlur}
                onChange={() => field.handleChange(PaymentMethod.CreditCard)}
              />
              Credit Card
            </label>

            <br />

            <label>
              <input
                type="radio"
                name={field.name}
                value={PaymentMethod.PayPal}
                checked={field.state.value === PaymentMethod.PayPal}
                onBlur={field.handleBlur}
                onChange={() => field.handleChange(PaymentMethod.PayPal)}
              />
              PayPal
            </label>
          </div>
        )}
      </form.Field>

      <br />

      <form.Subscribe
        selector={(state: { values: CheckoutFormValues }) =>
          state.values.paymentMethod
        }
      >
        {(paymentMethod: CheckoutFormValues["paymentMethod"]) =>
          paymentMethod === PaymentMethod.CreditCard ? (
            <fieldset>
              <legend>Credit Card Information</legend>

              <form.Field
                name="cardNumber"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return "Card number is required";
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <div>
                    <label htmlFor={field.name}>Card Number:</label>
                    <br />
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <div key={err}>{err}</div>
                    ))}
                  </div>
                )}
              </form.Field>

              <br />

              <form.Field
                name="expiryDate"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return "Expiry date is required";
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <div>
                    <label htmlFor={field.name}>Expiry Date:</label>
                    <br />
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="MM/YY"
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <div key={err}>{err}</div>
                    ))}
                  </div>
                )}
              </form.Field>

              <br />

              <form.Field
                name="cvv"
                validators={{
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return "CVV is required";
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <div>
                    <label htmlFor={field.name}>CVV:</label>
                    <br />
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <div key={err}>{err}</div>
                    ))}
                  </div>
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
                      return "PayPal email is required";
                    }

                    return undefined;
                  },
                }}
              >
                {(field: any) => (
                  <div>
                    <label htmlFor={field.name}>PayPal Email:</label>
                    <br />
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                    />
                    {field.state.meta.errors.map((err: string) => (
                      <div key={err}>{err}</div>
                    ))}
                  </div>
                )}
              </form.Field>
            </fieldset>
          )
        }
      </form.Subscribe>
    </section>
  );
};

export default CheckoutPaymentCard;
