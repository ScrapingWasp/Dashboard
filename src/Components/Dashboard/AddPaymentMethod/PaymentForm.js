import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import Loader from "../../Utility/Loader/Loader";
import { PRIMARY } from "../../Utility/Colors";
import toast from "react-hot-toast";
// import Loader from "../../Utility/Loader/Loader";
// import { CORAL_RED, GREEN } from "../../Utility/Colors";
// import { MdError } from "react-icons/md";

const PaymentForm = ({ callback }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        //   return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      toast.success("Payment method added successfully", { duration: 4000 });
      callback();
    }

    setIsLoading(false);
  };

  const isDisabled = () => isLoading || !stripe || !elements;

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        style={{
          backgroundColor: PRIMARY,
          borderColor: PRIMARY,
          width: "100%",
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          fontWeight: "bold",
          color: "white",
          fontSize: "1.1em",
          opacity: isDisabled() ? 0.5 : 1,
        }}
        disabled={isDisabled()}
        onClick={handleSubmit}
        id="submit">
        {isLoading ? (
          <Loader size={30} color="white" />
        ) : (
          <>Add Payment Method</>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
