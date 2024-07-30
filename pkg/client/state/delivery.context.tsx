import { useReducer, useContext, createContext, Dispatch, ReactNode } from "react";
import { DeliveryStateActions, reducer } from "./delivery.reducer";

export type DeliveryEntity = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export interface DeliveryContext {
  loading: boolean;
  data: DeliveryEntity | undefined;
  error: undefined | Error;
  userId: string;
}

export const initialDeliveryState = {
  loading: false,
  data: undefined,
  error: undefined,
  userId: "",
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const initialDispatchState = () => {};

const DeliveryStateContext = createContext<DeliveryContext>(initialDeliveryState);

const DeliveryStateDispatchContext =
  createContext<Dispatch<DeliveryStateActions>>(initialDispatchState);

export const DeliveryStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialDeliveryState);
  return (
    <DeliveryStateDispatchContext.Provider value={dispatch}>
      <DeliveryStateContext.Provider value={state}>{children}</DeliveryStateContext.Provider>
    </DeliveryStateDispatchContext.Provider>
  );
};

export const useDeliveryState = () => useContext(DeliveryStateContext);
export const useDispatchDelivery = () => useContext(DeliveryStateDispatchContext);
