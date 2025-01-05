import React from "react";
import { Button } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = ({ products, token }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  const handlePayment = async () => {
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
    }
  };

  return (
    <div class="d-grid gap-2 py-2">
    <Button color="danger" className="fw-bold p-2" onClick={handlePayment}>
      Checkout
    </Button>
    </div>
  );
};

export default Checkout;