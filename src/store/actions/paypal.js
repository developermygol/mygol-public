import axios from '../../axios';

export const getPaymentGetawayType = async () => {
  try {
    const { data } = await axios.get('/paypal/paymentgetawaytype');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const paypalSuccess = async paymentId => {
  try {
    const data = await axios.get(`/paypal/success/${paymentId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
