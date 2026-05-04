import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Widget from "../apps/observability-widget/src/Widget";

describe("observability widget", () => {
    it("shows service health summary", () => {
        render(<Widget />);
        expect(screen.getByText(/Healthy services:/)).toBeInTheDocument();
    });

    it("renders expected service rows", () => {
        render(<Widget />);
        expect(screen.getByText("Retriever")).toBeInTheDocument();
        expect(screen.getByText("Ranker")).toBeInTheDocument();
        expect(screen.getByText("Responder")).toBeInTheDocument();
    });
});
