import { describe, expect, test, vi } from "vitest";
import { ReactNode } from "react";
import { waitFor, render, screen } from "@testing-library/react";

import { DeliveryStateProvider } from "../state/delivery.context";
import Page from "./index";

vi.mock("../core/fetcher", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("../core/fetcher")>()),
    fetcher: {
      get: vi.fn(),
    },
  };
});

import { fetcher } from "../core/fetcher";

const fixture = {
  title: "title",
  message: "message",
  totalPrice: 120.5,
  freeGift: true,
};

describe("CardContainer component", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DeliveryStateProvider>{children}</DeliveryStateProvider>
  );

  test("render empty correctly", () => {
    fetcher.get.mockResolvedValue({ data: undefined });
    render(<Page />, { wrapper });
    expect(screen.getByText(/- Nothing to show -/)).toBeDefined();
  });

  test("render with with data", async () => {
    fetcher.get.mockResolvedValue({ data: fixture });

    render(<Page />, { wrapper });
    expect(screen.getByText(/- Nothing to show -/)).toBeDefined();
    expect(screen.getByText(/Loading.../)).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(/message/)).toBeInTheDocument();
      expect(screen.getByText(/title/)).toBeInTheDocument();
      expect(screen.getByText(/Total price: £120.5/)).toBeInTheDocument();
      expect(screen.getByText(/FREE GIFT/)).toBeInTheDocument();
    });
  });
});
