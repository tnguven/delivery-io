"use client";

import { useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import { makeGetDelivery } from "../state/delivery.actions";
import { CardContainer } from "../containers/CardContainer";
import { InputContainer } from "../containers/InputContainer";
import { useDispatchDelivery } from "../state/delivery.context";

const IndexPage = () => {
  const dispatch = useDispatchDelivery();
  const { getDelivery } = useMemo(
    () => ({
      getDelivery: makeGetDelivery(dispatch),
    }),
    [dispatch],
  );

  useEffect(() => {
    getDelivery({ userId: "ea17433d-7527-45a5-acbc-2e2f78f95c6ea" });
  }, []);

  const handleOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    getDelivery({ userId: e.currentTarget.innerHTML });
  };

  return (
    <Layout title="Katkin">
      <InputContainer />
      <CardContainer />
      <ul>
        {[
          "ea17433d-7527-45a5-acbc-2e2f78f95c6e",
          "3dfdc5cf-b8ed-40f7-a5ca-5e88ad103b60",
          "24bf30a4-e912-4a96-8633-787c9b6e1cf3",
          "86163df6-1ebf-45fd-8c71-cdfbaf7833c5",
          "57efd123-4797-4e2a-8109-02510cc52e4c",
          "c1307701-fe57-4be6-bdc5-184700d69f4d",
          "de433b5a-a229-4982-a434-41ce8f47631a",
          "eb32f8eb-54d1-4d27-8c8f-d8d1d5dc7b53",
        ].map((id) => (
          <li key={id} ><button onClick={handleOnclick}>{id}</button></li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
