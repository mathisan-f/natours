/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RpFYP5crmyMwBlDVO1Ac61c0wwTZOBv6xyGjmmVe0Fb6CrLDnN4grBZYcbVM63yQOwbUMoniSS2HqdgpuCcwr6800DZ27MlFg",
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from your API
    const { data } = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    console.log(data);

    // 2) Wait for Stripe to be ready, then redirect
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.session.id });
  } catch (err) {
    showAlert("error", err.message);
  }
};
