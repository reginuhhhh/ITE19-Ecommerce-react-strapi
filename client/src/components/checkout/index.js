import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Component to handle the checkout process
const Checkout = ({ products, token }) => {
  // Load the Stripe instance with your public Stripe key
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  
  // State to manage the loading state of the button
  const [loading, setLoading] = useState(false);

  // Function to handle the payment process
  const handlePayment = async () => {
    setLoading(true); // Start the spinner to indicate a process is ongoing
    
    // Prepare the header configuration for the API request
    const headerConfig = token
      ? {
          headers: {
            Authorization: `bearer ${token}`, // Add authorization token if provided
          },
        }
      : {}; // Use empty config if no token is provided

    try {
      // Load the Stripe object
      const stripe = await stripePromise;

      // Make a POST request to your backend to create a Stripe session
      const session = await axios.post(
        "http://localhost:1337/api/orders", // Endpoint to create an order and Stripe session
        {
          orders: products, // Send the products as part of the request body
        },
        headerConfig // Include the header configuration
      );

      // Redirect the user to the Stripe checkout page
      await stripe.redirectToCheckout({
        sessionId: session.data.stripeSession.id, // Use the session ID from the backend response
      });
    } catch (error) {
      console.log(error); // Log any errors that occur
      setLoading(false); // Stop the spinner if an error occurs
    }
  };

  return (
    <div className="d-grid gap-2 py-2">
      {/* Button to trigger the payment process */}
      <Button
        color="danger" // Style the button with a danger color
        className="fw-bold p-2" // Apply bold font and padding to the button
        onClick={handlePayment} // Call the handlePayment function when clicked
        disabled={loading} // Disable the button if loading is true
      >
        {loading ? (
          // Show a spinner and "Processing..." text while loading
          <>
            <Spinner size="sm" className="me-2" />
            Processing...
          </>
        ) : (
          // Default button text when not loading
          "Checkout"
        )}
      </Button>
    </div>
  );
};

export default Checkout;
