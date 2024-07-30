import { DeliveryContext, type DeliveryEntity } from "./delivery.context";

export type DeliveryStateActions =
  | { type: "FETCH_DELIVERY_REQUEST"; payload: string }
  | { type: "FETCH_DELIVERY_SUCCESS"; payload: DeliveryEntity }
  | { type: "FETCH_DELIVERY_FAILED"; error: Error }
  | { type: "SET_USER_ID"; payload: string };

export const actions = <const>{
  FETCH_DELIVERY_REQUEST: "FETCH_DELIVERY_REQUEST",
  FETCH_DELIVERY_SUCCESS: "FETCH_DELIVERY_SUCCESS",
  FETCH_DELIVERY_FAILED: "FETCH_DELIVERY_FAILED",
  SET_USER_ID: "SET_USER_ID"
};

export const reducer = (state: DeliveryContext, action: DeliveryStateActions) => {
  switch (action.type) {
    case actions.SET_USER_ID:
      return { ...state, userId: action.payload };

    case actions.FETCH_DELIVERY_REQUEST:
      return { ...state, loading: true, userId: action.payload };

    case actions.FETCH_DELIVERY_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: undefined };

    case actions.FETCH_DELIVERY_FAILED:
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
};
