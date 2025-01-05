import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = ({ products, token }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handlePayment = async () => {
    setLoading(true); // Show spinner when the process starts
    const headerConfig = token
      ? {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      : {};
    try {
      const stripe = await stripePromise;
      const session = await axios.post(
        "http://localhost:1337/api/orders",
        {
          orders: products,
        },
        headerConfig
      );
      await stripe.redirectToCheckout({
        sessionId: session.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
      setLoading(false); // Hide spinner if there's an error
    }
  };

  return (
    <div className="d-grid gap-2 py-2">
      <Button
        color="danger"
        className="fw-bold p-2"
        onClick={handlePayment}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <>
            <Spinner size="sm" className="me-2" />
            Processing...
          </>
        ) : (
          "Checkout"
        )}
      </Button>
    </div>
  );
};

export default Checkout;
