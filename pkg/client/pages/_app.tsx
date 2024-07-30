import "../styles/globals.css";

import { DeliveryStateProvider } from "../state/delivery.context";

export default ({ Component, pageProps }) => {
  return (
    <>
      <DeliveryStateProvider>
        <Component {...pageProps} />
      </DeliveryStateProvider>
    </>
  );
};
