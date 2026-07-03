import { useState, type FormEvent } from "react";
import {
  processPayment,
  type PaymentMethod,
  type PaymentResponse,
} from "../../Api";

function createMockOrderId() {
  return crypto.randomUUID();
}

function CheckoutPage() {
  const [orderId, setOrderId] = useState<string>(createMockOrderId());
  const [amount, setAmount] = useState("149.99");
  const [currency, setCurrency] = useState("CAD");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT_CARD");

  const [cardNumber, setCardNumber] = useState("4111111111111111");
  const [expiryDate, setExpiryDate] = useState("12/29");
  const [cvv, setCvv] = useState("123");
  const [paypalEmail, setPaypalEmail] = useState("customer@example.com");

  const [paymentResult, setPaymentResult] =
    useState<PaymentResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateOrderId = () => {
    setOrderId(createMockOrderId());
    setPaymentResult(null);
    setErrorMessage("");
  };

  const handleApprovedCard = () => {
    setPaymentMethod("CREDIT_CARD");
    setCardNumber("4111111111111111");
    setExpiryDate("12/29");
    setCvv("123");
    setPaymentResult(null);
    setErrorMessage("");
  };

  const handleDeclinedCard = () => {
    setPaymentMethod("CREDIT_CARD");
    setCardNumber("4000000000000002");
    setExpiryDate("12/29");
    setCvv("123");
    setPaymentResult(null);
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setPaymentResult(null);
    setErrorMessage("");

    try {
      const request = {
        orderId,
        amount: Number(amount),
        currency,
        paymentMethod,
        ...(paymentMethod === "CREDIT_CARD"
          ? {
              cardNumber,
              expiryDate,
              cvv,
            }
          : {
              paypalEmail,
            }),
      };

      const response = await processPayment(request);
      setPaymentResult(response);
    } catch (error: any) {
      const apiError = error.response?.data?.error;

      if (apiError) {
        setErrorMessage(apiError);
      } else {
        setErrorMessage("Unable to process payment.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Checkout</h1>

      <p>
        This is a basic checkout page for testing the payment microservice.
      </p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Order Information</legend>

          <div>
            <label htmlFor="orderId">Order ID</label>
            <br />
            <input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)
}
              size={45}
              required
            />
            <br />
            <button type="button" onClick={handleGenerateOrderId}>
              Generate New Mock Order ID
            </button>
          </div>

          <br />

          <div>
            <label htmlFor="amount">Amount</label>
            <br />
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label htmlFor="currency">Currency</label>
            <br />
            <input
              id="currency"
              type="text"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              required
            />
          </div>
        </fieldset>

        <br />

        <fieldset>
          <legend>Payment Method</legend>

          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="CREDIT_CARD"
                checked={paymentMethod === "CREDIT_CARD"}
                onChange={() => setPaymentMethod("CREDIT_CARD")}
              />
              Credit Card
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="PAYPAL"
                checked={paymentMethod === "PAYPAL"}
                onChange={() => setPaymentMethod("PAYPAL")}
              />
              PayPal
            </label>
          </div>
        </fieldset>

        <br />

        {paymentMethod === "CREDIT_CARD" && (
          <fieldset>
            <legend>Credit Card Details</legend>

            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <br />
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                required
              />
            </div>

            <br />

            <div>
              <label htmlFor="expiryDate">Expiry Date</label>
              <br />
              <input
                id="expiryDate"
                type="text"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>

            <br />

            <div>
              <label htmlFor="cvv">CVV</label>
              <br />
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                required
              />
            </div>

            <br />

            <button type="button" onClick={handleApprovedCard}>
              Use Approved Test Card
            </button>

            <button type="button" onClick={handleDeclinedCard}>
              Use Declined Test Card
            </button>
          </fieldset>
        )}

        {paymentMethod === "PAYPAL" && (
          <fieldset>
            <legend>PayPal Details</legend>

            <div>
              <label htmlFor="paypalEmail">PayPal Email</label>
              <br />
              <input
                id="paypalEmail"
                type="email"
                value={paypalEmail}
                onChange={(event) => setPaypalEmail(event.target.value)}
                required
              />
            </div>
          </fieldset>
        )}

        <br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Process Payment"}
        </button>
      </form>

      <hr />

      <section>
        <h2>Payment Result</h2>

        {errorMessage && (
          <p>
            <strong>Error:</strong> {errorMessage}
          </p>
        )}

        {paymentResult && (
          <div>
            <p>
              <strong>Status:</strong> {paymentResult.status}
            </p>
            <p>
              <strong>Message:</strong> {paymentResult.message}
            </p>
            <p>
              <strong>Payment Method:</strong> {paymentResult.paymentMethod}
            </p>
            <p>
              <strong>Payment Reference:</strong>{" "}
              {paymentResult.paymentReference ?? "Not saved"}
            </p>
            <p>
              <strong>Payment Number:</strong>{" "}
              {paymentResult.paymentNumber ?? "Not saved"}
            </p>
            <p>
              <strong>Order ID:</strong> {paymentResult.orderId}
            </p>
            <p>
              <strong>Amount:</strong> {paymentResult.amount}{" "}
              {paymentResult.currency}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default CheckoutPage;