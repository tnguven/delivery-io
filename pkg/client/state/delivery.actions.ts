import { Dispatch } from "react";
import { AxiosError } from "axios";
import type { DeliveryEntity } from "./delivery.context";
import { DeliveryStateActions, actions } from "./delivery.reducer";
import { fetcher } from "../core/fetcher";

export function makeGetDelivery(dispatch: Dispatch<DeliveryStateActions>) {
  return async function getShortUrls({ userId }: { userId: string }) {
    dispatch({ type: actions.FETCH_DELIVERY_REQUEST, payload: userId });
    try {
      const { data } = await fetcher.get<DeliveryEntity>(`/comms/your-next-delivery/${userId}`);
      dispatch({ type: actions.FETCH_DELIVERY_SUCCESS, payload: data });
    } catch (err) {
      const { response } = err as AxiosError<{ error: string }>;
      const message = response?.data?.error || response.statusText || "something went wrong!";
      dispatch({ type: actions.FETCH_DELIVERY_FAILED, error: new Error(message) });
    }
  };
}
