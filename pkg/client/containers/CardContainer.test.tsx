import { describe, expect, test } from "vitest";
import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";

import { DeliveryStateProvider } from "../state/delivery.context";
import { CardContainer } from "./CardContainer";

describe("CardContainer component", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DeliveryStateProvider>{children}</DeliveryStateProvider>
  );

  test("render empty correctly", () => {
    render(<CardContainer />, { wrapper });
    expect(screen.getByText(/- Nothing to show -/)).toBeDefined();
  });
});
