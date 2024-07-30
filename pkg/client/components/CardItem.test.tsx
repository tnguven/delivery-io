import { test, describe, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { CardItem } from "./CardItem";

const props = {
  title: "title",
  message: "message",
  totalPrice: 120.5,
  freeGift: true,
};

describe("<CardItem>", () => {
  test("renders correctly", () => {
    render(<CardItem {...props} />);
    
    expect(() => {
      screen.getByRole("img");
      screen.getByText(/title/);
      screen.getByText(/message/);
      screen.getByText(/Total price: £120.5/);
      screen.getByText("SEE DETAILS");
      screen.getByText("EDIT DELIVERY");
      screen.getByText("FREE GIFT");
    }).not.toThrow();
  });

  test("renders without free gift", () => {
    render(<CardItem {...props} freeGift={false} />);

    expect(() => {
      screen.getByText("FREE GIFT");
    }).toThrow();
  });
});
