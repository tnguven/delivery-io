"use client";

import { CardItem } from "../components/CardItem";
import { useDeliveryState } from "../state/delivery.context";

export const CardContainer = () => {
  const { data, loading } = useDeliveryState();

  return (
    <>
      {!data && loading ? "Loading..." : null}
      {data !== undefined ? <CardItem {...data} /> : <span>- Nothing to show -</span>}
    </>
  );
};
