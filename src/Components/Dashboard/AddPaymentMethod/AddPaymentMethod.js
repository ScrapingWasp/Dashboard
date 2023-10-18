import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const AddPaymentMethod = ({ clientSecret, callback }) => {
  const options = {
    clientSecret,
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm callback={callback} />
    </Elements>
  );
};

export default AddPaymentMethod;
