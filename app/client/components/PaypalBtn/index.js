import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function MyApp({ onSuccess, totalPrice, orderId }) {
  // creates a paypal order
  const createOrder = (_data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: orderId,
            amount: {
              value: totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      onSuccess(details);
    });
  };
  const onCancel = (data) => {
    console.log('onCancel', data);
  };
  const onError = (...args) => {
    console.log('onErrror ', args);
  };
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  return (
    <PayPalScriptProvider options={{ 'client-id': clientId }}>
      <PayPalButtons
        style={{
          color: 'blue',
          shape: 'pill',
          label: 'pay',
          tagline: false,
          layout: 'horizontal',
        }}
        onCancel={onCancel}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default MyApp;
