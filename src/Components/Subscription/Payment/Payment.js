import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Pay = ({
  clientSecret,
  priceId,
  setStep,
  selectedPlan,
  confirmSetupIntent,
}) => {
  const options = {
    clientSecret,
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm
        setStep={setStep}
        selectedPriceId={priceId}
        selectedPlan={selectedPlan}
        confirmSetupIntent={confirmSetupIntent}
      />
    </Elements>
  );
};

export default Pay;
