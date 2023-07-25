/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert.js';
const stripe = Stripe('pk_test_51NVBQtD7E7gvrPOhiEdwIwhzoQ0xHAD4Gq3t2YDv8T5bcGaOxCBJ7EpogEPGcYEBBHGxMoP4JcVOl51d1k22GaMn00R2jk8dOg');

export const buyProduct = async productId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:5555/api/v1/bookings/checkout-session/${productId}`
    );

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};