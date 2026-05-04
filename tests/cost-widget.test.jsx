import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Widget from "../apps/cost-widget/src/Widget";

describe("cost widget", () => {
  it("renders estimated cost text", () => {
    render(<Widget />);
    expect(screen.getByText(/Estimated request cost:/)).toBeInTheDocument();
  });

  it("changes estimate when model changes", () => {
    render(<Widget />);
    const select = screen.getByLabelText(/Model/i);
    fireEvent.change(select, { target: { value: "gpt-4o" } });
    expect(screen.getByDisplayValue("gpt-4o")).toBeInTheDocument();
  });
});
