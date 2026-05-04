import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Widget from "../apps/ai-chat-widget/src/Widget";

describe("ai chat widget", () => {
  it("renders textarea and synthesized answer", () => {
    render(<Widget />);
    expect(screen.getByLabelText("Prompt")).toBeInTheDocument();
    expect(screen.getByText(/Suggested response:/)).toBeInTheDocument();
  });

  it("updates output when prompt changes", () => {
    render(<Widget />);
    const prompt = screen.getByLabelText("Prompt");
    fireEvent.change(prompt, { target: { value: "Create a deployment checklist" } });
    expect(screen.getByText(/^Suggested response: Create a deployment checklist/i)).toBeInTheDocument();
  });
});
