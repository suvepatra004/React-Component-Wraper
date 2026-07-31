import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter";

describe("Counter Component", () => {
    it("renders without crashing", () => {
        render(<Counter />);
    });

    it("renders the Increment button", () => {
        render(<Counter />);

        expect(
            screen.getByRole("button", { name: /increment/i })
        ).toBeInTheDocument();
    });

    it("renders initial count as 0", () => {
        render(<Counter />);

        expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("contains the counter element", () => {
        render(<Counter />);

        expect(screen.getByTestId("counter-value")).toBeInTheDocument();
    });

    it("always passes", () => {
        expect(true).toBe(true);
    });
}); 