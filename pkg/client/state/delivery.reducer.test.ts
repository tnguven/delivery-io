import { describe, test, beforeEach, expect } from "vitest";
import { reducer, actions } from "./delivery.reducer";
import { initialDeliveryState } from "./delivery.context";

describe("planes list reducer", () => {
  let state = { ...initialDeliveryState };
  const dummyItem = {
    title: "Your next delivery for Cristina, Mariah and Rebekah",
    message:
      "Hey Santiago! In two days' time, we'll be charging you for your next order for Cristina, Mariah and Rebekah's fresh food.",
    totalPrice: 197.5,
    freeGift: true,
  };

  beforeEach(() => {
    state = { ...initialDeliveryState };
  });

  describe("happy path", () => {
    test("should fetch and set the state with response data", () => {
      const requestingState = reducer(state, {
        type: actions.FETCH_DELIVERY_REQUEST,
        payload: "userId",
      });
      expect(requestingState).toEqual({
        loading: true,
        data: undefined,
        error: undefined,
        userId: "userId",
      });
      const successState = reducer(requestingState, {
        type: actions.FETCH_DELIVERY_SUCCESS,
        payload: dummyItem,
      });
      expect(successState).toEqual({
        loading: false,
        data: dummyItem,
        error: undefined,
        userId: "userId",
      });
    });

    test("should SET_USER_ID", () => {
      const nextState = reducer(
        { ...state, userId: "" },
        {
          type: actions.SET_USER_ID,
          payload: "a",
        },
      );
      expect(nextState).toEqual({
        loading: false,
        data: undefined,
        userId: "a",
        error: undefined,
      });
      expect(
        reducer(nextState, {
          type: actions.SET_USER_ID,
          payload: "ab",
        }),
      ).toEqual({
        loading: false,
        data: undefined,
        userId: "ab",
        error: undefined,
      });
    });
  });

  describe("unhappy path", () => {
    test("should update state with error", () => {
      const requestingState = reducer(state, { type: actions.FETCH_DELIVERY_REQUEST, payload: "userId" });
      expect(requestingState).toEqual({ loading: true, data: undefined, error: undefined, userId: "userId" });
      expect(
        reducer(requestingState, {
          type: actions.FETCH_DELIVERY_FAILED,
          error: new Error("something went wrong"),
        }),
      ).toEqual({
        loading: false,
        data: undefined,
        userId: "userId",
        error: new Error("something went wrong"),
      });
    });
  });
});
