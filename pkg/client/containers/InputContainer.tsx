"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import { useDeliveryState, useDispatchDelivery } from "../state/delivery.context";
import { makeGetDelivery } from "../state/delivery.actions";
import { actions } from "../state/delivery.reducer";
import { useMemo } from "react";
import styles from "./InputContainer.module.css";

type Inputs = {
  userId: string;
};

export const InputContainer = () => {
  const dispatch = useDispatchDelivery();
  const { userId, error, loading } = useDeliveryState();
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  const { getDelivery, setUserId } = useMemo(
    () => ({
      getDelivery: makeGetDelivery(dispatch),
      setUserId: (chr: string) => dispatch({ type: actions.SET_USER_ID, payload: chr }),
    }),
    [dispatch],
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data) return;
    await getDelivery(data);
    reset();
    setFocus("userId");
  };

  const onChange = (e) => {
    setUserId(e.target.value ?? "");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
      <Input
        disabled={loading}
        {...register("userId")}
        placeholder="search by userId"
        type="text"
        value={userId}
        errorMsg={error?.message}
      />
    </form>
  );
};
